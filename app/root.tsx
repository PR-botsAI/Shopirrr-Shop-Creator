import {Links, Meta, Outlet, Scripts, ScrollRestoration, useRouteError, isRouteErrorResponse} from '@remix-run/react';
import {useNonce, Analytics} from '@shopify/hydrogen';
import type {LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {json} from '@shopify/remix-oxygen';
import appStyles from '~/styles/app.css?url';
import {Layout} from '~/components/Layout';

export function links() {
  return [
    {rel: 'stylesheet', href: appStyles},
    {rel: 'preconnect', href: 'https://fonts.googleapis.com'},
    {rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous'},
  ];
}

export async function loader({context}: LoaderFunctionArgs) {
  const {storefront, cart} = context;
  const {shop} = await storefront.query(`#graphql
    query Layout { shop { id name description primaryDomain { url } } }
  `);
  return json({ shop, cart: cart.get(), publicStoreDomain: context.env.PUBLIC_STORE_DOMAIN });
}

export default function App() {
  const nonce = useNonce();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta /><Links />
      </head>
      <body className="bg-brand-dark">
        <Analytics.Provider>
          <Layout><Outlet /></Layout>
        </Analytics.Provider>
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  return (
    <html lang="en">
      <head><title>Oops!</title><Meta /><Links /></head>
      <body className="bg-brand-dark text-brand-light flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-6xl font-display gradient-text mb-4">{isRouteErrorResponse(error) ? error.status : '500'}</h1>
          <p className="text-brand-light/60 mb-8">{isRouteErrorResponse(error) ? error.data : 'Something went wrong'}</p>
          <a href="/" className="btn-primary">Back to Home</a>
        </div>
      </body>
    </html>
  );
}
