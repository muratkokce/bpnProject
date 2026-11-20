const path = require('node:path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname);
const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer/react-native'),
  },
  resolver: {
    resolveRequest: (context, moduleName, platform) => {
      const aliasedModuleName = moduleName.startsWith('@/')
        ? path.join(__dirname, 'src', moduleName.slice(2))
        : moduleName;

      return context.resolveRequest(context, aliasedModuleName, platform);
    },
    assetExts: defaultConfig.resolver.assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'],
  },
};

module.exports = mergeConfig(defaultConfig, config);
