import { useState, useEffect } from 'react';
import { Apple, Play, Radio, Headphones, Volume2, Music, Facebook, Twitter, Youtube, Instagram } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: 'YOL GRAFİK',
    subtitle: 'TASARIM MATBAA',
    services: ['İş Elbiseleri', 'Kartvizit', 'El İlanı', 'Davetiye', 'Katalog', 'Broşür', 'Afiş', 'Dergi'],
    contact: '+49 176 2005 91 61',
    contact2: '+49 163 599 34 39',
    email: 'yolgrafik4@gmail.com',
  },
  {
    id: 2,
    title: 'RADYO YOL',
    subtitle: 'Türkülerin Susmayan Sesi',
    services: ['Canlı Yayın', 'Programlar', 'İstekler', 'Etkinlikler'],
    contact: 'radyoyol.de',
    contact2: '',
    email: 'info@radyoyol.de',
  },
];

const platforms = [
  { name: 'Winamp', icon: <Music className="w-5 h-5" />, url: 'http://51.77.72.72:5932/stream' },
  { name: 'iTunes', icon: <Headphones className="w-5 h-5" />, url: 'http://r1.comcities.com:7100/stream' },
  { name: 'VLC', icon: <Volume2 className="w-5 h-5" />, url: 'http://r1.comcities.com:7100/stream' },
  { name: 'RealPlayer', icon: <Radio className="w-5 h-5" />, url: 'https://eu2-centova.serverse.com:2199/tunein/radyoyol.ram' },
];

export default function MainContent() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      {/* Left Ad Banner */}
      <div className="lg:col-span-2 hidden lg:block">
        <div className="bg-red-600 rounded-lg overflow-hidden shadow-lg h-full">
          <div className="p-4 text-center">
            <div className="text-4xl font-black text-white">YOL</div>
            <div className="text-xl font-bold text-white">Tekstil</div>
          </div>
          <div className="bg-white mx-4 rounded-lg p-2">
            <div className="bg-green-500 h-32 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">YOL Tekstil</span>
            </div>
          </div>
          <div className="p-4 text-white text-center text-sm">
            <p className="font-bold">Döner Kebap</p>
            <p>Kaliteli İş Elbiseleri</p>
            <p>özenle hazırlanır</p>
            <p className="mt-2 font-bold">+49 176 459 76 991</p>
          </div>
          <div className="p-4 text-white text-center text-sm border-t border-red-500">
            <p>işyerinizin</p>
            <p className="font-bold">logolu</p>
            <p>tişörtü olsun</p>
          </div>
        </div>
      </div>

      {/* Main Slider */}
      <div className="lg:col-span-5">
        <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden shadow-lg h-80">
          {/* Slide Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white">
            <div className="w-24 h-24 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center mb-4 shadow-xl">
              <div className="text-center">
                <div className="text-xs font-bold">YOL</div>
                <div className="text-lg font-black">GRAFİK</div>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-1">{slides[currentSlide].title}</h3>
            <p className="text-sm text-gray-300 mb-4">{slides[currentSlide].subtitle}</p>
            
            <div className="grid grid-cols-4 gap-2 mb-4">
              {slides[currentSlide].services.map((service, idx) => (
                <span key={idx} className="px-2 py-1 bg-gray-700 rounded text-xs text-center">
                  {service}
                </span>
              ))}
            </div>
            
            <div className="text-center text-sm">
              <p className="text-yellow-400 font-bold">WEB TASARIM</p>
              {slides[currentSlide].contact && (
                <p className="mt-2">{slides[currentSlide].contact}</p>
              )}
              {slides[currentSlide].contact2 && (
                <p>{slides[currentSlide].contact2}</p>
              )}
              <p className="text-gray-400">{slides[currentSlide].email}</p>
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentSlide === index ? 'bg-sky-500' : 'bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Apps & Live */}
      <div className="lg:col-span-3">
        <div className="bg-gradient-to-br from-sky-400 to-sky-600 rounded-lg shadow-lg p-4 h-full">
          {/* Mobile Apps */}
          <div className="mb-6">
            <h4 className="text-white font-bold text-sm mb-3">MOBİL UYGULAMALAR</h4>
            <div className="space-y-2">
              <a
                href="https://apps.apple.com/de/app/radyo-yol/id6446981658"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center bg-white/20 hover:bg-white/30 rounded-lg px-4 py-2 transition-colors"
              >
                <Apple className="w-5 h-5 text-white mr-3" />
                <span className="text-white text-sm font-medium">İOS UYGULAMASI</span>
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=radyoyol.com.tr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center bg-white/20 hover:bg-white/30 rounded-lg px-4 py-2 transition-colors"
              >
                <Play className="w-5 h-5 text-white mr-3" />
                <span className="text-white text-sm font-medium">ANDROİD UYGULAMASI</span>
              </a>
            </div>
          </div>

          {/* Logo */}
          <div className="flex justify-center my-6">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
              <div className="text-center">
                <div className="text-xs font-bold text-sky-600">RADYO</div>
                <div className="text-2xl font-black text-red-600">YOL</div>
              </div>
            </div>
          </div>

          {/* Live Stream */}
          <div className="text-center mb-6">
            <h4 className="text-white font-bold text-sm mb-2">CANLI YAYIN</h4>
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2 rounded-full flex items-center mx-auto transition-colors">
              <Play className="w-4 h-4 mr-2" />
              DİNLE
            </button>
            <button className="mt-2 text-white text-sm hover:underline">
              İSTEK YAP
            </button>
          </div>

          {/* Other Platforms */}
          <div>
            <h4 className="text-white font-bold text-sm mb-3">DİĞER PLATFORMLAR</h4>
            <div className="flex justify-center space-x-3">
              {platforms.map((platform) => (
                <a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center text-white transition-colors"
                  title={platform.name}
                >
                  {platform.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Social Media */}
          <div className="flex justify-center space-x-3 mt-4">
            <a href="https://www.facebook.com/radyoyol.com.tr" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://twitter.com/radyoyol" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-sky-400 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="https://www.youtube.com/channel/UCqx8JAMQxcvKWvPLY3To1-Q" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
              <Youtube className="w-4 h-4" />
            </a>
            <a href="https://www.instagram.com/radyoyol" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Right Ad Banner */}
      <div className="lg:col-span-2 hidden lg:block">
        <div className="bg-red-600 rounded-lg overflow-hidden shadow-lg h-full">
          <div className="p-4 text-center">
            <div className="text-4xl font-black text-white">YOL</div>
            <div className="text-xl font-bold text-white">Tekstil</div>
          </div>
          <div className="bg-white mx-4 rounded-lg p-2">
            <div className="bg-green-500 h-32 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">YOL Tekstil</span>
            </div>
          </div>
          <div className="p-4 text-white text-center text-sm">
            <p className="font-bold">Döner Kebap</p>
            <p>Kaliteli İş Elbiseleri</p>
            <p>özenle hazırlanır</p>
            <p className="mt-2 font-bold">+49 176 459 76 991</p>
          </div>
          <div className="p-4 text-white text-center text-sm border-t border-red-500">
            <p>işyerinizin</p>
            <p className="font-bold">logolu</p>
            <p>tişörtü olsun</p>
          </div>
        </div>
      </div>
    </div>
  );
}
