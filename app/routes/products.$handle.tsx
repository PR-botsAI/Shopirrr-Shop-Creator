import {json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {Image, Money, VariantSelector, getSelectedProductOptions} from '@shopify/hydrogen';
import {useState} from 'react';

export async function loader({params, request, context}: LoaderFunctionArgs) {
  const {handle} = params;
  const {storefront} = context;
  const selectedOptions = getSelectedProductOptions(request);
  const {product} = await storefront.query(PRODUCT_QUERY, {variables: {handle, selectedOptions}});
  if (!product?.id) throw new Response('Product not found', {status: 404});
  return json({product});
}

export default function ProductPage() {
  const {product} = useLoaderData<typeof loader>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const images = product.images?.nodes || (product.featuredImage ? [product.featuredImage] : []);
  const selectedVariant = product.selectedOrFirstAvailableVariant;
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        <div className="space-y-4">
          <div className="aspect-square rounded-3xl overflow-hidden bg-brand-deep border border-white/10">
            {images[selectedImage] ? <Image data={images[selectedImage]} className="w-full h-full object-cover" sizes="(min-width: 1024px) 50vw, 100vw" /> : <div className="w-full h-full flex items-center justify-center"><div className="w-32 h-32 rounded-full bg-gradient-to-br from-brand-pink to-brand-violet opacity-30" /></div>}
          </div>
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((img: any, i: number) => (
                <button key={i} onClick={() => setSelectedImage(i)} className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${selectedImage === i ? 'border-brand-pink' : 'border-white/10 hover:border-white/30'}`}>
                  <Image data={img} className="w-full h-full object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div>
          <div className="flex flex-wrap gap-2 mb-4">{product.tags?.slice(0,3).map((tag: string) => <span key={tag} className="badge">{tag}</span>)}</div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-brand-light mb-3">{product.title}</h1>
          <div className="flex items-center gap-3 mb-6">
            <Money data={selectedVariant?.price || product.priceRange.minVariantPrice} className="text-2xl font-bold text-brand-pink" />
            {selectedVariant?.compareAtPrice && <Money data={selectedVariant.compareAtPrice} className="text-brand-light/30 line-through text-lg" />}
          </div>
          <div className="flex items-center gap-2 mb-6"><div className="flex text-brand-gold text-lg">★★★★★</div><span className="text-brand-light/40 text-sm">(4.9 · 2,847 reviews)</span></div>
          <p className="text-brand-light/60 leading-relaxed mb-8">{product.description}</p>
          <VariantSelector handle={product.handle} options={product.options} variants={product.variants}>
            {({option}) => (
              <div key={option.name} className="mb-6">
                <label className="text-brand-light font-semibold text-sm uppercase tracking-wider mb-3 block">{option.name}</label>
                <div className="flex flex-wrap gap-2">
                  {option.values.map(({value, isAvailable, isActive, to}: any) => (
                    <a key={value} href={to} className={`px-4 py-2 rounded-full text-sm border transition-all ${isActive ? 'border-brand-pink bg-brand-pink/20 text-brand-pink' : isAvailable ? 'border-white/20 text-brand-light/70 hover:border-brand-pink/50' : 'border-white/10 text-brand-light/20 cursor-not-allowed line-through'}`}>{value}</a>
                  ))}
                </div>
              </div>
            )}
          </VariantSelector>
          <div className="flex gap-4 mb-8">
            <div className="flex items-center border border-white/20 rounded-full overflow-hidden">
              <button onClick={() => setQuantity(Math.max(1, quantity-1))} className="w-10 h-12 flex items-center justify-center text-brand-light/60 hover:text-brand-pink">−</button>
              <span className="w-10 text-center text-brand-light font-medium">{quantity}</span>
              <button onClick={() => setQuantity(quantity+1)} className="w-10 h-12 flex items-center justify-center text-brand-light/60 hover:text-brand-pink">+</button>
            </div>
            <button className="btn-primary flex-1">{selectedVariant?.availableForSale ? 'Add to Bag' : 'Sold Out'}</button>
          </div>
          <div className="grid grid-cols-3 gap-3 pt-6 border-t border-white/10">
            {[{icon:'🌿',text:'Vegan'},{icon:'🐰',text:'Cruelty-Free'},{icon:'♻️',text:'Eco Packaging'}].map(({icon,text}) => (
              <div key={text} className="text-center p-3 rounded-xl bg-white/5 border border-white/10"><div className="text-xl mb-1">{icon}</div><div className="text-brand-light/50 text-xs">{text}</div></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const PRODUCT_QUERY = `#graphql
  query Product($handle: String!, $selectedOptions: [SelectedOptionInput!]!) {
    product(handle: $handle) {
      id title description handle tags
      options { name values }
      images(first: 8) { nodes { id url altText width height } }
      featuredImage { id url altText width height }
      priceRange { minVariantPrice { amount currencyCode } }
      selectedOrFirstAvailableVariant(selectedOptions: $selectedOptions) {
        id availableForSale
        price { amount currencyCode }
        compareAtPrice { amount currencyCode }
        selectedOptions { name value }
      }
      variants(first: 250) { nodes { id availableForSale price { amount currencyCode } selectedOptions { name value } } }
    }
  }
`;
