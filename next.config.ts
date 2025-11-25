import type { NextConfig } from "next";
import NodePolyfillPlugin from "node-polyfill-webpack-plugin";
import webpack from "webpack";

const nextConfig: NextConfig = {
  transpilePackages: ["crypto-js"],
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: "/%E2%B5%8E%E2%B4%B0%E2%B4%B7-%E2%B4%B3%E2%B5%89%E2%B5%96",
        destination: "/mad-gigh",
      },
      {
        source: "/ⵎⴰⴷ-ⴳⵉⵖ",
        destination: "/mad-gigh",
      },
    ];
  },
  webpack(config: webpack.Configuration): webpack.Configuration {
    config.plugins = config.plugins || [];
    config.plugins.push(new NodePolyfillPlugin());

    config.resolve = {
      ...config.resolve,
      fallback: {
        ...config.resolve?.fallback,
        crypto: false,
      },
    };

    return config;
  },
};

export default nextConfig;
