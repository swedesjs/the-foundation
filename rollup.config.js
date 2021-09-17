import typescriptPlugin from 'rollup-plugin-typescript2';
import jsonPlugin from '@rollup/plugin-json';
import { builtinModules } from 'module';
import { join as pathJoin } from 'path';
import { tmpdir } from 'os';

const coreModules = builtinModules.filter(name => (
  !/(^_|\/)/.test(name)
));

const cacheRoot = pathJoin(tmpdir(), '.rpt2_cache');

export default async () => {
  const modulePkg = await import(pathJoin(__dirname, "package.json"));

  const src = pathJoin(__dirname, "src");
  const lib = pathJoin(__dirname, "lib");

  return {
    input: pathJoin(src, 'index.ts'),
    plugins: [
      jsonPlugin(),
      typescriptPlugin({
        cacheRoot,

        useTsconfigDeclarationDir: false,

        tsconfigOverride: {
          outDir: lib,
          rootDir: src,
          include: [src]
        }
      }),
      // https://rollupjs.org/guide/en/#renderdynamicimport
      {
        name: 'retain-import-expression',
        resolveDynamicImport(specifier) {
          if (specifier === 'node-fetch') return false;
          return null;
        },
        renderDynamicImport({ targetModuleId }) {
          if (targetModuleId === 'node-fetch') {
            return {
              left: 'import(',
              right: ')'
            };
          }

          return undefined;
        }
      }
    ],
    external: [
      ...Object.keys(modulePkg.dependencies || {}),
      ...Object.keys(modulePkg.peerDependencies || {}),
      ...coreModules
    ],
    output: [
      {
        file: pathJoin(lib, 'index.js'),
        format: 'cjs',
        exports: 'named'
      },
      {
        file: pathJoin(lib, 'index.mjs'),
        format: 'esm'
      }
    ]
  }
}
