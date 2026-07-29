import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-navy-950 text-white text-sm py-10 md:py-12 border-t border-navy-900">
      {/* Matches container width max-w-6xl (or max-w-7xl) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
          
          {/* Column 1 – Brand & Legal */}
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-white text-base">Luminex Logistics</h3>
            <p className="text-slate-400 text-xs">© 2026 Luminex Logistics Ltd.</p>
          </div>

          {/* Column 2 – Contact Info */}
          <div className="flex flex-col gap-2">
            <p className="text-slate-300">
              <span className="font-semibold text-white">Accra Head Office:</span><br />
              H302 Sowah Larbi Ave
            </p>
            <p className="text-slate-300">
              <span className="font-semibold text-white">Support:</span> +233 20 000 0000
            </p>
          </div>

          {/* Column 3 – Legal Links */}
          <div className="flex flex-col gap-2">
            <a href="#" className="text-slate-400 hover:text-white transition-colors w-fit">
              Terms of Service
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors w-fit">
              Privacy Policy
            </a>
          </div>

          {/* Column 4 – Social / Connect */}
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-white uppercase text-xs tracking-wider">
              CONNECT WITH US
            </h4>
            <div className="flex items-center gap-4 text-slate-300">
              <a href="#" aria-label="Share" className="hover:text-white transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
                </svg>
              </a>
              <a href="#" aria-label="X (Twitter)" className="hover:text-white transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" aria-label="Globe" className="hover:text-white transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}