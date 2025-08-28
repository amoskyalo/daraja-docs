import Image from 'next/image';
import { Stack, Box } from '@mui/material';

const branding = {
    component: ({ isMobile }: { isMobile: boolean }) => ({
        logo: (
            <Box component="div">
                <Stack direction="row" alignItems="center" sx={{ height: '100%', paddingTop: 0.5 }}>
                    <Image
                        src="/images/logo.png"
                        alt="logo"
                        width={isMobile ? 150 : 170}
                        height={100}
                        priority
                        style={{ objectFit: 'cover' }}
                    />
                </Stack>
            </Box>
        ),
        title: '',
    }),
};

export default branding;
