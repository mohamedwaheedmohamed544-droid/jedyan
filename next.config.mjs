/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: { unoptimized: true },
  // the dashboard needs a Node runtime; better-sqlite3 / pg stay server-only
  serverExternalPackages: ["better-sqlite3", "pg"],
  experimental: {
    // media uploads go through a server action; platforms cap the request body (Vercel ~4.5MB)
    serverActions: { bodySizeLimit: "6mb" },
  },
};
export default nextConfig;
