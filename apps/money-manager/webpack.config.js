const webpack = require('webpack');
const { merge } = require('webpack-merge');
const path = require('path');
const { hashElement } = require('folder-hash');
const MergeJsonWebpackPlugin = require('merge-jsons-webpack-plugin');

module.exports = async (config) => {
  const languagesHash = await hashElement(
    path.resolve(__dirname, './src/i18n'),
    {
      algo: 'md5',
      encoding: 'hex',
      files: { include: ['*.json'] },
    }
  );

  config.plugins.push(
    new MergeJsonWebpackPlugin({
      output: {
        groupBy: [
          {
            pattern: 'apps/money-manager/src/i18n/en/*.json',
            fileName: './i18n/en.json',
          },
          {
            pattern: 'apps/money-manager/src/i18n/hr/*.json',
            fileName: './i18n/hr.json',
          },
        ],
      },
    }),
    new webpack.DefinePlugin({
      I18N_HASH: JSON.stringify(languagesHash.hash),
    })
  );

  config = merge(config);

  return config;
};
