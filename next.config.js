/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["openweathermap.org", "images.unsplash.com"],
  },
};

module.exports = nextConfig;
