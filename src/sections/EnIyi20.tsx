import { Play, ExternalLink } from 'lucide-react';

const songs = [
  {
    id: 1,
    rank: 1,
    artist: 'Grup Evan',
    title: 'Hak Yoldaşın',
    image: '/assets/asset_6.jpg',
  },
  {
    id: 2,
    rank: 2,
    artist: 'NEŞET ERTAŞ',
    title: 'YOLCU',
    image: '/assets/asset_7.jpg',
  },
  {
    id: 3,
    rank: 3,
    artist: 'SELDA BAĞCAN',
    title: 'YAZ GAZETECİ',
    image: '/assets/asset_8.jpg',
  },
  {
    id: 4,
    rank: 4,
    artist: 'AHMET KAYA',
    title: 'SÖYLE',
    image: '/assets/asset_9.jpg',
  },
  {
    id: 5,
    rank: 5,
    artist: 'MUSA EROĞLU',
    title: 'MİHRİBAN',
    image: '/assets/asset_6.jpg',
  },
  {
    id: 6,
    rank: 6,
    artist: 'NURETTİN RENÇBER',
    title: 'AŞK SANA BENZER',
    image: '/assets/asset_7.jpg',
  },
];

export default function EnIyi20() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800 border-b-2 border-red-500 pb-2">
          EN İYİ 20
        </h3>
        <a
          href="#"
          className="text-sm text-sky-600 hover:text-sky-700 flex items-center font-medium"
        >
          TÜM LİSTE / OY VER
          <ExternalLink className="w-4 h-4 ml-1" />
        </a>
      </div>

      <div className="space-y-3">
        {songs.map((song) => (
          <div
            key={song.id}
            className="flex items-center bg-gray-50 hover:bg-gray-100 rounded-lg p-3 transition-colors"
          >
            {/* Rank */}
            <div className="w-8 h-8 bg-sky-500 text-white rounded-full flex items-center justify-center font-bold text-sm mr-3">
              {song.rank}
            </div>

            {/* Album Art */}
            <div className="w-12 h-12 bg-gray-300 rounded overflow-hidden mr-3 flex-shrink-0">
              <img
                src={song.image}
                alt={song.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2UyZThmMCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTAiIGZpbGw9IiM2YjczODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5NdXNpYzwvdGV4dD48L3N2Zz4=';
                }}
              />
            </div>

            {/* Song Info */}
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-gray-800 text-sm truncate">{song.artist}</h4>
              <p className="text-gray-500 text-xs truncate">{song.title}</p>
            </div>

            {/* Play Button */}
            <button className="flex items-center bg-sky-500 hover:bg-sky-600 text-white px-3 py-1.5 rounded-full text-xs font-medium transition-colors">
              <Play className="w-3 h-3 mr-1" />
              DİNLE
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
