import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const programcilar = [
  {
    id: 1,
    name: 'Bawo Hızır',
    program: 'Gahi Saz Gahi Söz',
    image: '/assets/asset_1.jpg',
  },
  {
    id: 2,
    name: 'Ali Celik',
    program: 'Programcı',
    image: '/assets/asset_2.jpg',
  },
  {
    id: 3,
    name: 'Koma Zarin',
    program: 'Programcı',
    image: '/assets/asset_3.jpg',
  },
  {
    id: 4,
    name: 'OZOCAN',
    program: 'Programcı',
    image: '/assets/asset_4.jpg',
  },
  {
    id: 5,
    name: 'iLHAN ÖRNEK',
    program: 'Programcı',
    image: '/assets/asset_5.jpg',
  },
  {
    id: 6,
    name: 'Fidan Celik',
    program: 'Programcı',
    image: '/assets/asset_1.jpg',
  },
];

export default function Programcilar() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 250;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <section id="programcilar" className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800 border-b-2 border-red-500 pb-1">
          PROGRAMCILAR
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              canScrollLeft
                ? 'bg-sky-500 text-white hover:bg-sky-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              canScrollRight
                ? 'bg-sky-500 text-white hover:bg-sky-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {programcilar.map((programci) => (
          <div
            key={programci.id}
            className="flex-shrink-0 w-48 bg-white rounded-lg shadow-md overflow-hidden program-card cursor-pointer"
          >
            <div className="relative h-48 bg-gray-200">
              <img
                src={programci.image}
                alt={programci.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTJyOCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM2YjczODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5SZXNpbTwvdGV4dD48L3N2Zz4=';
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-[8px] font-bold text-sky-600">RADYO</div>
                      <div className="text-xs font-black text-red-600">YOL</div>
                    </div>
                  </div>
                  <span className="text-white text-xs font-medium">DİNLİYORUM</span>
                </div>
              </div>
            </div>
            <div className="p-3 text-center">
              <h3 className="font-bold text-gray-800 text-sm">{programci.name}</h3>
              <p className="text-gray-500 text-xs">{programci.program}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
