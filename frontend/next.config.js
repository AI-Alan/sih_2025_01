// next.config.js
/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
// For GitHub Pages project sites, set this to your repo name
const basePath = isProd ? '/sih_2025_01' : ''

const nextConfig = {
    output: 'export', // required for static export in latest Next
    reactStrictMode: true,
    trailingSlash: true,
    // basePath handles both routing AND asset paths for GitHub Pages
    basePath: basePath,
    images: {
        unoptimized: true,
    },
}

module.exports = nextConfig
