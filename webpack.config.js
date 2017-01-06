var webpack = require('webpack');
var path = require('path');
var libraryName = 'k_inteface';
var outputFile = libraryName + '.js';
var QiniuPlugin = require('qiniu-plugin');
var package = require('./package.json');
var name = package.name;
var version = package.version;
var $ = require('lodash');

var glob = require("glob")
// options is optional
//console.log(path);
glob('/Users/maizhikun/Learning/apache_sites/K-Inteface/Lib/*', {}, function (err, files) {
   //console.log(files);
   //$.each(files, function(asset, fileName) {
   // console.log(asset.dirname);
   //   console.log(asset);
   //   console.log(fileName);
   //});
})

module.exports = {
  entry: {
        index: './Src/Inteface',
    },
    //devtool: "cheap-module-source-map",
  output: {
    path: 'Public',
    filename: 'index.bundle.js',
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    preLoaders: [
        {
            test: /\.js$/,
            loader: 'eslint-loader',
            include: __dirname+ '/Src',
        }
    ],
    loaders: [
      {
          test: /\.js$/,
          loader: 'babel',
          //exclude: __dirname + '/node_modules',
          //include: __dirname + '/Src',
      },
    ],
  },
  plugins: [
       new QiniuPlugin({

        // 七牛云的两对密匙 Access Key & Secret Key
        accessKey: '7SXiYZNWBQyXvS8eRg0PFNMlcRIxS9xQ2NaunjXn',

        secretKey: 'trgyS9ecNNBIogkKsOkipGQEe9TMYPNErSdDdKfO',
        otherFile: {
          glob: '/Users/maizhikun/Learning/apache_sites/K-Inteface/Lib/Utils.js',
          options: {},
        },
        // 七牛云存储空间名称
        bucket: 'publish',
        
        // 上传到七牛后保存的文件名
        path: name + '/' + version

      })
  ],
};
