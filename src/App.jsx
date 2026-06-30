import React, { useState, useEffect } from 'react';
import { supabase } from './services/supabase';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import HeroCarousel from './components/HeroCarousel';
import InfoBadges from './components/InfoBadges';
import CategoryGrid from './components/CategoryGrid';
import ProductGrid from './components/ProductGrid';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';

// High-fidelity local catalog fallback
const FALLBACK = {
  categories: [
    { id: 'cat-celulares', name: 'Accesorios para celulares', slug: 'celulares', icon: 'fas fa-mobile-alt' },
    { id: 'cat-audifonos', name: 'Audífonos', slug: 'audifonos', icon: 'fas fa-headphones' },
    { id: 'cat-cargadores', name: 'Cargadores y cables', slug: 'cargadores', icon: 'fas fa-plug' },
    { id: 'cat-smartwatch', name: 'Smartwatch', slug: 'smartwatch', icon: 'fas fa-stopwatch' },
    { id: 'cat-camaras', name: 'Cámaras de seguridad', slug: 'camaras', icon: 'fas fa-video' },
    { id: 'cat-pc', name: 'Accesorios para PC', slug: 'pc', icon: 'fas fa-desktop' },
    { id: 'cat-redes', name: 'Redes y conectividad', slug: 'redes', icon: 'fas fa-wifi' },
  ],
  banners: [
    {
      id: 'banner-1',
      title: 'POTENCIA TU MUNDO DIGITAL',
      subtitle: 'Accesorios, dispositivos y soluciones tecnológicas para cada momento.',
      image_url: '',
      type: 'hero',
      link_url: '#catalog'
    }
  ],
  products: [
    {
      id: 'fallback-1',
      sku: 'AUD-APP-PRO2',
      name: 'AirPods Pro 2',
      category_id: 'cat-audifonos',
      price: 899900,
      old_price: null,
      images: [],
      tag: 'Nuevo',
      description: 'Los AirPods Pro 2 ofrecen una cancelación activa de ruido dos veces superior, modo ambiente adaptativo y audio espacial personalizado con seguimiento dinámico de la cabeza.',
      specifications: { 'Cancelación de Ruido': 'Activa dual', 'Autonomía': 'Hasta 6 horas', 'Conexión': 'Bluetooth 5.3', 'Estuche': 'MagSafe USB-C' },
      created_at: '2026-06-01T00:00:00Z'
    },
    {
      id: 'fallback-2',
      sku: 'CAR-USB-C20W',
      name: 'Cargador USB-C 20W',
      category_id: 'cat-cargadores',
      price: 79900,
      old_price: 99900,
      images: [],
      tag: '20% OFF',
      description: 'Adaptador de corriente de pared USB-C de 20W para carga rápida. Ideal para cargar de manera eficiente y segura tus celulares.',
      specifications: { 'Potencia': '20 Watts', 'Puerto': 'USB-C', 'Compatibilidad': 'Universal USB-PD', 'Certificación': 'CE / FCC' },
      created_at: '2026-06-02T00:00:00Z'
    },
    {
      id: 'fallback-3',
      sku: 'SWA-HW8-ULTRA',
      name: 'Smartwatch HW8 Ultra',
      category_id: 'cat-smartwatch',
      price: 189900,
      old_price: null,
      images: [],
      tag: 'Nuevo',
      description: 'Reloj inteligente HW8 Ultra con pantalla de gran resolución, sensor de frecuencia cardiaca, llamadas Bluetooth y múltiples modos deportivos.',
      specifications: { 'Pantalla': '2.0 pulgadas IPS', 'Conectividad': 'Bluetooth 5.2', 'Resistencia': 'IP68', 'Batería': 'Hasta 5 días' },
      created_at: '2026-06-03T00:00:00Z'
    },
    {
      id: 'fallback-4',
      sku: 'CAB-USB-C-LTG',
      name: 'Cable USB-C a Lightning',
      category_id: 'cat-cargadores',
      price: 24900,
      old_price: 29900,
      images: [],
      tag: '15% OFF',
      description: 'Cable reforzado de alta velocidad de carga y transmisión de datos USB-C a Lightning. Conectores metálicos y cable de nylon trenzado.',
      specifications: { 'Longitud': '1.2 metros', 'Material': 'Nylon trenzado', 'Compatibilidad': 'Apple Lightning', 'Velocidad': 'Carga rápida 3A' },
      created_at: '2026-06-04T00:00:00Z'
    },
    {
      id: 'fallback-5',
      sku: 'CAM-WIFI-360',
      name: 'Cámara Wifi 360°',
      category_id: 'cat-camaras',
      price: 129900,
      old_price: null,
      images: [],
      tag: 'Nuevo',
      description: 'Cámara de seguridad WiFi con visión 360 grados, resolución Full HD, audio bidireccional, visión nocturna y notificaciones automáticas de movimiento al celular.',
      specifications: { 'Resolución': '1080p Full HD', 'Ángulo': '360° rotatorio', 'Almacenamiento': 'MicroSD hasta 128GB', 'Visión Nocturna': 'Infrarroja inteligente' },
      created_at: '2026-06-05T00:00:00Z'
    },
    {
      id: 'fallback-6',
      sku: 'CAR-UGREEN-65W',
      name: 'Cargador UGREEN 65W',
      category_id: 'cat-cargadores',
      price: 149900,
      old_price: null,
      images: [],
      tag: 'Oferta',
      description: 'Adaptador de corriente GaN de carga rápida UGREEN 65W con 3 puertos (2x USB-C + 1x USB-A). Carga tu laptop, tableta y celular simultáneamente.',
      specifications: { 'Potencia': '65 Watts Max', 'Tecnología': 'GaN (Nitruro de Galio)', 'Puertos': '3 (2x USB-C + 1x USB-A)', 'Protocolos': 'PD 3.0, QC 4.0' },
      created_at: '2026-06-06T00:00:00Z'
    }
  ]
};

function AppContent() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [banners, setBanners] = useState([]);
  
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    async function loadData() {
      if (supabase) {
        try {
          const [resProducts, resCategories, resBanners] = await Promise.all([
            supabase.from('products').select('*'),
            supabase.from('categories').select('*'),
            supabase.from('banners').select('*')
          ]);

          setProducts([]); // Empty storefront of products as requested
          setCategories(resCategories.data && resCategories.data.length > 0 ? resCategories.data : FALLBACK.categories);
          setBanners(resBanners.data && resBanners.data.length > 0 ? resBanners.data : FALLBACK.banners);
        } catch (err) {
          console.warn('Supabase fetch error, using local fallback database:', err);
          setProducts([]);
          setCategories(FALLBACK.categories);
          setBanners(FALLBACK.banners);
        }
      } else {
        setProducts([]);
        setCategories(FALLBACK.categories);
        setBanners(FALLBACK.banners);
      }
    }
    loadData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Main Header */}
      <Header searchVal={searchQuery} onSearchChange={setSearchQuery} />

      {/* Main Page Layout */}
      <main className="max-w-7xl w-full mx-auto px-4 md:px-6 py-6 space-y-8 flex-1">
        
        {/* Banner Hero Carousel */}
        <HeroCarousel banners={banners} />

        {/* Feature Badges Indicators Row */}
        <InfoBadges />

        {/* Categories Bar */}
        <CategoryGrid
          categories={categories}
          selectedCategory={null}
          onSelectCategory={() => {}} // Disable click logic
        />

        {/* Products Grid */}
        <div id="catalog">
          <ProductGrid
            products={products}
            selectedCategory={selectedCategory}
            searchQuery={searchQuery}
            onOpenModal={setSelectedProduct}
          />
        </div>

      </main>

      {/* Shopping Cart Slider Drawer */}
      <CartDrawer />

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          allProducts={products}
          onSelectRelatedProduct={setSelectedProduct}
        />
      )}

      {/* Floating Support WhatsApp Button */}
      <a
        href="https://wa.me/573112812020"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-[#25d366] hover:bg-[#20ba5a] text-white w-14 h-14 rounded-full flex items-center justify-center text-3xl shadow-2xl hover:scale-110 transition-all cursor-pointer"
        aria-label="Chatear en WhatsApp"
      >
        <i className="fab fa-whatsapp"></i>
      </a>

      {/* Footer */}
      <Footer />
      
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
