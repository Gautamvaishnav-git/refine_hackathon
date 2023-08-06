/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: `zfcpzvoiduusbusrqswu.supabase.co`,
        pathname: "/**/*",
      },
    ],
  },
};

module.exports = nextConfig;
