import {json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {getPaginationVariables, Pagination} from '@shopify/hydrogen';
import {ProductCard} from '~/components/ProductCard';
import {PRODUCT_CARD_FRAGMENT} from '~/lib/fragments';

export async function loader({params, request, context}: LoaderFunctionArgs) {
  const {handle} = params;
  const {storefront} = context;
  const paginationVariables = getPaginationVariables(request, {pageBy: 12});
  const {collection} = await storefront.query(COLLECTION_QUERY, {variables: {handle, ...paginationVariables}});
  if (!collection) throw new Response('Collection not found', {status: 404});
  return json({collection});
}

export default function CollectionPage() {
  const {collection} = useLoaderData<typeof loader>();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        {collection.image && (
          <div className="relative h-64 rounded-3xl overflow-hidden mb-8 border border-white/10">
            <img src={collection.image.url} alt={collection.title} className="w-full h-full object-cover opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center"><h1 className="font-display text-5xl font-bold gradient-text">{collection.title}</h1></div>
          </div>
        )}
        {!collection.image && <h1 className="font-display text-5xl font-bold gradient-text mb-4">{collection.title}</h1>}
        {collection.description && <p className="text-brand-light/50 max-w-lg mx-auto">{collection.description}</p>}
      </div>
      <Pagination connection={collection.products}>
        {({nodes, PreviousLink, NextLink}) => (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {nodes.map((product: any) => <ProductCard key={product.id} product={product} />)}
            </div>
            <div className="flex justify-center gap-4 mt-12">
              <PreviousLink><button className="btn-outline">← Previous</button></PreviousLink>
              <NextLink><button className="btn-primary">Load More →</button></NextLink>
            </div>
          </>
        )}
      </Pagination>
    </div>
  );
}

const COLLECTION_QUERY = `#graphql
  ${PRODUCT_CARD_FRAGMENT}
  query Collection($handle: String!, $first: Int, $last: Int, $startCursor: String, $endCursor: String) {
    collection(handle: $handle) {
      id title description handle
      image { url altText }
      products(first: $first, last: $last, before: $startCursor, after: $endCursor) {
        nodes { ...ProductCard }
        pageInfo { hasPreviousPage hasNextPage startCursor endCursor }
      }
    }
  }
`;
