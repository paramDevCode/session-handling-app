const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;

module.exports = {
    output: {
      uniqueName: 'mainApp',
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'mainApp',
        remotes: {},
        shared: ['@angular/core', '@angular/common', '@angular/router'],
      }),
    ],
  };
