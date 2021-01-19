import { resolve } from 'path';
import { Configuration } from 'webpack';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin'
const webpack = require('webpack');

const config: Configuration = {
    entry: './src/main.ts' ,
    output: {
        filename: '[name].js',
        libraryTarget: 'commonjs2',
        path: resolve(__dirname, 'dist/bin'),
    },
    module: {
        rules: [{ test: /\.ts$/, loader: 'ts-loader' }],
    },
    // this hides noisy warnings, optional
    stats: {
        warningsFilter: [
            'node_modules/express/lib/view.js',
            'node_modules/@nestjs/common/utils/load-package.util.js',
            'node_modules/@nestjs/core/helpers/load-adapter.js',
            'node_modules/@nestjs/core/helpers/optional-require.js'
        ]
    },
    resolve: {
        extensions: ['.js', '.ts'],
        plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.build.json' })]
    },
    target: 'node',
    mode: process.env.NODE_ENV === 'dev' ? 'development' : 'production',
    plugins: [
        new webpack.IgnorePlugin({
            // workaround to the problem with nest's idea of lazy require() calls
            // refer to: https://github.com/nestjs/nest/issues/1706
            checkResource(resource: any) {
                const lazyImports = [
                    '@nestjs/microservices',
                    '@nestjs/microservices/microservices-module',
                    '@nestjs/websockets/socket-module',
                    'cache-manager',
                    'class-validator',
                    'class-transformer'
                ];
                if (!lazyImports.includes(resource)) {
                    return false;
                }
                try {
                    resolve(resource);
                } catch (err) {
                    return false;
                }
                return true;
            }
        })
    ]
};

export default config;
