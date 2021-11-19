module.exports = function (api) {
  api.cache(true);
  const moduleResolver = [
    'module-resolver',
    {
      root: ['./src'],
      alias: {
        '@app': './src/app',
        '@domains': './src/domains',
        '@assets': './src/app/assets',
        '@components': './src/app/components',
        '@hooks': './src/app/hooks',
        '@navigation': './src/app/navigation',
        '@context': './src/app/context',
      },
      extensions: [
        '.js',
        '.jsx',
        '.ts',
        '.tsx',
        '.android.js',
        '.android.tsx',
        '.ios.js',
        '.ios.tsx',
      ],
    },
  ];
  if (
    process.env.NODE_ENV === 'production' ||
    process.env.BABEL_ENV === 'production'
  ) {
    return {
      presets: ['module:metro-react-native-babel-preset'],
      plugins: [
        moduleResolver,
        ['transform-remove-console', {exclude: ['error', 'info']}],
      ],
    };
  } else {
    return {
      presets: ['module:metro-react-native-babel-preset'],
      plugins: [moduleResolver],
    };
  }
};
