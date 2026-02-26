import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

const navItems = [
  { label: 'KURUMSAL', href: '#', hasDropdown: true },
  { label: 'PROGRAMCILAR', href: '#programcilar' },
  { label: 'YAYIN AKIŞI', href: '#' },
  { label: 'HABERLER', href: '#haberler' },
  { label: 'GALERİ', href: '#', hasDropdown: true },
  { label: 'BİZE ULAŞIN', href: '#iletisim' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-sky-500 to-sky-600 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                <div className="text-center">
                  <div className="text-xs font-bold text-sky-600">RADYO</div>
                  <div className="text-2xl font-black text-red-600">YOL</div>
                </div>
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="text-white text-sm leading-tight">
                <div className="font-bold">Türkülerin</div>
                <div className="font-bold">Susmayan Sesi</div>
              </div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center px-4 py-2 text-white font-medium text-sm hover:bg-white/10 rounded transition-colors"
              >
                {item.label}
                {item.hasDropdown && <ChevronDown className="w-4 h-4 ml-1" />}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:bg-white/10 rounded"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden pb-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center justify-between px-4 py-3 text-white font-medium hover:bg-white/10 rounded transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
                {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
