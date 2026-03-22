import {Link, useLocation} from '@remix-run/react';
import {AnnouncementBar} from './AnnouncementBar';
import {CartDrawer} from './CartDrawer';
import {useState} from 'react';

export function Layout({children}: {children: React.ReactNode}) {
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navLinks = [
    {label: 'Shop All', href: '/collections/all'},
    {label: 'Skincare', href: '/collections/skincare'},
    {label: 'Makeup', href: '/collections/makeup'},
    {label: 'Wellness', href: '/collections/wellness'},
    {label: 'Best Sellers', href: '/collections/best-sellers'},
  ];
  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <header className="sticky top-0 z-50 bg-brand-dark/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-pink to-brand-violet flex items-center justify-center text-white font-bold text-sm">S</div>
              <span className="font-display text-xl font-bold gradient-text">Shopirrr</span>
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link key={link.href} to={link.href} className={`text-sm font-medium transition-colors hover:text-brand-pink ${location.pathname === link.href ? 'text-brand-pink' : 'text-brand-light/70'}`}>{link.label}</Link>
              ))}
            </nav>
            <div className="flex items-center gap-4">
              <Link to="/search" className="text-brand-light/70 hover:text-brand-pink transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </Link>
              <button onClick={() => setCartOpen(true)} className="relative text-brand-light/70 hover:text-brand-pink transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-brand-pink text-white text-xs rounded-full flex items-center justify-center font-bold">0</span>
              </button>
              <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-brand-light/70 hover:text-brand-pink">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} /></svg>
              </button>
            </div>
          </div>
          {menuOpen && (
            <nav className="md:hidden py-4 border-t border-white/10 animate-fade-in">
              {navLinks.map((link) => (
                <Link key={link.href} to={link.href} onClick={() => setMenuOpen(false)} className="block py-3 text-sm font-medium text-brand-light/70 hover:text-brand-pink transition-colors">{link.label}</Link>
              ))}
            </nav>
          )}
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="bg-brand-deep border-t border-white/10 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-pink to-brand-violet flex items-center justify-center text-white font-bold text-sm">S</div>
                <span className="font-display text-xl font-bold gradient-text">Shopirrr</span>
              </div>
              <p className="text-brand-light/50 text-sm leading-relaxed max-w-xs">Bold beauty for bold people. Cruelty-free, vegan formulas crafted for every skin tone.</p>
            </div>
            <div>
              <h4 className="text-brand-light font-semibold text-sm mb-4 uppercase tracking-wider">Shop</h4>
              <ul className="space-y-2">
                {['Skincare','Makeup','Wellness','Gift Sets','Sale'].map((item) => (
                  <li key={item}><Link to={`/collections/${item.toLowerCase().replace(' ','-')}`} className="text-brand-light/50 hover:text-brand-pink text-sm transition-colors">{item}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-brand-light font-semibold text-sm mb-4 uppercase tracking-wider">Help</h4>
              <ul className="space-y-2">
                {['About Us','Shipping','Returns','Contact','FAQ'].map((item) => (
                  <li key={item}><Link to={`/pages/${item.toLowerCase().replace(' ','-')}`} className="text-brand-light/50 hover:text-brand-pink text-sm transition-colors">{item}</Link></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-brand-light/30 text-xs">© 2026 Shopirrr. All rights reserved.</p>
            <p className="text-brand-light/30 text-xs">Powered by Shopify Hydrogen + Oxygen</p>
          </div>
        </div>
      </footer>
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}
