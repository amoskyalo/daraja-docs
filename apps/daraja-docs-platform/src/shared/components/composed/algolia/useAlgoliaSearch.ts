import { useState, useEffect, useCallback, useRef } from 'react';
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

export const useAlgoliaSearch = (open: boolean, onClose: () => void) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [initialResults, setInitialResults] = useState<any[]>([]);
    const [recentSearches, setRecentSearches] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const listContainerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // Load recent searches from session storage
    useEffect(() => {
        const saved = JSON.parse(sessionStorage.getItem(RECENT_SEARCHES_KEY) || '[]');
        setRecentSearches(saved);
    }, []);

    // Save recent search
    const saveRecentSearch = (searchItem: any) => {
        const updatedRecent = [searchItem, ...recentSearches.filter((term) => term !== searchItem)].slice(
            0,
            MAX_RECENT_SEARCHES,
        );

        setRecentSearches(updatedRecent);
        sessionStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updatedRecent));
    };

    // Search documentation
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

    // Debounced search
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            searchDocumentation(query);
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [query, searchDocumentation]);

    // Load initial results
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

    // Keyboard navigation
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

    // Reset selected index when results change
    useEffect(() => {
        setSelectedIndex(-1);
    }, [query, results, recentSearches]);

    // Scroll selected item into view
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

    const highlightText = (text: string, highlight: any) => {
        if (!highlight?.value) return text;
        return highlight.value;
    };

    const showRecent = !query && recentSearches.length > 0;

    return {
        query,
        results,
        recentSearches,
        loading,
        selectedIndex,
        showRecent,
        listContainerRef,
        handleClose,
        handleResultClick,
        handleRecentSearchClick,
        handleQueryChange,
        highlightText,
    };
};
