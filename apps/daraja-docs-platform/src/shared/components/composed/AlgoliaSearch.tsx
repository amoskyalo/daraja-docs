'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
    Dialog,
    DialogContent,
    TextField,
    List,
    ListItem,
    ListItemText,
    Typography,
    Box,
    IconButton,
    InputAdornment,
    DialogActions,
    DialogTitle,
    Stack,
    CircularProgress,
} from '@mui/material';
import {
    Search as SearchIcon,
    Close as CloseIcon,
    Description as DocsIcon,
    History as HistoryIcon,
} from '@mui/icons-material';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { algoliasearch } from 'algoliasearch';
import { useRouter } from 'next/navigation';

const applicationID = process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID || '';
const apiKey = process.env.NEXT_PUBLIC_ALGOLIA_ADMIN_API_KEY || '';

let client: any;

try {
    if (applicationID && apiKey) {
        client = algoliasearch(applicationID, apiKey);
    }
} catch (error) {
    console.warn('Algolia client initialization failed:', error);
}

const RECENT_SEARCHES_KEY = 'search_modal_recent_searches';
const MAX_RECENT_SEARCHES = 5;

export const SearchModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [initialResults, setInitialResults] = useState<any[]>([]);
    const [recentSearches, setRecentSearches] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const listContainerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        const saved = JSON.parse(sessionStorage.getItem(RECENT_SEARCHES_KEY) || '[]');
        setRecentSearches(saved);
    }, []);

    const saveRecentSearch = (searchItem: any) => {
        const updatedRecent = [searchItem, ...recentSearches.filter((term) => term !== searchItem)].slice(
            0,
            MAX_RECENT_SEARCHES,
        );

        setRecentSearches(updatedRecent);
        sessionStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updatedRecent));
    };

    const searchDocumentation = useCallback(
        async (searchQuery: string) => {
            if (!searchQuery.trim()) {
                setResults(initialResults);
                setLoading(false);
                return;
            }

            setLoading(true);

            try {
                const { results } = (await client.search({
                    requests: [
                        {
                            indexName: 'documentation',
                            query: searchQuery,
                            attributesToHighlight: ['title', 'slug'],
                            attributesToRetrieve: ['title', 'slug'],
                            hitsPerPage: 100,
                            highlightPreTag: '<mark>',
                            highlightPostTag: '</mark>',
                        },
                    ],
                })) as any;

                setResults(results[0]?.hits || []);
            } catch (error) {
                console.error('Search error:', error);
                setResults([]);
            } finally {
                setLoading(false);
            }
        },
        [initialResults],
    );

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            searchDocumentation(query);
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [query, searchDocumentation]);

    useEffect(() => {
        if (initialResults.length === 0) {
            async function getInitialResults() {
                setLoading(true);
                try {
                    const { results } = (await client.search({
                        requests: [
                            {
                                indexName: 'documentation',
                                query: '',
                                attributesToHighlight: ['slug'],
                                attributesToRetrieve: ['title', 'slug'],
                                hitsPerPage: 100,
                            },
                        ],
                    })) as any;

                    const hits = results[0]?.hits || [];
                    setInitialResults(hits);
                    setResults(hits);
                } catch (error) {
                    console.error('Initial load error:', error);
                    setResults([]);
                } finally {
                    setLoading(false);
                }
            }

            getInitialResults();
        } else if (initialResults.length > 0 && query === '') {
            setResults(initialResults);
        }
    }, [initialResults.length, query, initialResults]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!open) return;

            const showRecent = !query && recentSearches.length > 0;
            const totalItems = showRecent ? recentSearches.length : results.length;

            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    setSelectedIndex((prev) => (prev < totalItems - 1 ? prev + 1 : prev));
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
                    break;
                case 'Enter':
                    e.preventDefault();
                    if (selectedIndex >= 0) {
                        if (showRecent && selectedIndex < recentSearches.length) {
                            handleRecentSearchClick(recentSearches[selectedIndex]);
                        } else if (!showRecent && selectedIndex < results.length) {
                            handleResultClick(results[selectedIndex]);
                        }
                    }
                    break;
                case 'Escape':
                    e.preventDefault();
                    handleClose();
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [open, query, recentSearches, results, selectedIndex]);

    useEffect(() => {
        setSelectedIndex(-1);
    }, [query, results, recentSearches]);
    useEffect(() => {
        if (selectedIndex >= 0 && listContainerRef.current) {
            const selectedElement = listContainerRef.current.querySelector(`[data-index="${selectedIndex}"]`);
            if (selectedElement) {
                selectedElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                });
            }
        }
    }, [selectedIndex]);

    const highlightText = (text: string, highlight: any) => {
        if (!highlight?.value) return text;
        return highlight.value;
    };

    const handleClose = () => {
        setQuery('');
        setSelectedIndex(-1);
        onClose();
    };

    const handleResultClick = (result: any) => {
        const navigate_url = result.slug?.split('/').slice(1).join('/');
        router.push(`/docs/${navigate_url}`);
        saveRecentSearch(result);
        handleClose();
    };

    const handleRecentSearchClick = (searchTerm: string) => {
        setQuery(searchTerm);
    };

    const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const showRecent = !query && recentSearches.length > 0;

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
            sx={{
                backdropFilter: 'blur(3px)',
            }}
            slotProps={{
                paper: {
                    sx: {
                        borderRadius: 2
                    },
                },
            }}
        >
            <DialogTitle sx={{ borderBottom: 1, borderColor: 'divider', px: 0, py: 0 }}>
                <TextField
                    autoFocus
                    fullWidth
                    placeholder="Search documentation..."
                    value={query}
                    onChange={handleQueryChange}
                    focused
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    {loading ? <CircularProgress size={18} color="inherit" /> : <SearchIcon />}
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleClose} size="small">
                                        <CloseIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        },
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': { border: 'none' },
                            '&:hover fieldset': { border: 'none' },
                            '&.Mui-focused fieldset': { border: 'none' },
                        },
                    }}
                />
            </DialogTitle>

            <DialogContent sx={{ p: 0 }}>
                <Box ref={listContainerRef} sx={{ maxHeight: '400px', overflow: 'auto' }}>
                    {!loading && query && results.length === 0 && (
                        <Box sx={{ p: 2, textAlign: 'center' }}>
                            <Typography variant="body1">{`No results for "${query}"`}</Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                Try a different search term or phrase.
                            </Typography>
                        </Box>
                    )}

                    {showRecent && (
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
                                        onClick={() => handleResultClick(searchItem)}
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: 'action.hover',
                                            },
                                            backgroundColor:
                                                selectedIndex === index ? 'action.selected' : 'transparent',
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
                    )}

                    {(query || results.length > 0) && (
                        <>
                            {results.map((result, index) => (
                                <Box key={result.objectID || index}>
                                    <List sx={{ p: 0 }}>
                                        <ListItem
                                            key={result.objectID || index}
                                            data-index={result.objectID}
                                            onClick={() => handleResultClick(result)}
                                            sx={{
                                                '&:hover': {
                                                    backgroundColor: 'action.hover',
                                                },
                                                backgroundColor:
                                                    selectedIndex === index ? 'action.selected' : 'transparent',
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
                                                            __html: highlightText(
                                                                result.title,
                                                                result._highlightResult?.title,
                                                            ),
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
                    )}
                </Box>
            </DialogContent>

            <DialogActions
                sx={{
                    borderTop: 1,
                    borderColor: 'divider',
                    p: 2,
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    gap: 2,
                }}
            >
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                        <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 1, p: 0.2 }}>
                            <ChevronDown size={16} />
                        </Box>
                        <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 1, p: 0.2 }}>
                            <ChevronUp size={16} />
                        </Box>
                    </Stack>
                    <Typography variant="body2">To navigate</Typography>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography
                        variant="caption"
                        sx={{ border: 1, borderColor: 'divider', borderRadius: 1, pb: 0.2, px: 0.5, lineHeight: 1.5 }}
                    >
                        esc
                    </Typography>
                    <Typography variant="body2">To close</Typography>
                </Stack>
            </DialogActions>
        </Dialog>
    );
};
