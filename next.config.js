/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  /*
  env: {
    customKey: "my-value",
  },
  basePath: '/docs', // ana dizin her zaman bu olur örn html çıktısı : src={"/about"} --> src="docs/about"
  */
  async redirects() {
    return [
      {
        source: "/auth/signin",
        destination: "/auth",
        permanent: true,
      },
    ];
  },

  webpack(config, { defaultLoaders }) {
    const resolvedBaseUrl = path.resolve(config.context, "../../");

    config.module.rules = [
      ...config.module.rules,
      {
        test: /\.(tsx|ts|js|mjs|jsx)$/,
        include: [resolvedBaseUrl],
        use: defaultLoaders.babel,
        exclude: (excludePath) => {
          return /node_modules/.test(excludePath);
        },
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
    ];

    return config;
  },
};

module.exports = nextConfig;
