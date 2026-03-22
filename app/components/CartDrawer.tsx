import {useEffect} from 'react';

export function CartDrawer({isOpen, onClose}: {isOpen: boolean; onClose: () => void}) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);
  return (
    <>
      <div className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose} />
      <div className={`fixed right-0 top-0 h-full w-full max-w-md bg-brand-dark border-l border-white/10 z-50 transform transition-transform duration-300 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="font-display text-xl font-bold gradient-text">Your Bag</h2>
          <button onClick={onClose} className="text-brand-light/60 hover:text-brand-pink transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="px-6 py-4 bg-brand-deep/50">
          <div className="flex justify-between text-xs text-brand-light/60 mb-2">
            <span>Add <span className="text-brand-gold font-semibold">$75.00</span> more for free shipping</span>
          </div>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-brand-pink to-brand-violet rounded-full" style={{width: '0%'}} />
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-pink/20 to-brand-violet/20 flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-brand-pink/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
          </div>
          <h3 className="text-brand-light font-semibold mb-2">Your bag is empty</h3>
          <p className="text-brand-light/40 text-sm mb-6">Add some bold beauty to get started</p>
          <button onClick={onClose} className="btn-primary">Start Shopping</button>
        </div>
        <div className="p-6 border-t border-white/10">
          <div className="flex justify-between items-center mb-4">
            <span className="text-brand-light/60 text-sm">Subtotal</span>
            <span className="text-brand-light font-semibold">$0.00</span>
          </div>
          <button className="btn-primary w-full mb-3" disabled>Checkout — $0.00</button>
          <p className="text-center text-xs text-brand-light/30">Shipping & taxes calculated at checkout</p>
        </div>
      </div>
    </>
  );
}
