import React, { useState, useEffect } from 'react';

const DEFAULT_BANNERS = [
  {
    id: 'default-1',
    title: 'POTENCIA TU MUNDO DIGITAL',
    subtitle: 'Accesorios, dispositivos y soluciones tecnológicas para cada momento.',
    image_url: '',
    link_url: '#catalog'
  }
];

export default function HeroCarousel({ banners = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const heroBanners = banners.length > 0
    ? banners.filter(b => b.type === 'hero' || !b.type)
    : DEFAULT_BANNERS;

  useEffect(() => {
    if (heroBanners.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % heroBanners.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroBanners]);

  const handlePrev = () => {
    setActiveIndex(prev => (prev - 1 + heroBanners.length) % heroBanners.length);
  };

  const handleNext = () => {
    setActiveIndex(prev => (prev + 1) % heroBanners.length);
  };

  if (heroBanners.length === 0) return null;

  const currentBanner = heroBanners[activeIndex];
  const hasImage = !!currentBanner?.image_url;

  return (
    <div className="relative w-full">
      <section className="relative overflow-hidden rounded-3xl bg-brand-dark text-white min-h-[240px] sm:min-h-[280px] md:min-h-[380px] lg:min-h-[440px] flex items-center shadow-xl border border-gray-800">
        
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-green/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Slide Container */}
        <div className="w-full h-full flex flex-row items-center justify-between px-5 py-5 md:p-12 lg:p-16 relative z-10 gap-3">
          
          {/* Left: Text Content */}
          <div className={`${hasImage ? 'w-[55%]' : 'w-full max-w-2xl'} space-y-2 md:space-y-6 text-left`}>
            <h2 className="text-lg sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl font-black tracking-tight leading-tight select-none">
              {currentBanner.title.split(' ').map((word, idx) => 
                word.toLowerCase() === 'mundo' || word.toLowerCase() === 'digital' ? (
                  <span key={idx} className="text-brand-green block md:inline"> {word}</span>
                ) : (
                  <span key={idx}> {word}</span>
                )
              )}
            </h2>
            <p className="text-gray-300 text-[0.68rem] sm:text-xs md:text-sm leading-tight max-w-[180px] sm:max-w-none select-none">
              {currentBanner.subtitle}
            </p>
            <a
              href={currentBanner.link_url || '#catalog'}
              className="inline-flex items-center gap-1.5 bg-brand-green hover:bg-lime-600 text-brand-dark font-black px-4 py-2.5 rounded-full text-[0.68rem] md:text-xs transition-all hover:scale-105 shadow-lg shadow-brand-green/25"
            >
              <span className="md:hidden">VER PRODUCTOS</span>
              <span className="hidden md:inline">VER CATÁLOGO</span>
              <i className="fas fa-chevron-right text-[7px] ml-0.5"></i>
            </a>
          </div>

          {/* Right: Product Images */}
          {hasImage && (
            <div className="w-[45%] h-40 sm:h-44 md:h-72 lg:h-80 relative flex items-center justify-center select-none">
              {/* Overlay glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent md:hidden z-10"></div>
              <img
                src={currentBanner.image_url}
                alt="Destacados Llano Tech"
                className="w-full h-full object-contain object-right-bottom transition-all duration-700 transform scale-100 hover:scale-105"
              />
            </div>
          )}
        </div>

        {/* Navigation Arrows (Desktop Only) */}
        {heroBanners.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-gray-700 bg-brand-dark/45 hover:bg-brand-green hover:border-brand-green hover:text-brand-dark transition-all text-white flex items-center justify-center cursor-pointer z-20"
              aria-label="Anterior slide"
            >
              <i className="fas fa-chevron-left text-sm"></i>
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-gray-700 bg-brand-dark/45 hover:bg-brand-green hover:border-brand-green hover:text-brand-dark transition-all text-white flex items-center justify-center cursor-pointer z-20"
              aria-label="Siguiente slide"
            >
              <i className="fas fa-chevron-right text-sm"></i>
            </button>
          </>
        )}
      </section>

      {/* Navigation Dots (Outside on mobile, absolute inside on desktop) */}
      {heroBanners.length > 1 && (
        <div className="mt-4 md:mt-0 md:absolute md:bottom-4 md:left-1/2 md:-translate-x-1/2 flex justify-center gap-2 z-20">
          {heroBanners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === activeIndex ? 'bg-brand-green w-6' : 'bg-gray-400 md:bg-gray-600 hover:bg-gray-300 md:hover:bg-gray-400'
              }`}
              aria-label={`Ir al slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
