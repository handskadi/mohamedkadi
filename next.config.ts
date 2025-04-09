/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // ✅ THE key line!
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: "/%E2%B5%8E%E2%B4%B0%E2%B4%B7-%E2%B4%B3%E2%B5%89%E2%B5%96", // ⵎⴰⴷ-ⴳⵉⵖ (encoded)
        destination: "/mad-gigh",
      },
      {
        source: "/ⵎⴰⴷ-ⴳⵉⵖ", // just in case
        destination: "/mad-gigh",
      },
    ];
  },
  i18n: {
    locales: ["en", "fr", "de", "ar"],
    defaultLocale: "en",
  },
};

module.exports = nextConfig;
