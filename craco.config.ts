// eslint-disable-next-line import/no-anonymous-default-export
export default {
  plugins: [
    {
      plugin: require("craco-cesium")(),
    },
  ],
};

//* Original craco.config.js file
// module.exports = {
//   plugins: [
//     {
//       plugin: require("craco-cesium")(),
//     },
//   ],
// };
