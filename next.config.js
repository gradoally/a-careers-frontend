// @ts-check
const withNextIntl = require("next-intl/plugin")();

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  poweredByHeader: false,
  compress: false,
  skipTrailingSlashRedirect: true,
  compiler: {
    styledComponents: true,
  },
};

module.exports = withNextIntl(nextConfig);
