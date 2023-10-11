/** @type {import('next').NextConfig} */

const allowedImageWordPressDomain = new URL( process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL ).hostname;

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      allowedImageWordPressDomain,
      'swewoocommerce.dfweb.no',
      'res.cloudinary.com',
      'via.placeholder.com',
      'i0.wp.com'
    ],
  },
};

module.exports = nextConfig;
