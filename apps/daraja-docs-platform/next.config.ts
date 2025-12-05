import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [{ hostname: '*' }],
        formats: ['image/webp', 'image/avif'],
        minimumCacheTTL: 86400,
        dangerouslyAllowSVG: true,
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },

    experimental: {
        optimizePackageImports: [
            '@mui/material',
            '@mui/icons-material',
            'lucide-react',
        ],
        turbo: {
            rules: {
                '*.mdx': {
                    loaders: ['@next/mdx-loader'],
                    as: '*.js',
                },
            },
        },
    },

    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },

    output: 'standalone',
    
    compress: true,
    
    async headers() {
        if (process.env.NODE_ENV !== 'production') {
            return [];
        }

        return [
            {
                source: '/docs/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
            {
                source: '/_next/static/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
        ];
    },

    async redirects() {
        return [
            {
                source: '/docs',
                destination: '/docs/introduction',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
