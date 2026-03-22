export function AnnouncementBar() {
  const messages = [
    '✨ Free shipping on orders over $75',
    '💄 New arrivals: Summer Glow Collection',
    '🌿 100% cruelty-free & vegan formulas',
    '⚡ Flash sale: 20% off all serums today',
  ];
  return (
    <div className="bg-brand-pink text-white py-2 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...messages, ...messages].map((msg, i) => (
          <span key={i} className="mx-8 text-sm font-medium tracking-wide">{msg}</span>
        ))}
      </div>
    </div>
  );
}
