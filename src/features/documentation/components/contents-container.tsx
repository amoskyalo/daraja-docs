'use client';

import { MDXRenderer } from '../../markdown/components';
import { DocsBottomNavigator } from './bottom-navigator';
import { TableOfContents } from './table-of-contents';
import { alpha, Grid, TextField, InputAdornment, Stack } from '@mui/material';
import { useResponsiveness, useSearchParams } from '@/shared/hooks';
import { useState, useEffect } from 'react';
import { useAIContext } from '@/shared/context';
import { Playground } from '../../playground';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

export const ContentsContainer = ({ doc, prevDoc, nextDoc, hideTabs }: any) => {
    const { isMobile } = useResponsiveness();
    const { drawerOpen, question, setQuestion, handleSendRequest, handleKeyPress } = useAIContext();
    const { getParam } = useSearchParams();

    const activeTab = getParam('tab') || 'documentation';

    const [hideTextField, setHideTextField] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setHideTextField(true);
                    } else {
                        setHideTextField(false);
                    }
                });
            },
            { rootMargin: '120px 0px 0px 0px' },
        );

        const element = document.getElementById('bottom-navigator');
        if (element) observer.observe(element);

        return () => observer.disconnect();
    }, [activeTab]);

    return (
        <Grid
            id="docs-container"
            container
            sx={{
                height: '100%',
                position: 'relative',
                flex: 1,
                pl: { xs: 0, md: 0, lg: 4 },
            }}
        >
            <Grid
                size={isMobile ? 12 : activeTab === 'playground' ? 12 : 8.5}
                sx={{ pb: 4, pl: { xs: 1, md: 1, lg: 0 }, pr: 2, position: 'relative' }}
            >
                <Playground apiSpecsYaml={doc.apiSpecsYaml} hideTabs={hideTabs}>
                    <MDXRenderer mdxSource={doc.mdxSource} />
                    <DocsBottomNavigator prevDoc={prevDoc} nextDoc={nextDoc} />

                    {activeTab !== 'playground' && (
                        <Stack
                            alignItems="center"
                            justifyContent="center"
                            sx={{
                                position: 'fixed',
                                bottom: 10,
                                left: 0,
                                right: 0,
                                opacity: !drawerOpen && !hideTextField ? 1 : 0,
                                transition: 'opacity 0.3s ease-in-out',
                                pointerEvents: !drawerOpen && !hideTextField ? 'auto' : 'none',
                            }}
                        >
                            <TextField
                                placeholder="Ask question"
                                sx={{
                                    width: 350,
                                    '& .MuiOutlinedInput-root': {
                                        height: 44,
                                        cursor: 'pointer',
                                        backgroundColor: 'background.paper',
                                        borderRadius: '25px !important',
                                    },
                                }}
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                onKeyDown={handleKeyPress}
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end" sx={{ cursor: 'pointer' }}>
                                                <Stack
                                                    direction="row"
                                                    alignItems="center"
                                                    justifyContent="center"
                                                    onClick={() => handleSendRequest()}
                                                    sx={{
                                                        backgroundColor: (theme) =>
                                                            alpha(theme.palette.primary.main, 0.5),
                                                        height: 28,
                                                        width: 28,
                                                        borderRadius: '50%',
                                                    }}
                                                >
                                                    <ArrowUpwardIcon fontSize="small" sx={{ color: 'white' }} />
                                                </Stack>
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                            />
                        </Stack>
                    )}
                </Playground>
            </Grid>

            {!isMobile && activeTab !== 'playground' && (
                <Grid
                    size={3.5}
                    sx={{
                        py: 2,
                        display: isMobile ? 'none' : 'block',
                    }}
                >
                    <TableOfContents headings={doc.tableOfContents} />
                </Grid>
            )}
        </Grid>
    );
};
