'use client';

import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import { History as HistoryIcon } from '@mui/icons-material';

interface RecentSearchesProps {
    recentSearches: any[];
    selectedIndex: number;
    onResultClick: (result: any) => void;
}

export const RecentSearches = ({ recentSearches, selectedIndex, onResultClick }: RecentSearchesProps) => {
    return (
        <Box>
            <Box sx={{ px: 2, pt: 1 }}>
                <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}
                >
                    Recent • {recentSearches.length}
                </Typography>
            </Box>
            <List sx={{ p: 0 }}>
                {recentSearches.map((searchItem, index) => (
                    <ListItem
                        key={index}
                        data-index={index}
                        onClick={() => onResultClick(searchItem)}
                        sx={{
                            '&:hover': {
                                backgroundColor: 'action.hover',
                            },
                            backgroundColor: selectedIndex === index ? 'action.selected' : 'transparent',
                            cursor: 'pointer',
                            padding: '2px 12px !important',
                        }}
                    >
                        <Box sx={{ mr: 2 }}>
                            <HistoryIcon color="action" />
                        </Box>
                        <ListItemText
                            primary={<Typography variant="body1">{searchItem.title}</Typography>}
                            secondary={
                                <Typography variant="body2" color="text.secondary">
                                    {searchItem.slug}
                                </Typography>
                            }
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};
