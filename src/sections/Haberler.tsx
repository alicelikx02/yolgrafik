import { useState } from 'react';
import { Calendar, Video, Image, List } from 'lucide-react';

const news = [
  {
    id: 1,
    title: 'RadyoYol DAYANISMA GECESi 8 Ekim Pazar',
    summary: '8 ekim de Londra da RADYO YOL dayanışma gecesinde buluşuyoruz. Birbirinden değerli sanatçıların sahne alacağı bu şöleni kaçırmayın canlı sahneleri ile YARIM ASIRLIK EFSANE FERHAT TUNÇ /ESKİ BİR ÇINAR ALİ ASKER /YENİ ÇAĞI ESKİ ÇAĞIN MÜZİĞİ İLE YENİLİKÇİ OLARAK BULUŞTURAN ANADOLU RACK ES...',
    date: '2023-08-29 23:13:36',
    type: 'all',
  },
  {
    id: 2,
    title: 'ASİMİLASYON VE RAMAZAN CEM\'İ HAKKINDA.',
    summary: 'GENELGE:2023/1\nKONU: ASİMİLASYON VE RAMAZAN CEM\'İ HAKKINDA.\nAlevi Bektaşi Federasyonu bileşenlerinin dikkatine;\nÖzellikle son yıllarda inancımıza ait olmayan bir takım ibadet ritüelleri halkımıza dayatılmaktadır. Asimilasyondan başka hiçbir hedefi olmayan bu tür faaliyetlere katılmak, izin vermek Alevi inancını yok etmeye...',
    date: '2023-04-20 00:31:10',
    type: 'all',
  },
  {
    id: 3,
    title: 'Radyo Yol Yeni Frekansında',
    summary: 'Radyo Yol yeni frekansında yayın hayatına devam ediyor. Türkülerin susmayan sesi olarak sizlerle olmaya devam ediyoruz...',
    date: '2023-03-15 14:22:00',
    type: 'video',
  },
  {
    id: 4,
    title: 'Yeni Programcılarımız',
    summary: 'Radyo Yol ailesine katılan yeni programcılarımızla tanışın. Onların hazırladığı programlarla türkü dünyasına yolculuk edin...',
    date: '2023-02-10 10:00:00',
    type: 'photo',
  },
];

type TabType = 'all' | 'video' | 'photo';

export default function Haberler() {
  const [activeTab, setActiveTab] = useState<TabType>('all');

  const tabs = [
    { id: 'video' as TabType, label: 'VİDEO', icon: Video },
    { id: 'photo' as TabType, label: 'FOTO', icon: Image },
    { id: 'all' as TabType, label: 'TÜMÜ', icon: List },
  ];

  const filteredNews = activeTab === 'all' 
    ? news 
    : news.filter(item => item.type === activeTab || item.type === 'all');

  return (
    <section id="haberler" className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800 border-b-2 border-red-500 pb-1">
          HABERLER
        </h2>
        <div className="flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-sky-500 text-white'
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4 mr-1" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredNews.map((item) => (
          <article
            key={item.id}
            className="news-card p-4 cursor-pointer"
          >
            <h3 className="font-bold text-gray-800 mb-2 line-clamp-2">
              {item.title}
            </h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-3 whitespace-pre-line">
              {item.summary}
            </p>
            <div className="flex items-center text-gray-400 text-xs">
              <Calendar className="w-4 h-4 mr-1" />
              {item.date}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
