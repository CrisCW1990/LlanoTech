import React from 'react';

export default function InfoBadges() {
  return (
    <section className="bg-transparent md:bg-white md:rounded-2xl border-none md:border md:border-gray-100 md:shadow-sm py-2 px-1 md:p-6 select-none">
      {/* Mobile Grid (3 columns with vertical separators) */}
      <div className="flex items-center justify-between md:hidden gap-1 text-[0.6rem] py-1">
        {/* Quality */}
        <div className="flex-1 flex items-center justify-center gap-1.5 text-left">
          <svg className="w-6 h-6 text-brand-dark shrink-0" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <div className="leading-tight">
            <h4 className="text-[0.45rem] font-bold text-brand-dark uppercase tracking-tight leading-tight">
              PRODUCTOS <br /> DE CALIDAD
            </h4>
            <p className="text-[0.38rem] text-gray-400 font-medium leading-tight">Garantía garantizada</p>
          </div>
        </div>

        {/* Separator */}
        <div className="h-8 w-[1px] bg-gray-200 shrink-0"></div>

        {/* Shipping */}
        <div className="flex-1 flex items-center justify-center gap-1.5 text-left pl-1">
          <svg className="w-6 h-6 text-brand-dark shrink-0" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.12-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124l-.84-11.24A1.125 1.125 0 0020.25 4.5H16.5V18.75h-2.25m-1.5-10.5H8.25v10.5M6.75 7.5h.008v.008H6.75V7.5zm0 3h.008v.008H6.75v-.008zm0 3h.008v.008H6.75v-.008z" />
          </svg>
          <div className="leading-tight">
            <h4 className="text-[0.45rem] font-bold text-brand-dark uppercase tracking-tight leading-tight">
              ENVÍOS <br /> RÁPIDOS
            </h4>
            <p className="text-[0.38rem] text-gray-400 font-medium leading-tight">A todo Colombia</p>
          </div>
        </div>

        {/* Separator */}
        <div className="h-8 w-[1px] bg-gray-200 shrink-0"></div>

        {/* Service */}
        <div className="flex-1 flex items-center justify-center gap-1.5 text-left pl-1">
          <svg className="w-6 h-6 text-brand-dark shrink-0" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.1.104.148.252.125.397L4.75 21l3.375-.75c.108-.024.22-.016.32.023A8.934 8.934 0 0012 20.25z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 9.5a1.5 1.5 0 00-1.5 1.5c0 2.5 2 4.5 4.5 4.5a1.5 1.5 0 001.5-1.5v-1l-1.5-.5-.75.75c-.5-.25-1-.75-1.25-1.25l.75-.75-.5-1.5h-1z" />
          </svg>
            <div className="leading-tight">
              <h4 className="text-[0.45rem] font-bold text-brand-dark uppercase tracking-tight leading-tight">
                ATENCIÓN <br /> PERSONALIZADA
              </h4>
              <p className="text-[0.38rem] text-gray-400 font-medium leading-tight">Escríbenos</p>
            </div>
        </div>
      </div>

      {/* Desktop Grid (4 columns) */}
      <div className="hidden md:grid grid-cols-4 gap-4 divide-x divide-gray-100">
        
        <div className="flex items-center gap-3 justify-center px-2">
          <div className="w-10 h-10 rounded-xl bg-green-50 text-brand-green flex items-center justify-center text-lg shrink-0">
            <i className="fas fa-shield-alt"></i>
          </div>
          <div className="text-left">
            <h4 className="text-xs font-black text-brand-dark uppercase tracking-wide">Garantía</h4>
            <p className="text-[0.7rem] text-gray-500 font-medium leading-none">Productos de calidad</p>
          </div>
        </div>

        <div className="flex items-center gap-3 justify-center px-2">
          <div className="w-10 h-10 rounded-xl bg-green-50 text-brand-green flex items-center justify-center text-lg shrink-0">
            <i className="fas fa-truck"></i>
          </div>
          <div className="text-left">
            <h4 className="text-xs font-black text-brand-dark uppercase tracking-wide">Envíos Nacionales</h4>
            <p className="text-[0.7rem] text-gray-500 font-medium leading-none">A toda Colombia</p>
          </div>
        </div>

        <div className="flex items-center gap-3 justify-center px-2">
          <div className="w-10 h-10 rounded-xl bg-green-50 text-brand-green flex items-center justify-center text-lg shrink-0">
            <i className="fas fa-lock"></i>
          </div>
          <div className="text-left">
            <h4 className="text-xs font-black text-brand-dark uppercase tracking-wide">Compra Segura</h4>
            <p className="text-[0.7rem] text-gray-500 font-medium leading-none">Tus datos protegidos</p>
          </div>
        </div>

        <div className="flex items-center gap-3 justify-center px-2">
          <div className="w-10 h-10 rounded-xl bg-green-50 text-brand-green flex items-center justify-center text-lg shrink-0">
            <i className="fas fa-headset"></i>
          </div>
          <div className="text-left">
            <h4 className="text-xs font-black text-brand-dark uppercase tracking-wide">Atención Personalizada</h4>
            <p className="text-[0.7rem] text-gray-500 font-medium leading-none">Escríbenos por WhatsApp</p>
          </div>
        </div>

      </div>
    </section>
  );
}
