import { R2Bucket } from '@cloudflare/workers-types';
import { respondWithApi } from './api';
import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

export interface Env {
  MY_BUCKET: R2Bucket;
}

declare const MY_BUCKET: any;

addEventListener('fetch' as any, (event: any) => {
  const url = new URL(event.request.url);
  const { pathname } = url;

  if (pathname.split('/')[1] === 'file') {
    event.respondWith(
      (() => {
        return respondWithApi(event.request, {
          MY_BUCKET,
        });
      })()
    );

    return;
  }

  try {
    event.respondWith(
      handleFetchEvent(event).catch((err) => {
        console.error(err.stack);
      })
    );
  } catch (err: any) {
    console.error(err.stack);
    event.respondWith(new Response('Internal Error', { status: 500 }));
  }
}) as any;

async function handleFetchEvent(event: any) {
  if (!isAssetUrl(event.request.url)) {
    const response = await handleSsr(event.request.url);
    if (response !== null) return response;
  }

  const response = await handleStaticAssets(event);
  return response;
}

function isAssetUrl(url: any) {
  const { pathname } = new URL(url);
  return pathname.startsWith('/assets/');
}

import { renderPage } from 'vite-plugin-ssr/server';

async function handleSsr(url: any) {
  const pageContextInit = {
    urlOriginal: url,
  };
  const pageContext = await renderPage(pageContextInit);
  const { httpResponse } = pageContext;
  if (!httpResponse) {
    return null;
  } else {
    const { body, statusCode, contentType } = httpResponse;
    return new Response(body, {
      headers: { 'content-type': contentType },
      status: statusCode,
    });
  }
}

const DEBUG = false;

async function handleStaticAssets(event: any) {
  let options: any = {};

  /**
   * You can add custom logic to how we fetch your assets
   * by configuring the function `mapRequestToAsset`
   */
  // options.mapRequestToAsset = handlePrefix(/^\/docs/)

  try {
    if (DEBUG) {
      // customize caching
      options.cacheControl = {
        bypassCache: true,
      };
    }

    const page = await getAssetFromKV(event, options);

    // allow headers to be altered
    const response = new Response(page.body, page);

    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('Referrer-Policy', 'unsafe-url');
    response.headers.set('Feature-Policy', 'none');

    return response;
  } catch (e: any) {
    // if an error is thrown try to serve the asset at 404.html
    if (!DEBUG) {
      try {
        let notFoundResponse = await getAssetFromKV(event, {
          mapRequestToAsset: (req) =>
            new Request(`${new URL(req.url).origin}/404.html`, req),
        });

        return new Response(notFoundResponse.body, {
          ...notFoundResponse,
          status: 404,
        });
      } catch (e: any) {}
    }

    return new Response(e.message || e.toString(), { status: 500 });
  }
}
