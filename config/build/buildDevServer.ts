import type { Configuration as DevServerConfig } from 'webpack-dev-server'
import {BuildOptions} from "./types/types";

export function buildDevServer(options: BuildOptions): DevServerConfig {
    return {
        open: true,
        port: options.port,
        historyApiFallback: true,
    }
}