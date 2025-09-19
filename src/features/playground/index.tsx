import { Box, Tabs, Tab } from '@mui/material';
import { PlaygroundUI } from './components/PlaygroundUI';
import { useSearchParams } from '@/shared/hooks';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const tabOptions = [
    { label: 'Documentation', value: 'documentation', icon: MenuBookIcon },
    { label: 'API Errors', value: 'errors', icon: ErrorOutlineIcon },
    { label: 'Playground', value: 'playground', icon: PlayCircleOutlineIcon },
];
interface PlaygroundProps {
    children: React.ReactNode;
    apiSpecsYaml: any;
}

export const Playground = ({ children, apiSpecsYaml }: PlaygroundProps) => {
    const { setParams, getParam } = useSearchParams();
    const activeTab = getParam('tab') || 'documentation';

    const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
        setParams({ tab: newValue });
    };

    return (
        <Box sx={{ py: 2 }}>
            <Tabs
                value={activeTab}
                onChange={handleTabChange}
                sx={{
                    borderBottom: 1,
                    borderColor: 'divider',
                    '& .MuiTab-root': {
                        color: 'text.secondary',
                        minHeight: '20px !important',
                        maxHeight: '20px !important',
                        height: '20px !important',
                        '&.Mui-selected': {
                            color: 'text.primary',
                        },
                    },
                    mb: 2,
                    height: '40px !important',
                    minHeight: '40px !important',
                    maxHeight: '40px !important',
                }}
            >
                {tabOptions.map(({ label, value, icon: Icon }, index) => (
                    <Tab
                        key={index}
                        label={label}
                        value={value}
                        iconPosition="start"
                        icon={<Icon fontSize="small" />}
                        sx={{
                            textTransform: 'none',
                            maxWidth: 'max-content !important',
                            minWidth: 'max-content !important',
                            paddingX: 1,
                            fontWeight: 400
                        }}
                    />
                ))}
            </Tabs>

            {activeTab === 'documentation' && children}
            {activeTab === 'playground' && <PlaygroundUI apiSpecsYaml={apiSpecsYaml} />}
        </Box>
    );
};
