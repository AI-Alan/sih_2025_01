// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // required for next export in latest Next
    reactStrictMode: true,
    trailingSlash: true    // helps gh-pages path handling
}

module.exports = nextConfig
