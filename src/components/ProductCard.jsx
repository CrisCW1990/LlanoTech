import React from 'react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from './Header';

export default function ProductCard({ product, onOpenModal }) {
  const { addToCart } = useCart();

  const handleAddClick = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const hasDiscount = product.old_price && product.old_price > product.price;
  const firstImage = product.images && product.images.length > 0
    ? product.images[0]
    : '';

  // Badge Text determination
  let badgeText = product.tag;
  if (!badgeText && hasDiscount) {
    const pct = Math.round(((product.old_price - product.price) / product.old_price) * 100);
    badgeText = `${pct}% OFF`;
  }

  return (
    <div
      onClick={() => onOpenModal(product)}
      className="bg-white rounded-3xl border border-gray-100 p-4 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between cursor-pointer relative"
    >
      
      {/* Badge (Nuevo / Descuento) */}
      {badgeText && (
        <span className="absolute top-3 right-3 bg-brand-green text-brand-dark text-[0.55rem] font-bold px-2 py-0.5 rounded-full select-none tracking-tight uppercase z-10 shadow-sm">
          {badgeText}
        </span>
      )}

      {/* Product Image */}
      <div className="w-full h-32 md:h-44 flex items-center justify-center mb-3 overflow-hidden bg-gray-50 rounded-2xl">
        {firstImage ? (
          <img
            src={firstImage}
            alt={product.name}
            className="max-h-full max-w-full object-contain transform group-hover:scale-105 transition-transform duration-300 select-none"
          />
        ) : (
          <i className="fas fa-box text-gray-300 text-3xl md:text-5xl group-hover:scale-105 transition-transform duration-300"></i>
        )}
      </div>

      {/* Product Name & SKU */}
      <div className="text-left space-y-1">
        <h4 className="text-xs md:text-sm font-extrabold text-brand-dark group-hover:text-brand-green transition-colors leading-snug line-clamp-2">
          {product.name}
        </h4>
      </div>

      {/* Price & Add to Cart Button */}
      <div className="flex items-center justify-between mt-3">
        <div className="text-left leading-none flex flex-wrap items-baseline gap-1.5">
          <span className="text-xs md:text-base font-black text-brand-dark">
            ${formatCurrency(product.price)}
          </span>
          {hasDiscount && (
            <span className="text-[0.65rem] md:text-xs text-gray-400 line-through font-medium">
              ${formatCurrency(product.old_price)}
            </span>
          )}
        </div>

        {/* Mobile: Simple outline shopping bag icon */}
        <button
          onClick={handleAddClick}
          className="md:hidden text-gray-700 hover:text-brand-green p-1 transition-colors cursor-pointer"
          aria-label="Agregar al carrito"
        >
          <svg className="w-5 h-5 text-brand-dark" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
          </svg>
        </button>

        {/* Desktop: Circular green cart outline button */}
        <button
          onClick={handleAddClick}
          className="hidden md:flex w-8 h-8 rounded-full border border-brand-green bg-transparent text-brand-green hover:bg-brand-green hover:text-brand-dark items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
          aria-label="Agregar al carrito"
        >
          <i className="fas fa-shopping-cart text-xs"></i>
        </button>
      </div>
    </div>
  );
}
