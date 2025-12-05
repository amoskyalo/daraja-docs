'use client';

import { useState, useEffect } from 'react';
import { Box, Link, Stack, Typography } from '@mui/material';
import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined';
import type { HeadingItem } from '../../../../utils/extractTableOfContents';

interface TocInteractiveProps {
    headings: HeadingItem[];
}

export const TocInteractive = ({ headings }: TocInteractiveProps) => {
    const [activeId, setActiveId] = useState<string>(headings[0]?.id || '');
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const container = document.getElementById('layout');

        const handleScroll = () => {
            if (container && container.scrollTop >= 100) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        container?.addEventListener('scroll', handleScroll);

        return () => {
            container?.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '-20px 0px -20% 0px' }
        );

        headings.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [headings]);

    const handleClick = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handleScrollTop = () => {
        const container = document.getElementById('layout');
        container?.scrollTo({ top: 0, behavior: 'smooth' });
    };

    function arrangeHeaders() {
        let cachePrevLastParentLevel: number | null = null;

        return headings.map((heading) => {
            if (cachePrevLastParentLevel === null || cachePrevLastParentLevel >= heading?.level) {
                cachePrevLastParentLevel = heading?.level;
            }

            return {
                ...heading,
                isChild: cachePrevLastParentLevel < heading?.level,
            };
        });
    }

    return (
        <>
            {arrangeHeaders().map(({ text, id, isChild }) => (
                <Box
                    key={id}
                    sx={{
                        py: 0.5,
                        pl: isChild ? 3 : 1.5,
                    }}
                >
                    <Link
                        onClick={() => handleClick(id)}
                        sx={{
                            cursor: 'pointer',
                            color: activeId === id ? 'primary.main' : 'text.secondary',
                            textDecoration: 'none',
                            fontSize: isChild ? '13px' : '14px',
                            fontWeight: isChild ? 400 : 500,
                            display: 'block',
                            transition: 'color 0.2s ease',
                            '&:hover': {
                                color: 'primary.main',
                                textDecoration: 'underline',
                            },
                        }}
                    >
                        {text}
                    </Link>
                </Box>
            ))}

            {isScrolled && (
                <Stack
                    onClick={handleScrollTop}
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    sx={{ cursor: 'pointer', mt: 2 }}
                >
                    <Typography sx={{ fontSize: '14px', color: 'text.secondary' }}>Scroll to top</Typography>
                    <ArrowCircleUpOutlinedIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                </Stack>
            )}
        </>
    );
};
