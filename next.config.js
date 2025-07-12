/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for Cloudflare Pages
  output: 'export',
  
  // Disable image optimization since we're using static export
  images: {
    unoptimized: true,
  },
  
  // Ensure trailing slashes for better compatibility
  trailingSlash: true,
  
  // Disable server-side features since we're using static export
  experimental: {
    appDir: false,
  },
  
  // Configure for static hosting
  assetPrefix: '',
  
  // Ensure proper handling of dynamic routes
  generateBuildId: async () => {
    return 'lastingimpression-build'
  }
}

module.exports = nextConfig 