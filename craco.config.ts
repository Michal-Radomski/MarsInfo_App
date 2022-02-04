// eslint-disable-next-line import/no-anonymous-default-export
export default {
  plugins: [
    {
      plugin: require("craco-cesium")(),
    },
  ],
  //* Below: to Framer-Motion work
  webpack: {
    configure: {
      module: {
        rules: [
          {
            type: "javascript/auto",
            test: /\.mjs$/,
            include: /node_modules/,
          },
        ],
      },
    },
  },
};

//* Original craco.config.js file
// module.exports = {
//   plugins: [
//     {
//       plugin: require("craco-cesium")(),
//     },
//   ],
// };
