const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
/**
 * Metro configuration
 * //https://github.com/facebook/react-native  //Manually removed - upgrade
 * https://reactnative.dev/docs/metro   //Manually added
 *
 * @type {import('metro-config').MetroConfig}   //Manually added
 * // @format //Manually removed - upgrade
 */
const config = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    sourceExts: ['js', 'jsx', 'ts', 'tsx', 'cjs', 'json'],
    assetExts: ['png', 'jpg', 'jpeg', 'gif', 'webp'],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
