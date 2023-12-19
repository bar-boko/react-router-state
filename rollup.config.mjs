import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import nodeResolve from "@rollup/plugin-node-resolve";
import tsConfigPaths from 'rollup-plugin-tsconfig-paths';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import terser from '@rollup/plugin-terser';

import packageJson from './package.json' assert { type: 'json' };
import commonjs from "@rollup/plugin-commonjs";
import {dts} from "rollup-plugin-dts";
import {vanillaExtractPlugin} from "@vanilla-extract/rollup-plugin";

const isProduction = process.env.NODE_ENV === 'production';

export default ([
    {
        input: 'src/index.ts',
        output: [
            {
                file: packageJson.main,
                format: 'cjs',
                sourcemap: true,
            },
            {
                file: packageJson.module,
                format: 'esm',
                sourcemap: true,
            },
        ],
        external: [
            ...Object.keys(packageJson.peerDependencies || {}),
            ...Object.keys(packageJson.dependencies || {}),
        ],
        plugins: [
            peerDepsExternal(),
            tsConfigPaths(),
            vanillaExtractPlugin(),
            nodeResolve({
                browser: true,
            }),
            commonjs(),
            typescript(),
            postcss({
                extensions: ['.css'],
            }),
            isProduction && terser(),
        ],
    },
    {
        input: 'lib/types/index.d.ts',
        output: { file: packageJson.types, format: 'ejs' },
        plugins: [
            dts(),
        ],
    },
]);
