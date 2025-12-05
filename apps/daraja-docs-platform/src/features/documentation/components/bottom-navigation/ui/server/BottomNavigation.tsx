import { Box, Stack, Typography, Paper, IconButton } from '@mui/material';
import { Frown, SmilePlus, Smile, Angry } from 'lucide-react';
import { NavInteractive } from '../client/NavInteractive';

interface NavDoc {
    title: string;
    segment: string;
}

interface BottomNavigationProps {
    prevDoc?: NavDoc;
    nextDoc?: NavDoc;
}

export const BottomNavigation = ({ prevDoc, nextDoc }: BottomNavigationProps) => {
    return (
        <Box sx={{ mt: 4 }} id="bottom-navigator">
            <NavInteractive prevDoc={prevDoc} nextDoc={nextDoc} />

            <Stack direction="row" alignItems="center" justifyContent="center">
                <Paper sx={{ border: 1, borderColor: 'divider', py: 1, borderRadius: 50, pl: 2, pr: 1 }}>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                        <Typography variant="body2" fontWeight={500}>
                            Was this helpful?
                        </Typography>
                        <Stack direction="row" alignItems="center">
                            <IconButton>
                                <SmilePlus size={18} />
                            </IconButton>
                            <IconButton>
                                <Smile size={18} />
                            </IconButton>
                            <IconButton>
                                <Frown size={18} />
                            </IconButton>
                            <IconButton>
                                <Angry size={18} />
                            </IconButton>
                        </Stack>
                    </Stack>
                </Paper>
            </Stack>
        </Box>
    );
};
