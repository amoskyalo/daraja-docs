import { Container, Box, Typography, Button } from '@mui/material';
import Link from 'next/link';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function DocsNotFound() {
    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Box 
                sx={{ 
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 3
                }}
            >
                <ErrorOutlineIcon 
                    sx={{ 
                        fontSize: 80, 
                        color: 'error.main',
                        opacity: 0.7
                    }} 
                />
                
                <Typography variant="h3" color="error" fontWeight="bold">
                    Documentation Not Found
                </Typography>
                
                <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '600px' }}>
                    The documentation page you&apos;re looking for doesn&apos;t exist or has been moved.
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Link href="/docs/introduction" passHref>
                        <Button variant="contained" size="large">
                            Go to Introduction
                        </Button>
                    </Link>
                    
                    <Link href="/" passHref>
                        <Button variant="outlined" size="large">
                            Back to Home
                        </Button>
                    </Link>
                </Box>
                
                <Box sx={{ mt: 4, p: 3, backgroundColor: 'action.hover', borderRadius: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                        If you believe this is an error, please check the URL or contact our support team.
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
}