'use client';

import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import { Description as DocsIcon } from '@mui/icons-material';

interface SearchResultsProps {
    results: any[];
    selectedIndex: number;
    onResultClick: (result: any) => void;
    highlightText: (text: string, highlight: any) => string;
}

export const SearchResults = ({ results, selectedIndex, onResultClick, highlightText }: SearchResultsProps) => {
    return (
        <>
            {results.map((result, index) => (
                <Box key={result.objectID || index}>
                    <List sx={{ p: 0 }}>
                        <ListItem
                            key={result.objectID || index}
                            data-index={result.objectID}
                            onClick={() => onResultClick(result)}
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
                                <DocsIcon color="primary" />
                            </Box>
                            <ListItemText
                                primary={
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            textTransform: 'capitalize',
                                            '& mark': {
                                                backgroundColor: '#3b82f6',
                                                color: 'white',
                                                padding: '0 2px',
                                                borderRadius: '2px',
                                                fontWeight: 'bold',
                                            },
                                        }}
                                        dangerouslySetInnerHTML={{
                                            __html: highlightText(result.title, result._highlightResult?.title),
                                        }}
                                    />
                                }
                                secondary={
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                            '& mark': {
                                                backgroundColor: '#dbeafe',
                                                color: '#3b82f6',
                                                padding: '0 2px',
                                                borderRadius: '2px',
                                            },
                                        }}
                                        dangerouslySetInnerHTML={{
                                            __html: highlightText(
                                                result.slug?.substring(0, 150) + '...',
                                                result._highlightResult?.slug,
                                            ),
                                        }}
                                    />
                                }
                            />
                        </ListItem>
                    </List>
                </Box>
            ))}
        </>
    );
};
