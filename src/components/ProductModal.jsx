import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from './Header';

export default function ProductModal({ product, onClose, allProducts = [], onSelectRelatedProduct }) {
  const { addToCart } = useCart();
  const [selectedQty, setSelectedQty] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Reset indices on product change
  useEffect(() => {
    setSelectedQty(1);
    setActiveImageIndex(0);
  }, [product]);

  if (!product) return null;

  const hasDiscount = product.old_price && product.old_price > product.price;
  const images = product.images && product.images.length > 0
    ? product.images
    : [];

  // Add to cart callback
  const handleAddToCart = () => {
    addToCart(product, selectedQty);
    onClose();
  };

  // Find related products (same category, different ID)
  const relatedProducts = allProducts
    .filter(p => p.category_id === product.category_id && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="fixed inset-0 bg-[#111827]/75 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 md:p-8 relative shadow-2xl space-y-6 md:space-y-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-50 border border-gray-100 hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all flex items-center justify-center text-gray-500 cursor-pointer z-10"
          aria-label="Cerrar modal"
        >
          <i className="fas fa-times text-sm"></i>
        </button>

        {/* Product Details Section (Two Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          
          {/* Column 1: Image Gallery */}
          <div className="space-y-4 flex flex-col justify-center">
            {/* Active Image Box */}
            <div className="w-full h-64 md:h-80 bg-gray-50/50 rounded-2xl flex items-center justify-center border border-gray-100 p-4">
              {images.length > 0 ? (
                <img
                  src={images[activeImageIndex]}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain select-none"
                />
              ) : (
                <i className="fas fa-box text-gray-300 text-6xl"></i>
              )}
            </div>

            {/* Thumbnail Navigation */}
            {images.length > 1 && (
              <div className="flex gap-2.5 overflow-x-auto py-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-14 h-14 rounded-xl border p-1 bg-white shrink-0 transition-all cursor-pointer ${
                      idx === activeImageIndex
                        ? 'border-brand-green ring-2 ring-brand-green/10'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img src={img} alt="Miniatura" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Column 2: Info & Purchasing */}
          <div className="text-left flex flex-col justify-between space-y-4">
            
            {/* Headers */}
            <div className="space-y-2">
              <span className="text-[0.65rem] font-bold text-gray-400 block tracking-wider uppercase">
                SKU: {product.sku || 'N/A'}
              </span>
              <h3 className="text-lg md:text-2xl font-black text-brand-dark leading-tight">
                {product.name}
              </h3>
              
              {/* Pricing Row */}
              <div className="flex items-baseline gap-3 pt-2">
                <span className="text-lg md:text-2xl font-black text-brand-dark">
                  ${formatCurrency(product.price)}
                </span>
                {hasDiscount && (
                  <span className="text-xs md:text-sm text-gray-400 line-through font-medium">
                    ${formatCurrency(product.old_price)}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-black text-brand-dark uppercase tracking-wider">Descripción</h4>
              <p className="text-xs text-gray-500 leading-relaxed max-w-md">
                {product.description || 'Sin descripción disponible para este artículo.'}
              </p>
            </div>

            {/* Specs Table */}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-black text-brand-dark uppercase tracking-wider">Especificaciones Técnicas</h4>
                <div className="border border-gray-100 rounded-xl overflow-hidden text-xs">
                  <table className="w-full border-collapse">
                    <tbody>
                      {Object.entries(product.specifications).map(([key, val], idx) => (
                        <tr key={key} className={idx % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'}>
                          <td className="px-4 py-2 font-bold text-brand-dark border-r border-gray-100 w-1/3 uppercase text-[0.6rem] tracking-wider">{key}</td>
                          <td className="px-4 py-2 text-gray-500">{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Add to Cart Actions */}
            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
              
              {/* Quantity Selector */}
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50 select-none">
                <button
                  onClick={() => setSelectedQty(prev => Math.max(prev - 1, 1))}
                  className="px-3.5 py-2.5 hover:bg-gray-200 text-gray-500 transition-colors text-xs font-bold"
                >
                  <i className="fas fa-minus"></i>
                </button>
                <span className="w-10 text-center font-bold text-xs text-brand-dark">{selectedQty}</span>
                <button
                  onClick={() => setSelectedQty(prev => prev + 1)}
                  className="px-3.5 py-2.5 hover:bg-gray-200 text-gray-500 transition-colors text-xs font-bold"
                >
                  <i className="fas fa-plus"></i>
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-brand-green hover:bg-lime-600 text-brand-dark font-black py-3 px-6 rounded-xl transition-all hover:scale-[1.01] flex items-center justify-center gap-2 uppercase text-xs tracking-wider cursor-pointer shadow-lg shadow-brand-green/20"
              >
                <i className="fas fa-shopping-cart text-[11px]"></i>
                <span>Agregar al carrito</span>
              </button>

            </div>

          </div>

        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-gray-100 pt-6 space-y-4">
            <h4 className="text-xs md:text-sm font-black text-brand-dark uppercase tracking-wider text-left relative">
              Productos Relacionados
              <span className="absolute bottom-[-6px] left-0 w-8 h-[2px] bg-brand-green rounded-full"></span>
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map(p => {
                const img = p.images && p.images.length > 0 ? p.images[0] : '';
                return (
                  <div
                    key={p.id}
                    onClick={() => onSelectRelatedProduct(p)}
                    className="bg-white border border-gray-100 rounded-2xl p-3 hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer group"
                  >
                    <div className="w-full h-24 flex items-center justify-center p-1 bg-gray-50/50 rounded-xl mb-2">
                      {img ? (
                        <img src={img} alt={p.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform" />
                      ) : (
                        <i className="fas fa-box text-gray-300 text-2xl group-hover:scale-105 transition-transform"></i>
                      )}
                    </div>
                    <div className="text-left space-y-0.5">
                      <h5 className="text-[11px] font-black text-brand-dark line-clamp-1 group-hover:text-brand-green transition-colors leading-tight">
                        {p.name}
                      </h5>
                      <span className="text-[11px] font-extrabold text-gray-500">
                        ${formatCurrency(p.price)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
