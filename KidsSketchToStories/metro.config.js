const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
/**
 * Metro configuration
 * //https://github.com/facebook/react-native  //Manually removed - upgrade
 * https://reactnative.dev/docs/metro   //Manually added
 *
 * @type {import('metro-config').MetroConfig}   //Manually added
 * // @format //Manually removed - upgrade
 */
const config = {};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);