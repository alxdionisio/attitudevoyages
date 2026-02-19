/**
 * Cloudflare Worker : proxy vers GitHub Pages (bymodule.github.io/attitudevoyages)
 * à utiliser quand le custom domain n'est pas vérifié sur GitHub (404).
 *
 * À déployer dans Workers & Pages → Create Worker → coller ce code,
 * puis attacher le Worker aux routes *www.attitude-voyages.fr/* et *attitude-voyages.fr/*
 */

const GITHUB_ORIGIN = 'https://bymodule.github.io/attitudevoyages';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname === '' || url.pathname === '/' ? '/' : url.pathname;
    const backendUrl = GITHUB_ORIGIN + path + url.search;

    const res = await fetch(backendUrl, {
      method: request.method,
      headers: request.headers,
      body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : undefined,
      redirect: 'manual',
    });

    const newHeaders = new Headers(res.headers);
    const loc = newHeaders.get('Location');
    if (loc && loc.startsWith('https://bymodule.github.io/')) {
      newHeaders.set('Location', loc.replace(GITHUB_ORIGIN, url.origin));
    }

    return new Response(res.body, {
      status: res.status,
      statusText: res.statusText,
      headers: newHeaders,
    });
  },
};
