import webpack from 'webpack'
import path from 'path'
import { buildWebpackConfig } from './configs/build/buildWebpackConfig'
import { BuildEnv } from './configs/build/types/config'

export default (env: BuildEnv) => {
    const paths = {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        build: path.resolve(__dirname, 'bundle'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        src: path.resolve(__dirname, 'src')
    }

    const mode = env.mode || 'development'
    const POST = env.port || 3000
    const apiUrl = env.apiUrl || 'http://localhost:8000'

    const isDev = mode === 'development'

    const config: webpack.Configuration = buildWebpackConfig({
        mode,
        paths,
        isDev,
        port: POST,
        apiUrl
    })

    return config
}
