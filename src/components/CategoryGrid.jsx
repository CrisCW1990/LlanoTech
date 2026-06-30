import React from 'react';

const DEFAULT_CATEGORIES = [
  { id: 'cat-celulares', name: 'Accesorios para celulares', slug: 'celulares', icon: 'fas fa-mobile-alt' },
  { id: 'cat-audifonos', name: 'Audífonos', slug: 'audifonos', icon: 'fas fa-headphones' },
  { id: 'cat-cargadores', name: 'Cargadores y cables', slug: 'cargadores', icon: 'fas fa-plug' },
  { id: 'cat-smartwatch', name: 'Smartwatch', slug: 'smartwatch', icon: 'fas fa-stopwatch' },
  { id: 'cat-camaras', name: 'Cámaras de seguridad', slug: 'camaras', icon: 'fas fa-video' },
  { id: 'cat-pc', name: 'Accesorios para PC', slug: 'pc', icon: 'fas fa-desktop' },
  { id: 'cat-redes', name: 'Redes y conectividad', slug: 'redes', icon: 'fas fa-wifi' },
];

const getCategoryIcon = (slug, isSelected, fallbackIcon) => {
  const iconClass = `w-7 h-7 shrink-0 transition-colors ${isSelected ? 'text-brand-green' : 'text-brand-dark'}`;
  switch (slug) {
    case 'celulares':
    case 'cat-celulares':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
          <rect x="6" y="2" width="12" height="20" rx="2" />
          <line x1="6" y1="18" x2="18" y2="18" />
          <circle cx="12" cy="20" r="0.5" fill="currentColor" />
        </svg>
      );
    case 'audifonos':
    case 'cat-audifonos':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zm6 0c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 16v-5a6 6 0 0112 0v5" />
        </svg>
      );
    case 'cargadores':
    case 'cat-cargadores':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
          <rect x="8" y="6" width="8" height="10" rx="1.5" />
          <line x1="10" y1="2" x2="10" y2="6" />
          <line x1="14" y1="2" x2="14" y2="6" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v4c0 1 1 2 2 2" />
        </svg>
      );
    case 'smartwatch':
    case 'cat-smartwatch':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
          <rect x="7" y="7" width="10" height="10" rx="2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 7V3h6v4M9 17v4h6v-4" />
          <circle cx="12" cy="12" r="2.5" />
        </svg>
      );
    case 'camaras':
    case 'cat-camaras':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316A2.192 2.192 0 0014.502 4h-5.004c-.63 0-1.21.313-1.558.847l-.822 1.316z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 13.5a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    default:
      return <i className={`${fallbackIcon || 'fas fa-tag'} ${isSelected ? 'text-brand-green' : 'text-brand-dark'}`}></i>;
  }
};

export default function CategoryGrid({ categories = [], selectedCategory, onSelectCategory }) {
  const displayCats = categories.length > 0
    ? categories
    : DEFAULT_CATEGORIES;

  return (
    <section className="space-y-4">
      {/* Category Section Header */}
      <div className="flex items-center justify-between pb-2">
        <h3 className="text-base font-black text-brand-dark tracking-tight">
          CATEGORÍAS
        </h3>
        <button
          onClick={() => onSelectCategory(null)}
          className="text-xs font-bold text-[#8DDB00] hover:underline flex items-center gap-1"
        >
          <span>Ver todas</span>
          <i className="fas fa-chevron-right text-[8px]"></i>
        </button>
      </div>

      {/* Category Grid (Horizontal scroll of square cards on mobile and desktop) */}
      <div className="flex items-center overflow-x-auto no-scrollbar gap-2 py-2 px-1 scroll-smooth">
        {displayCats.map((cat) => {
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(isSelected ? null : cat.id)}
              className={`flex flex-col items-center justify-center w-[92px] h-[100px] md:w-32 md:h-28 p-2 rounded-2xl border text-center transition-all cursor-pointer shadow-sm hover:scale-[1.02] shrink-0 group ${
                isSelected
                  ? 'bg-brand-green/10 text-brand-dark border-brand-green ring-1 ring-brand-green/30 font-black'
                  : 'bg-white text-brand-dark border-gray-100 hover:border-gray-200 hover:text-brand-dark font-extrabold'
              }`}
            >
              {/* Icon */}
              <span className="mb-2 flex items-center justify-center">
                {getCategoryIcon(cat.slug, isSelected, cat.icon)}
              </span>
              {/* Category Name */}
              <span className="text-[0.45rem] md:text-xs tracking-tighter uppercase font-bold break-words leading-tight max-w-[84px] md:max-w-none text-brand-dark">
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
