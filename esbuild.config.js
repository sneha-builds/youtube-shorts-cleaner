const esbuild = require('esbuild');

const isWatch = process.argv.includes('--watch');

const buildOptions = {
  entryPoints: ['src/historyScraper.ts', 'src/popup.ts'],
  bundle: true,
  outdir: 'src',
  format: 'iife',
  platform: 'browser',
  target: 'es2020',
  minify: !isWatch,
  sourcemap: isWatch,
};

async function build() {
  try {
    if (isWatch) {
      const ctx = await esbuild.context(buildOptions);
      await ctx.watch();
      console.log('Watching for changes...');
    } else {
      await esbuild.build(buildOptions);
      console.log('Build complete!');
    }
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

build();