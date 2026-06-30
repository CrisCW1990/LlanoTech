import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

const ITEMS_PER_PAGE = 8;

export default function ProductGrid({ products = [], selectedCategory, searchQuery, onOpenModal }) {
  const [sortBy, setSortBy] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);

  // Reset page when category or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  // Filter logic
  let filtered = [...products];

  // Category filter
  if (selectedCategory && selectedCategory !== 'all') {
    filtered = filtered.filter(p => p.category_id === selectedCategory);
  }

  // Search filter
  if (searchQuery) {
    const q = searchQuery.toLowerCase().trim();
    filtered = filtered.filter(p =>
      (p.name && p.name.toLowerCase().includes(q)) ||
      (p.sku && p.sku.toLowerCase().includes(q)) ||
      (p.description && p.description.toLowerCase().includes(q))
    );
  }

  // Sort logic
  if (sortBy === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'name-asc') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === 'name-desc') {
    filtered.sort((a, b) => b.name.localeCompare(a.name));
  } else {
    // default: newer first (assuming created_at timestamp, fall back to id string comparison)
    filtered.sort((a, b) => {
      const dateA = a.created_at ? new Date(a.created_at) : new Date(0);
      const dateB = b.created_at ? new Date(b.created_at) : new Date(0);
      return dateB - dateA;
    });
  }

  // Pagination calculations
  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedItems = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <section className="space-y-6">
      {/* Grid Header Controls */}
      <div className="flex items-center justify-between pb-2">
        <h3 className="text-base font-black text-brand-dark tracking-tight">
          PRODUCTOS DESTACADOS
        </h3>
        <div className="flex items-center gap-4">
          {/* Sorting Dropdown (Desktop Only) */}
          <div className="hidden md:flex items-center gap-2 text-xs">
            <span className="text-gray-400 font-bold uppercase tracking-wider">Ordenar:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-gray-200 rounded-xl px-3 py-1.5 font-bold text-brand-dark focus:ring-1 focus:ring-brand-green focus:border-brand-green outline-none transition-all cursor-pointer shadow-sm"
            >
              <option value="default">Más recientes</option>
              <option value="price-asc">Precio: menor a mayor</option>
              <option value="price-desc">Precio: mayor a menor</option>
              <option value="name-asc">Nombre: A - Z</option>
              <option value="name-desc">Nombre: Z - A</option>
            </select>
          </div>
          <button
            onClick={() => {}}
            className="text-xs font-bold text-[#8DDB00] hover:underline flex items-center gap-1"
          >
            <span>Ver todas</span>
            <i className="fas fa-chevron-right text-[8px]"></i>
          </button>
        </div>
      </div>

      {/* Grid of Cards */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-50 py-16 px-4 text-center shadow-inner">
          <div className="w-16 h-16 rounded-2xl bg-gray-50 text-gray-300 flex items-center justify-center text-3xl mx-auto mb-4">
            <i className="fas fa-box-open"></i>
          </div>
          <h4 className="text-sm font-bold text-brand-dark">No se encontraron productos</h4>
          <p className="text-xs text-gray-400 mt-1 max-w-xs mx-auto leading-relaxed">
            Intenta cambiar los términos de búsqueda o selecciona otra categoría de accesorios.
          </p>
        </div>
      ) : (
        <>
          {/* Mobile view: Horizontal scroll of all filtered items */}
          <div className="flex md:hidden overflow-x-auto no-scrollbar gap-3.5 py-2 px-1 scroll-smooth">
            {filtered.map((product) => (
              <div key={product.id} className="w-[165px] shrink-0">
                <ProductCard
                  product={product}
                  onOpenModal={onOpenModal}
                />
              </div>
            ))}
          </div>

          {/* Desktop view: Grid of paginated items */}
          <div className="hidden md:grid grid-cols-3 lg:grid-cols-4 gap-6">
            {paginatedItems.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenModal={onOpenModal}
              />
            ))}
          </div>
        </>
      )}

      {/* Pagination Controls (Desktop Only) */}
      {totalPages > 1 && (
        <div className="hidden md:flex items-center justify-center gap-2 pt-6 select-none text-xs">
          {/* Previous Page Button */}
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="w-8 h-8 rounded-full border border-gray-100 bg-white flex items-center justify-center text-gray-500 hover:bg-brand-green hover:text-brand-dark transition-all disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-gray-500 disabled:cursor-not-allowed cursor-pointer"
            aria-label="Página anterior"
          >
            <i className="fas fa-chevron-left text-[10px]"></i>
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }).map((_, idx) => {
            const pageNum = idx + 1;
            const isCurrent = pageNum === currentPage;
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-8 h-8 rounded-full font-extrabold transition-all border cursor-pointer ${
                  isCurrent
                    ? 'bg-brand-green text-brand-dark border-brand-green'
                    : 'bg-white text-gray-500 border-gray-100 hover:border-gray-300 hover:text-brand-dark'
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          {/* Next Page Button */}
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="w-8 h-8 rounded-full border border-gray-100 bg-white flex items-center justify-center text-gray-500 hover:bg-brand-green hover:text-brand-dark transition-all disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-gray-500 disabled:cursor-not-allowed cursor-pointer"
            aria-label="Página siguiente"
          >
            <i className="fas fa-chevron-right text-[10px]"></i>
          </button>
        </div>
      )}
    </section>
  );
}
