import { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { PlaygroundUI } from './components/PlaygroundUI';
import { useSearchParams } from '@/shared/hooks';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const tabOptions = [
    { label: 'Documentation', value: 'documentation' },
    { label: 'Playground', value: 'playground' },
];

interface PlaygroundProps {
    children: React.ReactNode;
}

export const Playground = ({ children }: PlaygroundProps) => {
    const { setParams, getParam } = useSearchParams();
    const activeTab = getParam('tab') || 'documentation';

    const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
        setParams({ tab: newValue });
    };

    return (
        <Box>
            <Tabs
                value={activeTab}
                onChange={handleTabChange}
                sx={{
                    ...(activeTab === "documentation" ? { borderBottom: 1, borderColor: 'divider' } : {}),
                    '& .MuiTab-root': {
                        color: 'text.secondary',
                        minHeight: '24px !important',
                        '&.Mui-selected': {
                            color: 'primary.main',
                        },
                    },
                    mb: 2,
                }}
            >
                {tabOptions.map(({ label, value }, index) => (
                    <Tab
                        key={index}
                        label={label}
                        iconPosition="start"
                        icon={
                            value === 'documentation' ? (
                                <MenuBookIcon fontSize="small" />
                            ) : (
                                <PlayCircleOutlineIcon fontSize="small" />
                            )
                        }
                        sx={{
                            textTransform: 'none',
                            maxWidth: 'max-content !important',
                            minWidth: 'max-content !important',
                            paddingX: 1,
                        }}
                    />
                ))}
            </Tabs>

            {activeTab === "documentation" && children}
            {activeTab === "playground" && <PlaygroundUI />}
        </Box>
    );
};
