// @ts-check
const withNextIntl = require('next-intl/plugin')();

/** @type {import('next').NextConfig} */
const path = require('path')
const nextConfig = {
    reactStrictMode: true,
    poweredByHeader: false,
    // trailingSlash: false,
    compress: false,
    skipTrailingSlashRedirect: true,
    // output: 'standalone',
    compiler: {
        styledComponents: true
    },
    // sassOptions: {
    //     includePaths: [path.join(__dirname, 'src', 'styles')],
    // },
}

module.exports = withNextIntl(nextConfig);
