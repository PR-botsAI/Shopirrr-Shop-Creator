import {json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, Link} from '@remix-run/react';
import {Hero} from '~/components/Hero';
import {ProductCard} from '~/components/ProductCard';
import {PRODUCT_CARD_FRAGMENT} from '~/lib/fragments';

export async function loader({context}: LoaderFunctionArgs) {
  const {storefront} = context;
  const {products} = await storefront.query(FEATURED_PRODUCTS_QUERY);
  const {collections} = await storefront.query(COLLECTIONS_QUERY);
  return json({products: products.nodes, collections: collections.nodes});
}

export default function Index() {
  const {products, collections} = useLoaderData<typeof loader>();
  return (
    <>
      <Hero />
      <section className="section-padding max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl sm:text-5xl font-bold gradient-text mb-4">Shop by Category</h2>
          <p className="text-brand-light/50 max-w-md mx-auto">Everything you need for your beauty ritual</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {collections.slice(0, 4).map((col: any) => (
            <Link key={col.id} to={`/collections/${col.handle}`} className="group relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-brand-pink/20 to-brand-violet/20 border border-white/10 card-hover flex items-end p-5">
              {col.image && <img src={col.image.url} alt={col.title} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-300" />}
              <div className="relative z-10"><span className="text-white font-display font-bold text-lg drop-shadow-lg">{col.title}</span></div>
            </Link>
          ))}
        </div>
      </section>
      <section className="section-padding max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold gradient-text mb-2">Featured</h2>
            <p className="text-brand-light/50">Curated picks you'll obsess over</p>
          </div>
          <Link to="/collections/all" className="btn-outline hidden sm:inline-flex text-sm">View All →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product: any) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>
      <section className="section-padding bg-brand-deep/50 border-y border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-display text-4xl font-bold gradient-text mb-12">Why Shopirrr?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {icon: '🌿', title: 'Clean Formulas', desc: 'Vegan, cruelty-free ingredients you can trust'},
              {icon: '💄', title: 'Bold Shades', desc: '100+ shades for every skin tone on the planet'},
              {icon: '⚡', title: 'Long Lasting', desc: '24hr wear that goes from day to night effortlessly'},
              {icon: '♻️', title: 'Eco Packaging', desc: 'Refillable, recyclable, and planet-conscious'},
            ].map(({icon, title, desc}) => (
              <div key={title} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-pink/30 transition-colors">
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="text-brand-light font-semibold mb-2">{title}</h3>
                <p className="text-brand-light/50 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section-padding max-w-2xl mx-auto text-center">
        <h2 className="font-display text-4xl font-bold gradient-text mb-4">Get 15% Off Your First Order</h2>
        <p className="text-brand-light/50 mb-8">Join our community of bold beauty lovers.</p>
        <form className="flex gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
          <input type="email" placeholder="your@email.com" className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/20 text-brand-light placeholder-brand-light/30 focus:outline-none focus:border-brand-pink text-sm" />
          <button type="submit" className="btn-primary whitespace-nowrap">Get 15% Off</button>
        </form>
      </section>
    </>
  );
}

const FEATURED_PRODUCTS_QUERY = `#graphql
  ${PRODUCT_CARD_FRAGMENT}
  query FeaturedProducts {
    products(first: 8, sortKey: BEST_SELLING) { nodes { ...ProductCard } }
  }
`;

const COLLECTIONS_QUERY = `#graphql
  query FeaturedCollections {
    collections(first: 4) { nodes { id title handle image { url altText } } }
  }
`;
