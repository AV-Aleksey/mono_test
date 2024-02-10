import webpack, { DefinePlugin } from 'webpack';
import htmlWebpack from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types/types";
import {BundleAnalyzerPlugin} from "webpack-bundle-analyzer";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import RRWP from '@pmmmwh/react-refresh-webpack-plugin';

export function buildPlugins(options: BuildOptions): webpack.Configuration['plugins'] {
    const isProd = options.mode === 'production';
    const isDev = options.mode === 'development';

    const plugins: webpack.Configuration['plugins'] = [
        new htmlWebpack({ template: options.paths.html }),
        new DefinePlugin({
            __PLATFORM__: JSON.stringify(options.platform)
        })
    ];

    if (isProd) {
        plugins.push(new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css'
        }))

        plugins.push(new BundleAnalyzerPlugin({
            openAnalyzer: options.analyzer
        }))
    }

    if (isDev) {
        plugins.push(new ForkTsCheckerWebpackPlugin())
        plugins.push(new RRWP())
    }

    return plugins;
}