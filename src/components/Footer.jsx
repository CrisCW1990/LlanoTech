import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full mt-10 divide-y divide-gray-100 select-none">
      
      {/* Top Helper Badges (Mobile & Desktop) */}
      <div className="bg-white border-t border-gray-100 py-3.5 px-4">
        <div className="max-w-7xl mx-auto flex justify-around items-center text-[0.52rem] md:text-xs font-bold text-brand-dark uppercase tracking-tight gap-1.5 py-1">
          <div className="flex items-center gap-1.5 md:gap-2">
            <svg className="w-4 h-4 text-brand-dark shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <rect x="5" y="11" width="14" height="10" rx="2" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 118 0v4" />
            </svg>
            <span>Compra Segura</span>
          </div>
          
          <div className="h-4 w-[1px] bg-gray-200"></div>

          <div className="flex items-center gap-1.5 md:gap-2">
            <svg className="w-4 h-4 text-brand-dark shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <line x1="3" y1="10" x2="21" y2="10" />
              <line x1="7" y1="15" x2="11" y2="15" />
            </svg>
            <span>Paga al Recibir</span>
          </div>

          <div className="h-4 w-[1px] bg-gray-200"></div>

          <div className="flex items-center gap-1.5 md:gap-2">
            <svg className="w-4 h-4 text-brand-dark shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 18v-6a9 9 0 0118 0v6M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3M3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3" />
            </svg>
            <span>Soporte en Línea</span>
          </div>
        </div>
      </div>

      {/* Main Footer (Dark Premium Background) */}
      <div className="bg-brand-dark text-gray-400 py-10 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col gap-8 md:gap-10">
          
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-left">
            
            {/* Column 1: Logo & Tagline */}
            <div className="space-y-3">
              <div className="flex flex-col items-start select-none">
                <div className="text-xl font-black tracking-tighter text-white leading-none uppercase">
                  LLANO <span className="text-brand-green">TECH</span>
                </div>
                <div className="flex items-center w-full my-1.5 max-w-[140px]">
                  <div className="flex-1 h-[1px] bg-gray-800"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-white mx-1.5"></div>
                  <div className="flex-1 h-[1px] bg-gray-800"></div>
                </div>
                <span className="text-[0.38rem] tracking-[0.2em] font-extrabold text-gray-500 uppercase leading-none">
                  AUTOMATIZACIÓN Y SISTEMAS
                </span>
              </div>
              <p className="text-[11px] text-gray-500 font-medium leading-relaxed max-w-xs">
                Soluciones tecnológicas para tu día a día. Acoplamos lo mejor en accesorios inteligentes, automatización y dispositivos premium.
              </p>
            </div>

            {/* Column 2: WhatsApp Help Banner */}
            <div className="flex items-center">
              <div className="w-full border border-gray-800 bg-[#161f30]/40 rounded-2xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-green text-brand-dark flex items-center justify-center text-xl shrink-0">
                  <i className="fab fa-whatsapp"></i>
                </div>
                <div className="text-xs leading-tight">
                  <span className="text-gray-500 font-bold uppercase tracking-wider block text-[0.6rem]">¿Necesitas ayuda?</span>
                  <a
                    href="https://wa.me/573112812020"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-brand-green font-black block mt-0.5"
                  >
                    311 281 2020
                  </a>
                  <span className="text-[0.6rem] text-gray-400">Escríbenos por WhatsApp</span>
                </div>
              </div>
            </div>

            {/* Column 3: Trust Information */}
            <div className="space-y-3.5 text-xs text-white font-bold flex flex-col justify-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-800 text-brand-green rounded-lg flex items-center justify-center text-sm shrink-0">
                  <i className="fas fa-truck"></i>
                </div>
                <span className="font-semibold text-gray-300">Envíos a toda Colombia</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-800 text-brand-green rounded-lg flex items-center justify-center text-sm shrink-0">
                  <i className="far fa-handshake"></i>
                </div>
                <span className="font-semibold text-gray-300">Paga seguro contra entrega</span>
              </div>
            </div>

            {/* Column 4: Social Links */}
            <div className="space-y-4">
              <h4 className="text-xs font-black text-white uppercase tracking-wider">Síguenos</h4>
              <div className="flex items-center gap-3 text-sm">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-gray-700 bg-transparent text-gray-400 hover:text-brand-green hover:border-brand-green flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-gray-700 bg-transparent text-gray-400 hover:text-brand-green hover:border-brand-green flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-gray-700 bg-transparent text-gray-400 hover:text-brand-green hover:border-brand-green flex items-center justify-center transition-colors"
                  aria-label="TikTok"
                >
                  <i className="fab fa-tiktok"></i>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-gray-700 bg-transparent text-gray-400 hover:text-brand-green hover:border-brand-green flex items-center justify-center transition-colors"
                  aria-label="YouTube"
                >
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>

          </div>

          {/* Under footer Copyright */}
          <div className="border-t border-gray-800 pt-6 text-center text-[10px] text-gray-500 font-semibold flex items-center justify-center gap-1.5 uppercase tracking-widest">
            <i className="fas fa-lock text-[8px]"></i>
            <span>llanotech.digital &copy; 2026 Todos los derechos reservados</span>
          </div>

        </div>
      </div>
      
    </footer>
  );
}
