import { TextField, InputAdornment } from "@mui/material";
import { useGridApiContext } from "@mui/x-data-grid";
import { useCallback, useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";

export const DatagridSearchInputField = () => {
    const apiRef = useGridApiContext();
    const [searchValue, setSearchValue] = useState("");

    const updateSearchValue = useCallback(
        (newSearchValue: string) => {
            apiRef.current.setQuickFilterValues([newSearchValue]);
        },
        [apiRef]
    );

    useEffect(() => {
        updateSearchValue(searchValue);
    }, [searchValue, updateSearchValue]);

    return (
        <TextField
            placeholder="Type to search..."
            variant="standard"
            size="small"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            slotProps={{
                input: {
                    style: {
                        height: "24px",
                        width: "200px",
                        fontSize: "14px",
                    },
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon fontSize="small" color="action" />
                        </InputAdornment>
                    ),
                    disableUnderline: true,
                },
                htmlInput: {
                    style: {
                        padding: 0,
                    },
                },
            }}
        />
    );
};