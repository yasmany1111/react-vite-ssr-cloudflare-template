import ReactDOMServer from 'react-dom/server';
import React from 'react';
import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr/server';
import { PageLayout } from './PageLayout';

export { render };
export { passToClient };

// See https://vite-plugin-ssr.com/data-fetching
const passToClient = ['pageProps'];

function render() {
  const pageHtml = ReactDOMServer.renderToString(
    <PageLayout>
      <div>Custom error message can be here</div>
    </PageLayout>
  );

  return escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <title>Page Title</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="my app">
        </head>
      <body>
        <div id="page-view">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`;
}
