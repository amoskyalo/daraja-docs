import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [{ hostname: '*' }],
    },
};

export default nextConfig;
