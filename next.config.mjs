/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
          {
             protocol: "https",
             hostname: "*.googleusercontent.com",
             port: "",
             pathname: "**",
          },
          {
            protocol: "https",
            hostname: "img.freepik.com",
            port: "",
            pathname: "**",
         }
        ]
      }
};

export default nextConfig;
