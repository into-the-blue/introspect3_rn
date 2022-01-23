module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    '@babel/preset-typescript',
  ],
  plugins: [
    // ['@babel/plugin-proposal-decorators', {legacy: true}],
    [
      'babel-plugin-root-import',
      {
        rootPathSuffix: './src',
        rootPathPrefix: '@/',
      },
    ],
    // ['@babel/plugin-proposal-class-properties', {loose: false}],
  ],
  // // Babel >= 7.13.0 (https://babeljs.io/docs/en/assumptions)
  // assumptions: {
  //   setPublicClassFields: false,
  // },
};
