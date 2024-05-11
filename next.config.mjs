/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        styledComponents: true,
    },
    images: {
        domains: ['dummyimage.com', 'cdn-images.farfetch-contents.com', 'firebasestorage.googleapis.com']
    }
};

export default nextConfig;
