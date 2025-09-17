import { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { PlaygroundUI } from './components/PlaygroundUI';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const tabOptions = ['Documentation', 'Playground'];

interface PlaygroundProps {
    children: React.ReactNode;
}

export const Playground = ({ children }: PlaygroundProps) => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    return (
        <Box>
            <Tabs
                value={activeTab}
                onChange={handleTabChange}
                sx={{
                    ...(activeTab === 0 ? { borderBottom: 1, borderColor: 'divider' } : {}),
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
                {tabOptions.map((option, index) => (
                    <Tab
                        key={index}
                        label={option}
                        iconPosition="start"
                        icon={
                            option === 'Documentation' ? (
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

            {activeTab === 0 && children}
            {activeTab === 1 && <PlaygroundUI />}
        </Box>
    );
};
