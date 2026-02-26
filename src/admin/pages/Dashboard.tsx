import { useEffect, useState } from 'react';
import { useApi } from '../hooks/useApi';
import { 
  Newspaper, 
  Users, 
  Music, 
  Building2,
  Eye
} from 'lucide-react';

interface Stats {
  haberSayisi: number;
  programciSayisi: number;
  sarkiSayisi: number;
  sponsorSayisi: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    haberSayisi: 0,
    programciSayisi: 0,
    sarkiSayisi: 0,
    sponsorSayisi: 0
  });
  const { get } = useApi();

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [haberler, programcilar, sarkilar, sponsorlar] = await Promise.all([
        get('/haberler'),
        get('/programcilar'),
        get('/sarkilar'),
        get('/sponsorlar')
      ]);

      setStats({
        haberSayisi: haberler.length,
        programciSayisi: programcilar.length,
        sarkiSayisi: sarkilar.length,
        sponsorSayisi: sponsorlar.length
      });
    } catch (error) {
      console.error('İstatistikler yüklenemedi:', error);
    }
  };

  const statCards = [
    { 
      title: 'Haberler', 
      value: stats.haberSayisi, 
      icon: Newspaper, 
      color: 'bg-blue-500',
      link: '/admin/haberler'
    },
    { 
      title: 'Programcılar', 
      value: stats.programciSayisi, 
      icon: Users, 
      color: 'bg-green-500',
      link: '/admin/programcilar'
    },
    { 
      title: 'Şarkılar', 
      value: stats.sarkiSayisi, 
      icon: Music, 
      color: 'bg-purple-500',
      link: '/admin/sarkilar'
    },
    { 
      title: 'Sponsorlar', 
      value: stats.sponsorSayisi, 
      icon: Building2, 
      color: 'bg-orange-500',
      link: '/admin/sponsorlar'
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card) => (
          <div 
            key={card.title}
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{card.title}</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{card.value}</p>
              </div>
              <div className={`${card.color} p-3 rounded-lg`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Hızlı Erişim</h2>
          <div className="space-y-2">
            <a 
              href="/admin/haberler/yeni" 
              className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Newspaper className="w-5 h-5 text-blue-500 mr-3" />
              <span>Yeni Haber Ekle</span>
            </a>
            <a 
              href="/admin/programcilar/yeni" 
              className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Users className="w-5 h-5 text-green-500 mr-3" />
              <span>Yeni Programcı Ekle</span>
            </a>
            <a 
              href="/admin/sarkilar/yeni" 
              className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Music className="w-5 h-5 text-purple-500 mr-3" />
              <span>Yeni Şarkı Ekle</span>
            </a>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Siteyi Görüntüle</h2>
          <p className="text-gray-500 mb-4">
            Ana siteyi yeni bir sekmede açarak değişiklikleri görebilirsiniz.
          </p>
          <a 
            href="/" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
          >
            <Eye className="w-5 h-5 mr-2" />
            Siteyi Aç
          </a>
        </div>
      </div>
    </div>
  );
}
