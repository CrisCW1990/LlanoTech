import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from './Header';

export default function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartTotal
  } = useCart();

  // Prevent background scrolling when cart drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => document.body.classList.remove('overflow-hidden');
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  // Checkout order through WhatsApp
  const handleSendOrder = () => {
    if (cartItems.length === 0) return;

    let messageText = '¡Hola! Quisiera realizar el siguiente pedido:\n\n';

    cartItems.forEach(item => {
      messageText += `- ${item.quantity}x ${item.name} [SKU: ${item.sku || 'N/A'}] - $${formatCurrency(item.price * item.quantity)}\n`;
    });

    messageText += `\nTotal del Pedido: $${formatCurrency(cartTotal)}\n\n`;
    messageText += 'Quedo atento a la confirmación de disponibilidad para acordar la entrega y el método de pago.';

    const encodedText = encodeURIComponent(messageText);
    const whatsappUrl = `https://api.whatsapp.com/send/?phone=573112812020&text=${encodedText}`;

    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      
      {/* Drawer Backdrop overlay */}
      <div
        className="absolute inset-0 bg-[#111827]/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      ></div>

      {/* Slide-out Drawer Box */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between h-full border-l border-gray-100">
          
          {/* Drawer Header */}
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <i className="fas fa-shopping-bag text-brand-green text-lg"></i>
              <h3 className="text-sm md:text-base font-black text-brand-dark tracking-tight">Tu Carrito</h3>
              <span className="bg-gray-100 text-gray-500 font-extrabold text-[0.6rem] px-2 py-0.5 rounded-full">
                {cartItems.length} {cartItems.length === 1 ? 'producto' : 'productos'}
              </span>
            </div>
            
            {/* Close Button */}
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors w-8 h-8 rounded-full hover:bg-gray-50 flex items-center justify-center cursor-pointer"
            >
              <i className="fas fa-times text-sm"></i>
            </button>
          </div>

          {/* Drawer Body (Items List) */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 no-scrollbar">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-3">
                <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 text-3xl">
                  <i className="fas fa-shopping-cart"></i>
                </div>
                <h4 className="text-xs font-bold text-brand-dark uppercase tracking-wider">Tu carrito está vacío</h4>
                <p className="text-[11px] text-gray-400 max-w-[200px] leading-relaxed">
                  Explora las diferentes categorías y agrega los accesorios tecnológicos de tu preferencia.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-brand-green/10 hover:bg-brand-green text-brand-dark font-extrabold px-5 py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Continuar comprando
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 py-3 border-b border-gray-50 hover:bg-gray-50/50 rounded-xl px-2 -mx-2 transition-colors relative group"
                >
                  {/* Thumbnail Image */}
                  <div className="w-14 h-14 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center p-1 shrink-0">
                    {item.images && item.images.length > 0 ? (
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <i className="fas fa-box text-gray-300 text-lg"></i>
                    )}
                  </div>

                  {/* Title & Price */}
                  <div className="flex-1 text-left min-w-0">
                    <span className="text-[0.55rem] font-bold text-gray-400 block tracking-wider leading-none">
                      SKU: {item.sku || 'N/A'}
                    </span>
                    <h5 className="text-[11px] md:text-xs font-black text-brand-dark truncate leading-tight mt-0.5" title={item.name}>
                      {item.name}
                    </h5>
                    <span className="text-[11px] font-extrabold text-brand-green block mt-1">
                      ${formatCurrency(item.price)}
                    </span>

                    {/* Quantity Control Buttons */}
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50 select-none w-max mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors text-[10px]"
                        aria-label="Disminuir cantidad"
                      >
                        <i className="fas fa-minus"></i>
                      </button>
                      <span className="w-8 text-center text-xs font-extrabold text-brand-dark leading-none">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors text-[10px]"
                        aria-label="Aumentar cantidad"
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="absolute top-2 right-2 text-gray-300 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                    aria-label="Eliminar producto"
                  >
                    <i className="far fa-trash-alt text-[10px]"></i>
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer (Subtotals & Send Button) */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-100 px-6 py-5 space-y-4 bg-gray-50/50">
              
              {/* Billing Breakdown */}
              <div className="space-y-1.5 text-xs text-gray-500 font-bold uppercase tracking-wider">
                <div className="flex justify-between items-center">
                  <span>Subtotal</span>
                  <span className="text-brand-dark">${formatCurrency(cartTotal)}</span>
                </div>
                <div className="flex justify-between items-center text-[10px] text-gray-400">
                  <span>Envío</span>
                  <span className="font-semibold text-gray-500 text-right">Contra entrega / Por acordar</span>
                </div>
                <div className="flex justify-between items-center border-t border-gray-100 pt-3 text-sm font-black text-brand-dark">
                  <span>Total</span>
                  <span className="text-brand-green">${formatCurrency(cartTotal)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleSendOrder}
                className="w-full bg-[#25d366] hover:bg-[#20ba5a] text-white font-black py-4.5 rounded-xl transition-all shadow-lg shadow-green-500/25 flex items-center justify-center gap-2.5 uppercase text-xs tracking-wider cursor-pointer"
              >
                <i className="fab fa-whatsapp text-sm"></i>
                <span>Enviar pedido por WhatsApp</span>
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
