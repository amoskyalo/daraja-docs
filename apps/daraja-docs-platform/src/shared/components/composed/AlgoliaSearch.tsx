'use client';

import { Box, Dialog, DialogContent, Typography } from '@mui/material';
import { useAlgoliaSearch, SearchInput, RecentSearches, SearchResults, SearchFooter } from './algolia';

export const SearchModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
    const {
        query,
        results,
        recentSearches,
        loading,
        selectedIndex,
        showRecent,
        listContainerRef,
        handleClose,
        handleResultClick,
        handleQueryChange,
        highlightText,
    } = useAlgoliaSearch(open, onClose);

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
                        borderRadius: 2,
                    },
                },
            }}
        >
            <SearchInput query={query} loading={loading} onQueryChange={handleQueryChange} onClose={handleClose} />

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
                        <RecentSearches
                            recentSearches={recentSearches}
                            selectedIndex={selectedIndex}
                            onResultClick={handleResultClick}
                        />
                    )}

                    {(query || results.length > 0) && (
                        <SearchResults
                            results={results}
                            selectedIndex={selectedIndex}
                            onResultClick={handleResultClick}
                            highlightText={highlightText}
                        />
                    )}
                </Box>
            </DialogContent>

            <SearchFooter />
        </Dialog>
    );
};
