declare const MY_BUCKET: any;

export const respondWithApi = async (request: any, env: any) => {
  const url = new URL(request.url);
  const { pathname, search } = url;

  const params = new URLSearchParams(search.substring(search.indexOf('?')));
  const auth = params.get('auth');

  if (auth !== 'SIMPLE_API_KEY') {
    return new Response(
      JSON.stringify({
        error: true,
        message: 'Missing or invalid auth token',
        debug: {
          pathname,
          search,
        },
      })
    );
  }

  switch (pathname.split('/')[1]) {
    case 'file':
      return serveFileFromR2(
        pathname.substring(pathname.substring(1).indexOf('/') + 2),
        request,
        env
      );
    default:
      return new Response(
        JSON.stringify({
          error: true,
          message: 'Method not found',
        })
      );
      break;
  }
};

const serveFileFromR2 = async (key: any, request: any, env: any) => {
  switch (request.method) {
    case 'GET':
      const object = await env.MY_BUCKET.get(key);

      if (object === null) {
        return new Response('Object Not Found', { status: 404 });
      }

      const headers = new Headers();
      object.writeHttpMetadata(headers);
      headers.set('etag', object.httpEtag);

      return new Response(object.body, {
        headers,
      });
    default:
      return new Response('Method Not Allowed', {
        status: 405,
        headers: {
          Allow: 'PUT, GET, DELETE',
        },
      });
  }
};
