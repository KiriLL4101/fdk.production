import webpack from 'webpack'
import { BuildOptions } from './types/config'
import { buildBabelLoader } from './loaders/buildBabelLoader'
import { buildCssLoader } from './loaders/buildCssLoader'

export function buildRules(options: BuildOptions): webpack.RuleSetRule[] {
    const babelLoader = buildBabelLoader(options)

    const cssLoader = buildCssLoader(options.isDev)

    const typescriptLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
    }

    const svgLoader = {
        test: /\.svg$/i,
        use: ['@svgr/webpack']
    }

    const fileLoader = {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
            {
                loader: 'file-loader'
            }
        ]
    }

    return [fileLoader, svgLoader, babelLoader, typescriptLoader, cssLoader]
}
