/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  async headers() {
    return [
      {
        
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "https://gameistech.com" }, // Replace with your actual origin
          { key: "Access-Control-Allow-Methods", value: "GET, DELETE, PATCH, POST, PUT" },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  
};

module.exports = nextConfig;
