'use client';

import { Typography, Button, Stack, Link } from '@mui/material';
import { SignUpForm } from './_components/sign-up-form';
import { useSearchParams } from '../../shared/hooks';

const MiniApps = () => {
    const { getParam, setParams } = useSearchParams();
    const tab = getParam('tab');

    return (
        <Stack
            sx={{
                width: { xs: '100%', md: '100%', lg: '75%' },
                mx: 'auto',
                pt: { xs: 3, md: 3, lg: tab ? 2 : 6 },
            }}
        >
            {!tab ? (
                <>
                    <Stack direction="column" alignItems="center">
                        <Typography variant="h2" fontWeight={600}>
                            About the Mini-program
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 1, textAlign: 'center' }}>
                            The Mini Program technology is the answer to rapid mobile app development. Mini Programs are
                            sub-applications that run inside the mobile app. You can access various services and
                            features on Mini Programs without the need to install additional applications. Discover
                            guides, tutorials and references to quickly get started.
                        </Typography>

                        <Stack direction="row" spacing={3} sx={{ mt: 4 }}>
                            <Button variant="outlined" onClick={() => setParams({ tab: 'sign-up' })}>
                                Get started
                            </Button>
                            <Button variant="contained">
                                <Link
                                    href="https://mpesaminiapps.safaricom.co.ke/index"
                                    underline="none"
                                    color="inherit"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Learn more
                                </Link>
                            </Button>
                        </Stack>
                    </Stack>
                    <Stack
                        sx={{
                            flex: 1,
                            backgroundImage: "url('/images/mini-apps.png')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />{' '}
                </>
            ) : (
                <SignUpForm />
            )}
        </Stack>
    );
};

export default MiniApps;
