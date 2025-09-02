import { useMemo, useState } from "react";
import { Box, Tabs, Tab, Grid, Typography, Stack, Menu, MenuItem, Tooltip, Checkbox, IconButton } from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import ReactJson from "react-json-view";
import TextFeldInput from "../inputs/TextFeldInput";
import WebhookRoundedIcon from "@mui/icons-material/WebhookRounded";
import { SelectFieldInput } from "../inputs/SelectFieldInput";
// import { useAuth } from "@/context/auth-context";
import Image from "next/image";
import { Formik, Form } from "formik";
import { utils } from "@/utils";
// import { useSimulateApis } from "@/services/simulate-apis";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
// import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import CheckIcon from "@mui/icons-material/Check";
import { useRouter, usePathname } from "next/navigation";

const tabOptions = ["Documentation", "Sandbox"];

interface RequestParameter {
    name: string;
    type: "text" | "select";
    label: string;
    value?: string;
    options?: Array<{ label: string; value: string }>;
    placeholder?: string;
    headerKey?: string;
    queryKey?: string;
}

interface PlaygroundProps {
    children: React.ReactNode;
    requestParameters: RequestParameter[];
    endpoint: string;
    method: string;
    type: "default" | "waas";
}

const DEFAULT_BASE_URL = process.env.NEXT_PUBLIC_DEV_SANDBOX_BASE_URL || "";
const WAAS_BASE_URL = process.env.NEXT_PUBLIC_DEV_SANDBOX_WAAS_BASE_URL || "";

export const Playground = ({ children, requestParameters, endpoint, method, type }: PlaygroundProps) => {
    const BASE_URL = type === "waas" ? WAAS_BASE_URL : DEFAULT_BASE_URL;

    const [activeTab, setActiveTab] = useState(0);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedProject, setSelectedProject] = useState<any>(null);
    const [copyType, setCopyType] = useState<"endpoint" | "response" | null>(null);

    // const { simulateRequest, response, loading } = useSimulateApis();
    // const { copied, Copy } = useCopyToClipboard();
    // const { user } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        // if (newValue === 1 && !user?.id) {
        //     router.push(`/auth/login?redirect=${pathname}`);
        //     return;
        // }

        setActiveTab(newValue);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const renderFormField = ({ parameter, formik }: { parameter: RequestParameter; formik: any }) => {
        const commonStyles = {
            overideLabelStyles: {
                fontSize: 12,
                mb: 0.5,
            },
            sx: {
                "& .MuiOutlinedInput-root": {
                    height: "34px",
                    fontSize: 13,
                    borderRadius: 1,
                },
            },
        };

        switch (parameter.type) {
            case "text":
                return (
                    <TextFeldInput
                        key={parameter.name}
                        label={parameter.label}
                        placeholder={parameter.placeholder || parameter.label}
                        disabled={parameter.name === "Authorization" || parameter.name === "grant_type"} // disabled since we are generating values from selected project
                        {...utils.getFormikFieldProps({ formik, field: parameter.name })}
                        {...commonStyles}
                    />
                );

            case "select":
                return (
                    <SelectFieldInput
                        key={parameter.name}
                        label={parameter.label}
                        placeholder={parameter.placeholder || parameter.label}
                        {...utils.getFormikFieldProps({ formik, field: parameter.name })}
                        {...commonStyles}
                        sx={{
                            width: "100%",
                            height: "34px",
                            fontSize: 13,
                            borderRadius: 1,
                        }}
                        options={parameter.options || []}
                    />
                );
            default:
                return null;
        }
    };

    const credentials = btoa(
        `${selectedProject?.application?.client_id}:${selectedProject?.application?.client_secret}`
    );

    const initialValues = useMemo(() => {
        const initial: Record<string, string> = {};

        requestParameters.forEach((param) => {
            initial[param.name] = param.name === "Authorization" ? `Basic ${credentials}` : param?.value ?? "";
        });
        return initial;
    }, [requestParameters, selectedProject]);

    const handleGenerateRequestOptions = (values: typeof initialValues) => {
        function mapValues() {
            return Object.entries(values).map(([key, value]) => {
                const param = requestParameters.find((p) => p.name === key);

                if (param?.headerKey) {
                    return {
                        [key]: value,
                        headerKey: param.headerKey,
                    };
                }

                if (param?.queryKey) {
                    return {
                        [key]: value,
                        queryKey: param.queryKey,
                    };
                }

                return { [key]: value };
            });
        }

        const payload: Record<"body" | "headers" | "query", Record<string, string>> = {
            body: {},
            headers: {},
            query: {},
        };

        mapValues().forEach((param) => {
            const { headerKey, queryKey, ...rest } = param;

            if (headerKey) {
                payload.headers = { ...payload.headers, ...rest };
            } else if (queryKey) {
                payload.query = { ...payload.query, ...rest };
            } else {
                payload.body = { ...payload.body, ...rest };
            }
        });

        return payload;
    };

    // const handleSendRequest = (values: typeof initialValues) => {
    //     const payload = handleGenerateRequestOptions(values);
    //     simulateRequest({ payload, endpoint, method, encodedClientNSecretKeys: credentials, type });
    // };

   // const isDisabled = !selectedProject || loading;

    return (
        <Box>
            <Tabs
                value={activeTab}
                onChange={handleTabChange}
                sx={{
                    ...(activeTab === 0 ? { borderBottom: 1, borderColor: "divider" } : {}),
                    "& .MuiTab-root": {
                        color: "text.secondary",
                        minHeight: "24px !important",
                        "&.Mui-selected": {
                            color: "primary.main",
                        },
                    },
                }}
            >
                {tabOptions.map((option, index) => (
                    <Tab
                        key={index}
                        label={option}
                        iconPosition="start"
                        icon={
                            option === "Documentation" ? (
                                <MenuBookIcon fontSize="small" />
                            ) : (
                                <PlayCircleOutlineIcon fontSize="small" />
                            )
                        }
                        sx={{
                            textTransform: "none",
                            maxWidth: "max-content !important",
                            minWidth: "max-content !important",
                            paddingX: 1,
                        }}
                    />
                ))}
            </Tabs>

            {activeTab === 0 && children}
            {activeTab === 1 && (
                <Box sx={{ border: 1, borderColor: "divider", borderRadius: 2, overflow: "hidden" }}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ borderBottom: 1, borderColor: "divider", p: 1 }}
                    >
                        <Image
                            src="/images/logo-light.png"
                            height={20}
                            width={90}
                            alt="logo"
                            style={{ marginLeft: 2, cursor: "pointer" }}
                        />
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Stack direction="row" alignItems="center" justifyContent="flex-end">
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    sx={{
                                        border: 1,
                                        borderColor: "divider",
                                        borderRadius: 1,
                                        py: 0.3,
                                        px: 0.7,
                                        cursor: "pointer",
                                        mr: 1,
                                        maxWidth: 350,
                                    }}
                                >
                                    <Typography
                                        variant="caption"
                                        color="success"
                                        sx={{
                                            fontWeight: "bold",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        {method}:{" "}
                                        <Typography
                                            component="span"
                                            color="text.primary"
                                            variant="caption"
                                            sx={{ fontWeight: "medium" }}
                                        >
                                            {" "}
                                            {BASE_URL}
                                            {endpoint}
                                        </Typography>
                                    </Typography>

                                    {/* {copied && copyType === "endpoint" ? (
                                        <CheckIcon fontSize="small" color="success" sx={{ fontSize: 14, ml: 1 }} />
                                    ) : (
                                        <ContentCopyIcon
                                            sx={{ fontSize: 14, ml: 1 }}
                                            onClick={() => {
                                                Copy(`${BASE_URL}${endpoint}`);
                                                setCopyType("endpoint");
                                            }}
                                        />
                                    )} */}
                                </Stack>

                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    onClick={(event) => setAnchorEl(event.currentTarget)}
                                    spacing={0.5}
                                    sx={{
                                        border: 1,
                                        borderColor: "divider",
                                        borderRadius: 1,
                                        py: 0.3,
                                        pl: 0.7,
                                        cursor: "pointer",
                                        maxWidth: 150,
                                    }}
                                >
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            fontWeight: "medium",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        {selectedProject?.application?.name ?? "Select application"}
                                    </Typography>
                                    <KeyboardArrowDownIcon fontSize="small" />
                                </Stack>
                            </Stack>
                        </Stack>

                        <Menu
                            id="projects-menu"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            elevation={1}
                            sx={{
                                "& .MuiPaper-root": {
                                    elevation: 0,
                                    borderRadius: 2,
                                    mt: 0.5,
                                    maxHeight: 300,
                                },
                            }}
                        >
                            {/* {applications?.data?.map((project: any, index: number) => (
                                <MenuItem
                                    key={index}
                                    onClick={() => {
                                        setSelectedProject(project);
                                        handleClose();
                                    }}
                                    sx={{ py: 0.5, fontSize: 14, px: 1.5 }}
                                >
                                    <Checkbox
                                        size="small"
                                        checked={selectedProject?.id === project.id}
                                        sx={{ p: 0, mr: 1 }}
                                    />
                                    {project.application.name}
                                </MenuItem>
                            ))} */}
                        </Menu>
                    </Stack>

                    {/* <Grid container>
                        <Grid
                            size={4}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                position: "relative",
                                height: 450,
                                maxHeight: 450,
                                overflow: "auto",
                            }}
                        >
                            <Formik
                                initialValues={initialValues}
                                key={selectedProject?.id || "no-project"}
                                //onSubmit={handleSendRequest}
                            >
                                {(formik) => (
                                    <Form style={{ flex: 1, position: "relative", overflow: "hidden" }}>
                                        <Stack sx={{ overflow: "auto", height: "100%", paddingBottom: 6 }}>
                                            {selectedProject ? (
                                                <Stack sx={{ px: 2, py: 1 }}>
                                                    <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                                                        Request parameters
                                                    </Typography>

                                                    <Stack spacing={2} sx={{ mt: 1 }}>
                                                        {requestParameters.map((parameter) =>
                                                            renderFormField({ parameter, formik })
                                                        )}
                                                    </Stack>
                                                </Stack>
                                            ) : (
                                                <Stack
                                                    justifyContent="center"
                                                    alignItems="center"
                                                    sx={{ height: "100%", px: 4 }}
                                                >
                                                    <Typography
                                                        variant="body2"
                                                        sx={{ fontWeight: "medium", textAlign: "center" }}
                                                    >
                                                        Select an application to start your simulation
                                                    </Typography>
                                                </Stack>
                                            )}

                                            {selectedProject && requestParameters.length === 0 && (
                                                <Stack
                                                    justifyContent="center"
                                                    alignItems="center"
                                                    sx={{ height: "100%", px: 4 }}
                                                >
                                                    <Typography
                                                        variant="body2"
                                                        sx={{ fontWeight: "medium", textAlign: "center" }}
                                                    >
                                                        No parameters required for this request
                                                    </Typography>
                                                </Stack>
                                            )}
                                        </Stack>

                                        <Tooltip
                                            title={
                                                !selectedProject
                                                    ? "Select a project first"
                                                    : loading
                                                    ? "Sending..."
                                                    : "Send Request"
                                            }
                                        >
                                            <Box
                                                component="button"
                                                type="submit"
                                                disabled={isDisabled}
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 1,
                                                    position: "absolute",
                                                    bottom: 10,
                                                    right: "50%",
                                                    transform: "translateX(50%)",
                                                    bgcolor: "primary.light",
                                                    borderRadius: "50%",
                                                    p: 1,
                                                    border: "none",
                                                    cursor: isDisabled ? "not-allowed" : "pointer",
                                                    "@keyframes spin": {
                                                        "0%": {
                                                            transform: "rotate(0deg)",
                                                        },
                                                        "100%": {
                                                            transform: "rotate(360deg)",
                                                        },
                                                    },
                                                }}
                                            >
                                                <WebhookRoundedIcon
                                                    sx={{
                                                        color: "common.white",
                                                        animation: loading ? "spin 1s linear infinite" : "none",
                                                    }}
                                                />
                                            </Box>
                                        </Tooltip>
                                    </Form>
                                )}
                            </Formik>
                        </Grid>

                        <Grid
                            size={8}
                            sx={{
                                borderLeft: 1,
                                borderColor: "divider",
                                height: 450,
                                maxHeight: 450,
                                overflow: "auto",
                                position: "relative",
                            }}
                        >
                            {response && (
                                <ReactJson
                                    src={response}
                                    displayDataTypes={false}
                                    name={false}
                                    indentWidth={8}
                                    enableClipboard={false}
                                    style={{ fontSize: 14 }}
                                />
                            )}
                            {!response && (
                                <Stack sx={{ p: 2 }}>
                                    <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                                        Response will appear here
                                    </Typography>
                                </Stack>
                            )}

                            {response && (
                                <Box
                                    sx={{
                                        position: "absolute",
                                        top: 5,
                                        right: 5,
                                    }}
                                >
                                    <Tooltip title={copied ? "Copied" : "Copy to clipboard"}>
                                        <IconButton
                                            size="small"
                                            onClick={() => {
                                                Copy(JSON.stringify(response, null, 2));
                                                setCopyType("response");
                                            }}
                                        >
                                            {copied && copyType === "response" ? (
                                                <CheckIcon color="success" sx={{ fontSize: 14 }} />
                                            ) : (
                                                <ContentCopyIcon color="action" sx={{ fontSize: 14 }} />
                                            )}
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            )}
                        </Grid>
                    </Grid> */}
                </Box>
            )}
        </Box>
    );
};