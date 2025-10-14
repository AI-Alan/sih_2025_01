// next.config.js
/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
// For GitHub Pages project sites, set this to your repo name
// We hardcode it to ensure CI/CD doesn't miss an env var and break CSS/JS paths
const basePath = isProd ? '/sih_2025_01' : ''
const absolutePrefix = isProd ? 'https://ai-alan.github.io/sih_2025_01' : ''

const nextConfig = {
    output: 'export', // required for static export in latest Next
    reactStrictMode: true,
    trailingSlash: true,    // helps gh-pages path handling
    distDir: '.next',
    // Ensure assets (CSS/JS) load from the correct subpath on GitHub Pages
    basePath: basePath,
    assetPrefix: absolutePrefix || '',
    images: {
        unoptimized: true,
    },
}

module.exports = nextConfig
