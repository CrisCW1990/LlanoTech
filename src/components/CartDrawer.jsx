import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from './Header';

export default function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartTotal,
    addToCart
  } = useCart();

  const [step, setStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    phone: '',
    address: '',
    neighborhood: '',
    departamento: '',
    ciudad: '',
    paymentMethod: 'contra_entrega'
  });

  // Prevent background scrolling when cart drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.classList.add('overflow-hidden');
      document.body.classList.add('cart-drawer-open');
      setStep(1); // Reset to step 1 when opening the cart
    } else {
      document.body.classList.remove('overflow-hidden');
      document.body.classList.remove('cart-drawer-open');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
      document.body.classList.remove('cart-drawer-open');
    };
  }, [isCartOpen]);

  // Load demo products helper for visualization
  const handleLoadDemoProducts = () => {
    addToCart({
      id: 'demo-1',
      sku: 'AUD-APP-PRO2',
      name: 'AirPods Pro 2 (Premium)',
      price: 899900,
      images: []
    }, 1);
    addToCart({
      id: 'demo-2',
      sku: 'CAR-USB-C20W',
      name: 'Cargador USB-C 20W (Carga Rápida)',
      price: 79900,
      images: []
    }, 2);
  };

  if (!isCartOpen) return null;

  // Form validity check for shipping step
  const isFormValid = 
    shippingInfo.name.trim() !== '' && 
    shippingInfo.phone.trim() !== '' && 
    shippingInfo.address.trim() !== '' &&
    shippingInfo.departamento.trim() !== '' &&
    shippingInfo.ciudad.trim() !== '';

  // Checkout order through WhatsApp
  const handleSendOrder = () => {
    if (cartItems.length === 0) return;

    let messageText = '🤖 *¡Hola LlanoTech!* Quisiera realizar el siguiente pedido:\n\n';

    messageText += '📦 *PRODUCTOS:*\n';
    cartItems.forEach(item => {
      messageText += `• ${item.quantity}x _${item.name}_ [SKU: ${item.sku || 'N/A'}] - $${formatCurrency(item.price * item.quantity)}\n`;
    });

    messageText += `\n*Total del Pedido:* $${formatCurrency(cartTotal)}\n\n`;
    
    messageText += '📍 *DATOS DE ENTREGA:*\n';
    messageText += `• *Nombre:* ${shippingInfo.name}\n`;
    messageText += `• *Celular:* ${shippingInfo.phone}\n`;
    messageText += `• *Dirección:* ${shippingInfo.address}\n`;
    if (shippingInfo.neighborhood) {
      messageText += `• *Barrio/Indicaciones:* ${shippingInfo.neighborhood}\n`;
    }
    messageText += `• *Ciudad/Municipio:* ${shippingInfo.ciudad}\n`;
    messageText += `• *Departamento:* ${shippingInfo.departamento}\n`;
    
    let paymentLabel = 'Efectivo contra entrega';
    if (shippingInfo.paymentMethod === 'nequi_daviplata') paymentLabel = 'Nequi / Daviplata';
    if (shippingInfo.paymentMethod === 'transferencia') paymentLabel = 'Transferencia Bancaria (Bancolombia)';
    messageText += `• *Método de Pago:* ${paymentLabel}\n\n`;
    
    messageText += 'Quedo atento a la confirmación de disponibilidad para acordar la entrega y el pago. ¡Gracias!';

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
              <svg className="w-5 h-5 text-brand-black" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
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

          {/* Progress Tracker (Only when cart has items) */}
          {cartItems.length > 0 && (
            <div className="px-6 py-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between text-[10px] select-none uppercase tracking-wider font-extrabold">
              {/* Step 1 indicator */}
              <button 
                onClick={() => setStep(1)}
                className={`flex items-center gap-1.5 transition-colors ${step >= 1 ? 'text-brand-black' : 'text-gray-400'}`}
              >
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] border ${step >= 1 ? 'bg-brand-black text-brand-green border-brand-black' : 'bg-transparent text-gray-400 border-gray-300'}`}>1</span>
                <span>Carrito</span>
              </button>
              
              {/* Line 1 */}
              <div className="flex-1 h-[2px] mx-2 bg-gray-200 rounded-full overflow-hidden">
                <div className={`h-full bg-brand-black transition-all duration-300 ${step >= 2 ? 'w-full' : 'w-0'}`}></div>
              </div>
              
              {/* Step 2 indicator */}
              <button 
                onClick={() => isFormValid && setStep(2)}
                disabled={step < 2 && !isFormValid}
                className={`flex items-center gap-1.5 transition-colors disabled:cursor-not-allowed ${step >= 2 ? 'text-brand-black' : 'text-gray-400'}`}
              >
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] border ${step >= 2 ? 'bg-brand-black text-brand-green border-brand-black' : 'bg-transparent text-gray-400 border-gray-300'}`}>2</span>
                <span>Envío</span>
              </button>

              {/* Line 2 */}
              <div className="flex-1 h-[2px] mx-2 bg-gray-200 rounded-full overflow-hidden">
                <div className={`h-full bg-brand-black transition-all duration-300 ${step >= 3 ? 'w-full' : 'w-0'}`}></div>
              </div>

              {/* Step 3 indicator */}
              <span className={`flex items-center gap-1.5 ${step === 3 ? 'text-brand-black' : 'text-gray-400'}`}>
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] border ${step === 3 ? 'bg-brand-black text-brand-green border-brand-black' : 'bg-transparent text-gray-400 border-gray-300'}`}>3</span>
                <span>Confirmar</span>
              </span>
            </div>
          )}

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4 no-scrollbar">
            {cartItems.length === 0 ? (
              /* Empty state */
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 text-3xl">
                  <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-black text-brand-dark uppercase tracking-wider">Tu carrito está vacío</h4>
                  <p className="text-[11px] text-gray-400 max-w-[200px] leading-relaxed">
                    Explora las diferentes categorías y agrega los accesorios tecnológicos de tu preferencia.
                  </p>
                </div>
                <div className="flex flex-col gap-2 w-full max-w-[220px]">
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="bg-brand-black hover:bg-gray-800 text-white font-extrabold px-5 py-3 rounded-xl text-xs transition-colors cursor-pointer w-full"
                  >
                    Continuar comprando
                  </button>
                  <button
                    onClick={handleLoadDemoProducts}
                    className="bg-gray-100 hover:bg-gray-200 text-brand-dark font-extrabold px-5 py-3 rounded-xl text-xs transition-colors cursor-pointer w-full border border-gray-200/50"
                  >
                    Cargar Productos Demo
                  </button>
                </div>
              </div>
            ) : step === 1 ? (
              /* Step 1: Cart Items List */
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 py-3.5 border-b border-gray-100 hover:bg-gray-50/50 rounded-2xl px-3 -mx-3 transition-colors relative group"
                  >
                    {/* Thumbnail Image */}
                    <div className="w-16 h-16 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center p-1.5 shrink-0">
                      {item.images && item.images.length > 0 ? (
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="max-h-full max-w-full object-contain rounded-lg"
                        />
                      ) : (
                        <i className="fas fa-box text-gray-300 text-lg"></i>
                      )}
                    </div>

                    {/* Title & Price */}
                    <div className="flex-1 text-left min-w-0 pr-8">
                      <span className="text-[0.55rem] font-bold text-gray-400 block tracking-wider leading-none">
                        SKU: {item.sku || 'N/A'}
                      </span>
                      <h5 className="text-[11px] md:text-xs font-black text-brand-dark truncate leading-tight mt-1" title={item.name}>
                        {item.name}
                      </h5>
                      <span className="text-[11px] font-black text-brand-dark block mt-1.5">
                        ${formatCurrency(item.price)}
                      </span>

                      {/* Quantity Control Buttons */}
                      <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50 select-none w-max mt-2.5">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2.5 py-1.5 hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors text-[9px] cursor-pointer"
                          aria-label="Disminuir cantidad"
                        >
                          <i className="fas fa-minus"></i>
                        </button>
                        <span className="w-7 text-center text-xs font-black text-brand-dark leading-none">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2.5 py-1.5 hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors text-[9px] cursor-pointer"
                          aria-label="Aumentar cantidad"
                        >
                          <i className="fas fa-plus"></i>
                        </button>
                      </div>
                    </div>

                    {/* Remove Button (Visible always but with nicer layout) */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-300 hover:text-red-500 hover:bg-red-50 p-2 rounded-xl transition-all cursor-pointer"
                      aria-label="Eliminar producto"
                    >
                      <i className="far fa-trash-alt text-[11px]"></i>
                    </button>
                  </div>
                ))}
              </div>
            ) : step === 2 ? (
              /* Step 2: Delivery Details Form */
              <div className="space-y-4 py-1">
                <div className="text-left mb-2">
                  <h4 className="text-xs font-black text-brand-dark uppercase tracking-wider">Datos de Entrega</h4>
                  <p className="text-[10px] text-gray-400 mt-0.5">Ingresa la información para preparar y enviar tu pedido.</p>
                </div>
                
                {/* Name */}
                <div className="space-y-1 text-left">
                  <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">Nombre Completo *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Andrés Felipe Medina"
                    value={shippingInfo.name}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs text-brand-dark focus:bg-white focus:border-brand-black focus:ring-1 focus:ring-brand-black outline-none transition-all placeholder-gray-300"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1 text-left">
                  <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">Número de Celular *</label>
                  <input
                    type="tel"
                    required
                    placeholder="Ej. 311 281 2020"
                    value={shippingInfo.phone}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs text-brand-dark focus:bg-white focus:border-brand-black focus:ring-1 focus:ring-brand-black outline-none transition-all placeholder-gray-300"
                  />
                </div>

                {/* Departamento & Ciudad/Municipio (2 Columns) */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1 text-left">
                    <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">Departamento *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Meta"
                      value={shippingInfo.departamento}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, departamento: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 text-xs text-brand-dark focus:bg-white focus:border-brand-black focus:ring-1 focus:ring-brand-black outline-none transition-all placeholder-gray-300"
                    />
                  </div>
                  <div className="space-y-1 text-left">
                    <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">Ciudad / Municipio *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Villavicencio"
                      value={shippingInfo.ciudad}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, ciudad: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 text-xs text-brand-dark focus:bg-white focus:border-brand-black focus:ring-1 focus:ring-brand-black outline-none transition-all placeholder-gray-300"
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-1 text-left">
                  <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">Dirección de Entrega *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Calle 15 # 24 - 45, Edificio Llano"
                    value={shippingInfo.address}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs text-brand-dark focus:bg-white focus:border-brand-black focus:ring-1 focus:ring-brand-black outline-none transition-all placeholder-gray-300"
                  />
                </div>

                {/* Neighborhood */}
                <div className="space-y-1 text-left">
                  <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">Barrio / Indicaciones adicionales</label>
                  <input
                    type="text"
                    placeholder="Ej. Barrio El Buque, apto 402"
                    value={shippingInfo.neighborhood}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, neighborhood: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs text-brand-dark focus:bg-white focus:border-brand-black focus:ring-1 focus:ring-brand-black outline-none transition-all placeholder-gray-300"
                  />
                </div>

                {/* Payment Method Selector */}
                <div className="space-y-2 text-left pt-2">
                  <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">Método de Pago</label>
                  <div className="grid grid-cols-3 gap-2">
                    {/* Option 1: Contra Entrega */}
                    <button
                      type="button"
                      onClick={() => setShippingInfo({ ...shippingInfo, paymentMethod: 'contra_entrega' })}
                      className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                        shippingInfo.paymentMethod === 'contra_entrega'
                          ? 'border-brand-black bg-brand-black/5 ring-1 ring-brand-black'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <i className="fas fa-money-bill-wave text-xs text-gray-700 mb-1"></i>
                      <span className="text-[9px] font-black text-brand-dark leading-tight">Efectivo</span>
                      <span className="text-[7.5px] text-gray-400 mt-0.5">Contra entrega</span>
                    </button>

                    {/* Option 2: Nequi/Daviplata */}
                    <button
                      type="button"
                      onClick={() => setShippingInfo({ ...shippingInfo, paymentMethod: 'nequi_daviplata' })}
                      className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                        shippingInfo.paymentMethod === 'nequi_daviplata'
                          ? 'border-brand-black bg-brand-black/5 ring-1 ring-brand-black'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <i className="fas fa-mobile-alt text-xs text-purple-600 mb-1"></i>
                      <span className="text-[9px] font-black text-brand-dark leading-tight">Nequi/Davi</span>
                      <span className="text-[7.5px] text-gray-400 mt-0.5">Transferencia</span>
                    </button>

                    {/* Option 3: Transferencia Bancaria */}
                    <button
                      type="button"
                      onClick={() => setShippingInfo({ ...shippingInfo, paymentMethod: 'transferencia' })}
                      className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                        shippingInfo.paymentMethod === 'transferencia'
                          ? 'border-brand-black bg-brand-black/5 ring-1 ring-brand-black'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <i className="fas fa-university text-xs text-blue-600 mb-1"></i>
                      <span className="text-[9px] font-black text-brand-dark leading-tight">Bancario</span>
                      <span className="text-[7.5px] text-gray-400 mt-0.5">Bancolombia</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Step 3: Confirmation Summary */
              <div className="space-y-5 py-1">
                <div className="text-left">
                  <h4 className="text-xs font-black text-brand-dark uppercase tracking-wider">Confirmar Pedido</h4>
                  <p className="text-[10px] text-gray-400 mt-0.5">Revisa que la información sea correcta antes de enviar.</p>
                </div>

                {/* Delivery details review */}
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 text-left space-y-3 text-xs">
                  <h5 className="font-black text-brand-dark uppercase tracking-wider text-[9px] text-gray-400 border-b border-gray-200/50 pb-1.5">Datos de Entrega</h5>
                  <div className="grid grid-cols-1 gap-2">
                    <div>
                      <span className="text-gray-400 font-bold block text-[10px] uppercase leading-none">Nombre</span>
                      <span className="font-extrabold text-brand-dark block mt-0.5">{shippingInfo.name}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 font-bold block text-[10px] uppercase leading-none">Celular</span>
                      <span className="font-extrabold text-brand-dark block mt-0.5">{shippingInfo.phone}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 font-bold block text-[10px] uppercase leading-none">Dirección</span>
                      <span className="font-extrabold text-brand-dark block mt-0.5">
                        {shippingInfo.address}
                        {shippingInfo.neighborhood && <span className="text-gray-500 font-semibold block text-[11px] mt-0.5">Barrio: {shippingInfo.neighborhood}</span>}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400 font-bold block text-[10px] uppercase leading-none">Ciudad / Departamento</span>
                      <span className="font-extrabold text-brand-dark block mt-0.5">{shippingInfo.ciudad}, {shippingInfo.departamento}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 font-bold block text-[10px] uppercase leading-none">Método de pago</span>
                      <span className="font-black text-brand-dark text-[10px] uppercase bg-white px-2 py-0.5 rounded-md border border-gray-100 inline-block mt-1">
                        {shippingInfo.paymentMethod === 'contra_entrega' 
                          ? '💵 Efectivo contra entrega' 
                          : shippingInfo.paymentMethod === 'nequi_daviplata'
                          ? '📱 Nequi / Daviplata'
                          : '🏦 Transferencia Bancaria'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order items list review */}
                <div className="space-y-2">
                  <h5 className="text-[9px] font-black text-gray-400 uppercase tracking-wider text-left pl-1">Resumen de Artículos</h5>
                  <div className="border border-gray-100 rounded-2xl divide-y divide-gray-50 bg-white overflow-hidden shadow-inner">
                    <div className="max-h-[160px] overflow-y-auto no-scrollbar divide-y divide-gray-50">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex justify-between items-center p-3 text-xs text-left">
                          <div className="min-w-0 pr-2">
                            <span className="font-extrabold text-brand-dark text-[11px] block truncate">{item.name}</span>
                            <span className="text-[10px] text-gray-400 font-bold">{item.quantity} x ${formatCurrency(item.price)}</span>
                          </div>
                          <span className="font-black text-brand-dark shrink-0">${formatCurrency(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Drawer Footer */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-100 px-6 py-5 space-y-4 bg-gray-50/50">
              
              {/* Billing Breakdown */}
              <div className="space-y-2 text-xs text-gray-500 font-bold uppercase tracking-wider">
                <div className="flex justify-between items-center text-[10px]">
                  <span>Subtotal</span>
                  <span className="text-brand-dark">${formatCurrency(cartTotal)}</span>
                </div>
                <div className="flex justify-between items-center text-[9px] text-gray-400">
                  <span>Envío</span>
                  <span className="font-semibold text-gray-500 text-right">Contra entrega / Por acordar</span>
                </div>
                <div className="flex justify-between items-center border-t border-gray-200/60 pt-3 text-sm font-black text-brand-dark">
                  <span>Total</span>
                  <span className="text-brand-black">${formatCurrency(cartTotal)}</span>
                </div>
              </div>

              {/* Action Buttons based on Step */}
              {step === 1 ? (
                /* Step 1 Footer Action */
                <button
                  onClick={() => setStep(2)}
                  className="w-full bg-brand-black hover:bg-gray-800 text-white font-black py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2.5 uppercase text-xs tracking-wider cursor-pointer active:scale-[0.99]"
                >
                  <span>Continuar al Envío</span>
                  <i className="fas fa-arrow-right text-[10px]"></i>
                </button>
              ) : step === 2 ? (
                /* Step 2 Footer Actions */
                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="w-1/3 border border-gray-200 hover:border-gray-300 hover:bg-gray-100/50 text-brand-dark font-black py-3.5 rounded-xl transition-all uppercase text-xs tracking-wider cursor-pointer text-center"
                  >
                    Volver
                  </button>
                  <button
                    onClick={() => isFormValid && setStep(3)}
                    disabled={!isFormValid}
                    className="flex-1 bg-brand-black hover:bg-gray-800 disabled:bg-gray-200 disabled:text-gray-400 text-white font-black py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2.5 uppercase text-xs tracking-wider cursor-pointer disabled:cursor-not-allowed"
                  >
                    <span>Siguiente</span>
                    <i className="fas fa-arrow-right text-[10px]"></i>
                  </button>
                </div>
              ) : (
                /* Step 3 Footer Actions */
                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(2)}
                    className="w-1/3 border border-gray-200 hover:border-gray-300 hover:bg-gray-100/50 text-brand-dark font-black py-3.5 rounded-xl transition-all uppercase text-xs tracking-wider cursor-pointer text-center"
                  >
                    Volver
                  </button>
                  <button
                    onClick={handleSendOrder}
                    className="flex-1 bg-[#25d366] hover:bg-[#20ba5a] text-white font-black py-3.5 rounded-xl transition-all shadow-lg hover:shadow-green-500/30 shadow-green-500/25 flex items-center justify-center uppercase text-xs tracking-wider cursor-pointer hover:scale-[1.01]"
                  >
                    <span className="!inline-block !w-auto text-center">
                      <i className="fab fa-whatsapp text-lg align-middle mr-1.5 !static !translate-y-0 !m-0 !inset-auto !inline-block"></i>
                      Enviar por WhatsApp
                    </span>
                  </button>
                </div>
              )}

            </div>
          )}

        </div>
      </div>
    </div>
  );
}

