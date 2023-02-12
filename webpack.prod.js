// poder mover a dist para produccion
const HtmlWebPackPlugin    = require('html-webpack-plugin'); 
// permite reducir el codigo
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// minimiza el css
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// minimiza el js en una linea
const TerserPlugin = require('terser-webpack-plugin');
// copia imagenes a dist
const CopyPlugin = require('copy-webpack-plugin');

const {CleanWebpackPlugin} = require('clean-webpack-plugin');


module.exports = {
    // production, development
    mode: 'production',
    output:{
        // permite darle un nombre unico al js
        filename: 'main.[hash].js'
    },
    module: {
        rules: [
            {
                // habilitamos el babel + .babelrc
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: [
                      ['@babel/preset-env', { targets: "defaults" }]
                    ],
                    plugins: ['@babel/plugin-proposal-class-properties']
                  }
                }
              },


            {
                // mueve los css
                test: /\.css$/,
                exclude: /style\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },


            
            {
                // reduce el css en una linea
                test: /style\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },


            {
                // mover los html
                test: /\.html$/i,
                loader: "html-loader",
                options: {
                // Disables attributes processing
                sources: false,
                // minimizer: false
            },

            },
            {
                // mueve los archivos de imagenes
                test: /\.(png|svg|jpg|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false
                        }
                    }
                ]
            }
        ]
    },
    // minimiza el css
    optimization: {
        minimizer: [
          new CssMinimizerPlugin(),
        ],
      },
    //   mover el html
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        // cambia el nombre por uno unico del css
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            ignoreOrder: false
        }),
        // copia las imagenes a la ruta que le des
        new CopyPlugin({
            patterns: [
                {from: 'src/assets', to: 'assets/'},
                
            ],
        }),
        // minimiza el js
        new TerserPlugin(),
        // elimina la carpeta de dist
        new CleanWebpackPlugin(),
    ],

};
