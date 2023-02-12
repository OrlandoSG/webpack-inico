// poder mover a dist para produccion
const HtmlWebPackPlugin    = require('html-webpack-plugin'); 
// permite reducir el codigo
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// minimiza el css
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// copia imagenes a dist
const CopyPlugin = require('copy-webpack-plugin');

const {CleanWebpackPlugin} = require('clean-webpack-plugin');



module.exports = {
    // production, development
    mode: 'development',
    module: {
        rules: [

            // mueve los css
            {
                test: /\.css$/,
                exclude: /style\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            // reduce el css en una linea
            {
                test: /style\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            // mover los html
            {
                test: /\.html$/i,
                loader: "html-loader",
                options: {
                // Disables attributes processing
                sources: false,
                // minimizer: false
            },

            },
            // mueve los archivos de imagenes
            {
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
    // reduce el codigo de css
    optimization: {
        minimizer: [
          new CssMinimizerPlugin(),
        ],
      }, 
    //   mueve los html a tal ruta
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        // modifica 
        new MiniCssExtractPlugin({
            filename: '[name].css',
            ignoreOrder: false
        }),
        // copia las imagenes a tal ruta
        new CopyPlugin({
            patterns: [
                {from: 'src/assets', to: 'assets/'},
                
            ],
        }),
        new CleanWebpackPlugin(),
    ],

};
