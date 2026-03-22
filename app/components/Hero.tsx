import {Link} from '@remix-run/react';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{background: 'linear-gradient(135deg, #0A0A0A 0%, #1A0030 50%, #0A0A0A 100%)'}}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-pink/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-violet/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl" />
      </div>
      <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '50px 50px'}} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in">
        <span className="badge mb-6 inline-flex">✨ New Collection Dropping Soon</span>
        <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold leading-tight mb-6">
          <span className="text-brand-light">Beauty That</span><br />
          <span className="gradient-text">Makes A Statement</span>
        </h1>
        <p className="text-brand-light/60 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Bold formulas. Vibrant shades. 100% cruelty-free. Built for every skin, every tone, every vibe.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/collections/all" className="btn-primary text-base px-10 py-4">Shop the Collection</Link>
          <Link to="/collections/best-sellers" className="btn-outline text-base px-10 py-4">Best Sellers</Link>
        </div>
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 text-brand-light/40 text-sm">
          <div className="flex items-center gap-2"><span className="text-brand-gold text-lg">★★★★★</span><span>50,000+ reviews</span></div>
          <div>🌿 Vegan & Cruelty-Free</div>
          <div>🚚 Free shipping over $75</div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5">
          <div className="w-1.5 h-3 bg-brand-pink rounded-full" />
        </div>
      </div>
    </section>
  );
}
