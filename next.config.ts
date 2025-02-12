import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_SENDGRID_API_KEY: process.env.NEXT_PUBLIC_SENDGRID_API_KEY,
    NEXT_PUBLIC_SENDER_EMAIL: process.env.NEXT_PUBLIC_SENDER_EMAIL,
  },
   // Enable static export
  output: 'export', // This tells Next.js to export the project as static files
};

export default nextConfig;
