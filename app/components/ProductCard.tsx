import {Link} from '@remix-run/react';
import {Image, Money} from '@shopify/hydrogen';

interface Product {
  id: string; title: string; handle: string;
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  featuredImage?: { url: string; altText?: string; width?: number; height?: number };
  tags?: string[];
}

export function ProductCard({product}: {product: Product}) {
  const isNew = product.tags?.includes('new');
  const isBestSeller = product.tags?.includes('best-seller');
  return (
    <Link to={`/products/${product.handle}`} className="group block">
      <div className="card-hover rounded-2xl overflow-hidden bg-white/5 border border-white/10">
        <div className="relative aspect-[3/4] overflow-hidden bg-brand-deep">
          {product.featuredImage ? (
            <Image data={product.featuredImage} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" sizes="(min-width: 768px) 33vw, 50vw" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-pink to-brand-violet opacity-30" />
            </div>
          )}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {isNew && <span className="badge">NEW</span>}
            {isBestSeller && <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-brand-gold/20 text-brand-gold border border-brand-gold/30">⭐ BEST SELLER</span>}
          </div>
          <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button className="btn-primary w-full text-xs py-2.5" onClick={(e) => e.preventDefault()}>Quick Add</button>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-brand-light font-medium text-sm mb-1 truncate group-hover:text-brand-pink transition-colors">{product.title}</h3>
          <Money data={product.priceRange.minVariantPrice} className="text-brand-pink font-semibold text-sm" />
        </div>
      </div>
    </Link>
  );
}
