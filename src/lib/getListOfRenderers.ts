import { fileURLToPath } from 'url';

const renderers: { name: string; import: any }[] = [];

/**
 * Get a list of available UI framework renderers for the project.
 * Supports Vue, React, Solid, Svelte, and Preact.
 * @returns An array of renderer names and their corresponding imports.
 */
export default async function getListOfRenderers() {
  if (renderers.length) {
    return renderers; // Return cached renderers
  }

  const dependencies = await getProjectDependencies();

  const hasVue = dependencies.includes('@astrojs/vue');
  const hasReact = dependencies.includes('@astrojs/react');
  const hasSolid = dependencies.includes('@astrojs/solid');
  const hasSvelte = dependencies.includes('@astrojs/svelte');
  const hasPreact = dependencies.includes('@astrojs/preact');

  if (hasVue) {
    renderers.push({
      name: '@astrojs/vue',
      /* @ts-ignore */
      import: (await import('@astrojs/vue/server.js')).default
    });
  }

  if (hasReact) {
    renderers.push({
      name: '@astrojs/react',
      /* @ts-ignore */
      import: (await import('@astrojs/react/server.js')).default
    });
  }

  if (hasSolid) {
    renderers.push({
      name: '@astrojs/solid',
      /* @ts-ignore */
      import: (await import('@astrojs/solid/server.js')).default
    });
  }

  if (hasSvelte) {
    renderers.push({
      name: '@astrojs/svelte',
      /* @ts-ignore */
      import: (await import('@astrojs/svelte/server.js')).default
    });
  }

  if (hasPreact) {
    renderers.push({
      name: '@astrojs/preact',
      /* @ts-ignore */
      import: (await import('@astrojs/preact/server.js')).default
    });
  }

  return renderers;
}

async function getProjectDependencies() {
  const packageJsonPath = fileURLToPath(
    new URL('../../../package.json', import.meta.url)
  );

  const packageJson = await import(/* @vite-ignore */ packageJsonPath); // TODO: Fix Vite warning

  return Object.keys(packageJson.dependencies || {});
}
