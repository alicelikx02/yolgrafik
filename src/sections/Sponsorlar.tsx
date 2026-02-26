import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const sponsors = [
  { id: 1, name: 'Reklam 1', color: 'bg-blue-500' },
  { id: 2, name: 'Reklam 2', color: 'bg-green-500' },
  { id: 3, name: 'Reklam 3', color: 'bg-purple-500' },
  { id: 4, name: 'Reklam 4', color: 'bg-orange-500' },
  { id: 5, name: 'Reklam 5', color: 'bg-pink-500' },
];

export default function Sponsorlar() {
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
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <section className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800 border-b-2 border-red-500 pb-1">
          SPONSORLARIMIZ
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
        {sponsors.map((sponsor) => (
          <a
            key={sponsor.id}
            href="http://radyoyol.com.tr/"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex-shrink-0 w-40 h-32 ${sponsor.color} rounded-lg shadow-md flex items-center justify-center text-white font-bold text-lg hover:opacity-90 transition-opacity`}
          >
            {sponsor.name}
          </a>
        ))}
      </div>
    </section>
  );
}
