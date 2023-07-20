/* eslint-disable linebreak-style */
/* eslint-disable no-param-reassign */

import type { StorybookConfig } from '@storybook/react-webpack5'
import { Configuration, DefinePlugin, RuleSetRule } from 'webpack'
import path from 'path'

import { buildCssLoader } from '../build/loaders/buildCssLoader'
import { BuildPath } from '../build/types/config'

const pathToInlineSvg = path.resolve(__dirname, '../../src/shared/assets/icons')

export default {
    stories: ['../../src/**/*.mdx', '../../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
    ],
    framework: {
        name: '@storybook/react-webpack5',
        options: {},
    },
    docs: {
        autodocs: 'tag',
    },
    core: {
        builder: '@storybook/builder-webpack5',
    },
    features: {
        storyStoreV7: false,
    },
    async webpack(config: Configuration) {
        const paths: BuildPath = {
            build: '',
            html: '',
            entry: '',
            src: path.resolve(__dirname, '..', '..', 'src', '.'),
        }

        config.resolve?.modules?.push('./../../src')
        config.resolve?.extensions?.push('.ts', '.tsx')

        if (config.module?.rules) {
            config.module.rules = config.module?.rules?.map((rule: RuleSetRule | '...') => {
                if (rule !== '...' && /svg/.test(rule.test as string)) {
                    return { ...rule, exclude: /\.svg$/i }
                }
                return rule
            })
        }

        config.module?.rules?.push({
            test: /\.svg$/,
            include: pathToInlineSvg,
            use: [
                {
                    loader: '@svgr/webpack',
                    options: {
                        icon: true,
                    },
                },
            ],
        })

        config.module?.rules?.push(buildCssLoader(true))

        config.plugins?.push(
            new DefinePlugin({
                __IS_DEV__: JSON.stringify(true),
                __API__: JSON.stringify(''),
                __PROJECT__: JSON.stringify('storybook'),
            })
        )

        return config
    },
} satisfies StorybookConfig
