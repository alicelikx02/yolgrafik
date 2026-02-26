import { Phone, MessageCircle, Facebook, Twitter, Youtube, Instagram, Play, Apple } from 'lucide-react';
import type { SiteAyarlar } from '../App';

const footerLinks = [
  { label: 'ANASAYFA', href: '/' },
  { label: 'PROGRAMCILAR', href: '#programcilar' },
  { label: 'YAYIN AKIŞI', href: '#' },
  { label: 'HABERLER', href: '#haberler' },
  { label: 'İLETİŞİM', href: '#iletisim' },
];

interface FooterProps {
  ayarlar?: SiteAyarlar | null;
}

export default function Footer({ ayarlar }: FooterProps) {
  const socialLinks = [
    { icon: Facebook, href: ayarlar?.facebookUrl || 'https://www.facebook.com/radyoyol.com.tr' },
    { icon: Twitter, href: ayarlar?.twitterUrl || 'https://twitter.com/radyoyol' },
    { icon: Youtube, href: ayarlar?.youtubeUrl || 'https://www.youtube.com/channel/UCqx8JAMQxcvKWvPLY3To1-Q' },
    { icon: Instagram, href: ayarlar?.instagramUrl || 'https://www.instagram.com/radyoyol' },
  ];

  return (
    <footer id="iletisim" className="bg-gradient-to-r from-sky-500 to-sky-600 mt-8">
      {/* Top Section */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Contact */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-white">
              <Phone className="w-5 h-5 mr-2" />
              <span className="font-medium">{ayarlar?.telefon || 'Telefon'}</span>
            </div>
            <a
              href={`https://api.whatsapp.com/send?phone=${ayarlar?.whatsapp || '+4917620059161'}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-white hover:text-green-300 transition-colors"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              <span className="font-medium">WhatsApp</span>
            </a>
          </div>

          {/* Logo */}
          <a href="/" className="flex items-center">
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg">
              <div className="text-center">
                <div className="text-[10px] font-bold text-sky-600">RADYO</div>
                <div className="text-xl font-black text-red-600">YOL</div>
              </div>
            </div>
          </a>

          {/* Social & Apps */}
          <div className="flex items-center space-x-3">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
            <a
              href="https://play.google.com/store/apps/details?id=radyoyol.com.tr"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
            >
              <Play className="w-5 h-5" />
            </a>
            <a
              href="https://apps.apple.com/de/app/radyo-yol/id6446981658"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
            >
              <Apple className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-t border-white/20">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex flex-wrap justify-center gap-4 md:gap-8">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white hover:text-sky-200 text-sm font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="text-center text-white/80 text-sm">
            <p className="mb-2">
              © Copyright{' '}
              <a href="/" className="text-white hover:underline">
                Tüm Hakları Saklıdır.
              </a>
            </p>
            <p>
              <a href="/" className="text-white hover:underline font-medium">
                {ayarlar?.siteBaslik || 'Radyo Yol Türkülerin Susmayan Sesi'}
              </a>
            </p>
            <p className="mt-2 text-xs text-white/60">
              Web Sitemizi Tasdix ile tasdiklenmiştir. Herhangi bir şekilde kopyalanması, 
              çoğaltılması ve dağıtılması halinde yasal haklarımız işletilecektir.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
