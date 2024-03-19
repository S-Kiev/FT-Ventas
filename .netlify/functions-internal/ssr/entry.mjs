import { renderers } from './renderers.mjs';
import { manifest } from './manifest_Czta0eIK.mjs';
import * as serverEntrypointModule from '@astrojs/netlify/ssr-function.js';
import { onRequest } from './_noop-middleware.mjs';

const _page0 = () => import('./chunks/generic_0aTnr2aM.mjs');
const _page1 = () => import('./chunks/carrito_D3xFRLwD.mjs');
const _page2 = () => import('./chunks/_id__p83J2fjG.mjs');
const _page3 = () => import('./chunks/index_Df-2CR4V.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/carrito.astro", _page1],
    ["src/pages/producto/[id].astro", _page2],
    ["src/pages/index.astro", _page3]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    renderers,
    middleware: onRequest
});
const _args = {
    "middlewareSecret": "6c28b8d0-2c68-4980-ad8b-a9f772d4cba2"
};
const _exports = serverEntrypointModule.createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
