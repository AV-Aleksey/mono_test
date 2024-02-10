import webpack from "webpack";
import path from "path";

import type { Configuration as DevServerConfig } from 'webpack-dev-server'
import {buildDevServer} from "./buildDevServer";
import {buildLoaders} from "./buildLoaders";
import {buildPlugins} from "./buildPlugins";
import {buildResolvers} from "./buildResolvers";
import {BuildOptions} from "./types/types";

export function buildWebpack(options: BuildOptions): webpack.Configuration {
    const isDev = options.mode === 'development';

    return {
        mode: options.mode,
        entry: {
            index: options.paths.entry,
        },
        output: {
            path: options.paths.output,
            filename: '[name].[contenthash].js',
            clean: true,
        },
        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders(options),
        },
        resolve: buildResolvers(options),
        devtool: isDev ? 'inline-source-map' : false,
        devServer: buildDevServer(options),
    }
}