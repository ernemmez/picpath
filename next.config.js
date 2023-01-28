/** @type {import('next').NextConfig} */

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
};

module.exports = nextConfig;
