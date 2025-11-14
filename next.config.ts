import type { NextConfig } from "next";

import { PrismaPlugin } from '@prisma/nextjs-monorepo-workaround-plugin'

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()]
    }
    return config
  },
  typescript:
  {
    ignoreBuildErrors:true,
  },
  images:{
    remotePatterns:[{
      protocol:"https",
      hostname:"res.cloudinary.com"
    }]
  },
  reactCompiler: true,
  cacheComponents:true,
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
    ];
  },
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
