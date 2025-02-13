import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/sign-in",
        destination: "api/auth/login",
        permanent: true,
      },
      {
        source: "/sign-up",
        destination: "api/auth/register",
        permanent: true,
      },
      {
        source: "/sign-out",
        destination: "api/auth/logout",
        permanent: true,
      },
    ]
  },

  webpack: (config) => {
    config.resolve.alias.canvas = false
    config.resolve.alias.encoding = false
    return config
  },

  images: {
    domains: ["gravatar.com"],
  },
}

export default nextConfig
