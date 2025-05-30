/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'via.placeholder.com',
            'images.unsplash.com',
            'down-vn.img.susercontent.com',
        ],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
   
    
};

export default nextConfig;
