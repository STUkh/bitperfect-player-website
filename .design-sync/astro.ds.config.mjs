// A second Astro build for the Claude Design sync, identical to the site's own
// except that stylesheets are emitted as files instead of inlined per page, so
// the components' scoped <style> blocks can be collected in one place.
import base from '../astro.config.mjs';

export default {
  ...base,
  outDir: './.design-sync/.cache/astro-dist',
  build: { ...base.build, inlineStylesheets: 'never' },
};
