import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // Re-render: একই component instance; আগের state থাকে।
  // Unmount করে নতুন mount: নতুন instance; local state আবার initialize হয়।
  // Cached বা preserved component: আগের state সংরক্ষিত থাকতে পারে, তাই ফিরে এলে পুরোনো UI দেখা যেতে পারে। true হওয়ায় profile page এর বাটন ক্লিক করে ফর্ম ওপেন করে অন্য page এ গিয়ে আবার profile এ ফিরে আসলে ফর্ম ওপেন দেখা যাচ্ছে। অর্থাৎ, navigation-এর পর আগের state preserve হচ্ছে।

  reactCompiler: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ichef.bbci.co.uk',
      },
    ],
  },
};

export default nextConfig;
