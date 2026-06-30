import React from 'react';
import { useCart } from '../context/CartContext';

export function formatCurrency(value) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value).replace('COP', '').trim();
}

export default function Header({ searchVal, onSearchChange }) {
  const { cartCount, cartTotal, setIsCartOpen } = useCart();

  return (
    <header className="sticky top-0 bg-white border-b border-gray-100 z-40 px-4 py-3 md:py-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col gap-3">
        {/* Top Header Row */}
        <div className="flex items-center justify-between gap-4 relative h-12 md:h-auto">
          
          {/* Hamburger Icon (Absolute on mobile, relative on desktop) */}
          <button
            className="text-brand-green hover:text-brand-green-sec transition-colors p-1 absolute left-0 top-1/2 -translate-y-1/2 md:relative md:top-auto md:translate-y-0"
            aria-label="Abrir menú"
          >
            <svg className="w-7 h-7 text-brand-green" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>

          {/* Logo (Centered on mobile, left-aligned next to hamburger on desktop) */}
          <div className="flex flex-col select-none items-center mx-auto md:mx-0 md:ml-3">
            <div className="text-xl md:text-2xl font-black tracking-tighter text-brand-dark leading-none uppercase">
              LLANO <span className="text-brand-green">TECH</span>
            </div>
            <div className="flex items-center w-full my-1 max-w-[120px] md:max-w-none">
              <div className="flex-1 h-[1px] bg-gray-200"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-brand-dark mx-1.5"></div>
              <div className="flex-1 h-[1px] bg-gray-200"></div>
            </div>
            <span className="text-[0.38rem] md:text-[0.48rem] tracking-[0.2em] font-extrabold text-gray-500 uppercase leading-none">
              AUTOMATIZACIÓN Y SISTEMAS
            </span>
          </div>

          {/* Center (Desktop Search Bar) */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4">
            <div className="relative w-full">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <i className="fas fa-search"></i>
              </span>
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchVal}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-[#f3f4f6] border border-transparent rounded-full pl-9 pr-4 py-2 text-sm text-brand-dark placeholder-gray-400 focus:bg-white focus:border-brand-green outline-none transition-all"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4 md:gap-6">
            {/* WhatsApp Contact Info Widget (Desktop Only) */}
            <a
              href="https://wa.me/573112812020"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 hover:opacity-85 transition-opacity"
            >
              <div className="w-8 h-8 rounded-full bg-green-50 text-brand-green flex items-center justify-center text-lg">
                <i className="fab fa-whatsapp"></i>
              </div>
              <div className="text-left leading-none">
                <span className="text-[0.65rem] text-gray-400 font-semibold block">WhatsApp</span>
                <span className="text-xs font-bold text-brand-dark">311 281 2020</span>
              </div>
            </a>

            {/* User Icon / Mi Cuenta (Desktop Only) */}
            <button className="hidden md:flex items-center gap-1.5 text-brand-dark hover:text-brand-green font-bold text-xs transition-colors">
              <i className="far fa-user text-sm"></i>
              <span>Mi cuenta</span>
            </button>

            {/* Mobile Shopping Cart Button Trigger (Green outline bag icon + green badge, Absolute on mobile) */}
            <button
              onClick={() => {}} // Disable click logic
              className="md:hidden flex items-center text-brand-green hover:text-brand-green-sec transition-colors absolute right-0 top-1/2 -translate-y-1/2"
              aria-label="Abrir carrito"
            >
              <div className="relative">
                <svg className="w-7 h-7 text-brand-green" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                <span className="absolute -top-1.5 -right-1.5 bg-brand-green text-brand-dark font-black text-[0.6rem] w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white">
                  {cartCount}
                </span>
              </div>
            </button>

            {/* Desktop Shopping Cart Button Trigger (Gray outline cart with wheels + green badge) */}
            <button
              onClick={() => {}} // Disable click logic
              className="hidden md:flex items-center gap-2 text-brand-dark hover:text-brand-green transition-colors"
              aria-label="Abrir carrito"
            >
              <div className="relative">
                <i className="fas fa-shopping-cart text-xl md:text-2xl text-gray-700"></i>
                <span className="absolute -top-1.5 -right-1.5 bg-brand-green text-brand-dark font-extrabold text-[0.6rem] w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white">
                  {cartCount}
                </span>
              </div>
              <span className="text-xs font-extrabold text-brand-dark leading-none">
                ${formatCurrency(cartTotal)}
              </span>
            </button>
          </div>
        </div>

        {/* Bottom Header Row (Mobile Search Bar Only) */}
        <div className="md:hidden w-full mt-3">
          <div className="relative w-full">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.637 10.637z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchVal}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-[#F5F5F5] border border-transparent rounded-full pl-9 pr-4 py-2.5 text-xs text-brand-dark placeholder-gray-400 focus:bg-white focus:border-brand-green outline-none transition-all"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
