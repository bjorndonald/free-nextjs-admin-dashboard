/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lasgcce.com',
            },
        ],
    },
};

export default nextConfig;
