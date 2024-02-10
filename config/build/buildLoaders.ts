import webpack from 'webpack';
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types/types";
import RRT from 'react-refresh-typescript';
export function buildLoaders(options: BuildOptions): webpack.Configuration['module']['rules'] {
    const isProd = options.mode === 'production';
    const isDev = options.mode === 'development';

    const cssLoaderWithModules = {
        loader: 'css-loader',
        options: {
            modules: {
                localIdentName: isProd ? '[hash:base64:8]' : '[path][name]__[local]',
            },
        }
    }

    const styleLoader = {
        test: /\.css$/i,
        use: [
            isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            cssLoaderWithModules
        ],
    }

    const tsLoader = {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: [
            {
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                    getCustomTransformers: () => ({
                        before: [isDev && RRT()].filter(Boolean)
                    })
                }
            }
        ]

    }

    return [
        styleLoader,
        tsLoader,
    ]
}