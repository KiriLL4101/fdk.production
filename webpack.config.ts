import webpack from 'webpack'
import path from 'path'
import { buildWebpackConfig } from './configs/build/buildWebpackConfig'
import { BuildEnv } from './configs/build/types/config'

export default (env: BuildEnv) => {
    const paths = {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        build: path.resolve(__dirname, 'bundle'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        src: path.resolve(__dirname, 'src'),
        locales: path.resolve(__dirname, 'public', 'locales'),
        buildLocales: path.resolve(__dirname, 'bundle', 'locales'),
    }

    const mode = env.mode || 'development'
    const PORT = env.port || 3000
    const apiUrl = env.apiUrl || 'http://localhost:8000'

    const isDev = mode === 'development'

    const config: webpack.Configuration = buildWebpackConfig({
        mode,
        paths,
        isDev,
        port: PORT,
        apiUrl,
        project: 'frontend',
    })

    return config
}
