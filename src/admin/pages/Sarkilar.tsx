import { useEffect, useState } from 'react';
import { useApi } from '../hooks/useApi';
import { Plus, Edit2, Trash2 } from 'lucide-react';

interface Sarki {
  id: string;
  rank: number;
  artist: string;
  title: string;
  image?: string;
  audioUrl?: string;
  votes: number;
}

export default function Sarkilar() {
  const [sarkilar, setSarkilar] = useState<Sarki[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingSarki, setEditingSarki] = useState<Sarki | null>(null);
  const { get, post, put, del } = useApi();

  const [formData, setFormData] = useState({
    rank: 1,
    artist: '',
    title: '',
    image: '',
    audioUrl: ''
  });

  useEffect(() => {
    loadSarkilar();
  }, []);

  const loadSarkilar = async () => {
    try {
      const data = await get('/sarkilar');
      setSarkilar(data.sort((a: Sarki, b: Sarki) => a.rank - b.rank));
    } catch (error) {
      console.error('Şarkılar yüklenemedi:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingSarki) {
        await put(`/sarkilar/${editingSarki.id}`, formData);
      } else {
        await post('/sarkilar', formData);
      }
      
      setShowModal(false);
      setEditingSarki(null);
      setFormData({ rank: 1, artist: '', title: '', image: '', audioUrl: '' });
      loadSarkilar();
    } catch (error) {
      console.error('Şarkı kaydedilemedi:', error);
    }
  };

  const handleEdit = (sarki: Sarki) => {
    setEditingSarki(sarki);
    setFormData({
      rank: sarki.rank,
      artist: sarki.artist,
      title: sarki.title,
      image: sarki.image || '',
      audioUrl: sarki.audioUrl || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu şarkıyı silmek istediğinize emin misiniz?')) return;
    
    try {
      await del(`/sarkilar/${id}`);
      loadSarkilar();
    } catch (error) {
      console.error('Şarkı silinemedi:', error);
    }
  };

  const handleNew = () => {
    setEditingSarki(null);
    const nextRank = sarkilar.length > 0 ? Math.max(...sarkilar.map(s => s.rank)) + 1 : 1;
    setFormData({ rank: nextRank, artist: '', title: '', image: '', audioUrl: '' });
    setShowModal(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">En İyi 20</h1>
        <button
          onClick={handleNew}
          className="flex items-center px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Yeni Şarkı
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sıra</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sanatçı</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Şarkı</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Oy</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">İşlemler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sarkilar.map((sarki) => (
              <tr key={sarki.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <span className="w-8 h-8 bg-sky-500 text-white rounded-full flex items-center justify-center font-bold">
                    {sarki.rank}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    {sarki.image && (
                      <img 
                        src={sarki.image} 
                        alt={sarki.artist}
                        className="w-10 h-10 rounded object-cover mr-3"
                      />
                    )}
                    <span className="font-medium text-gray-900">{sarki.artist}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-700">{sarki.title}</td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-500">{sarki.votes || 0} oy</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleEdit(sarki)}
                    className="text-blue-600 hover:text-blue-800 mr-3"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(sarki.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-lg">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold">
                {editingSarki ? 'Şarkı Düzenle' : 'Yeni Şarkı'}
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sıra</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={formData.rank}
                    onChange={(e) => setFormData({ ...formData, rank: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sanatçı</label>
                  <input
                    type="text"
                    value={formData.artist}
                    onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Şarkı Adı</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Albüm Kapağı URL</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ses Dosyası URL</label>
                <input
                  type="text"
                  value={formData.audioUrl}
                  onChange={(e) => setFormData({ ...formData, audioUrl: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                  placeholder="https://..."
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600"
                >
                  {editingSarki ? 'Güncelle' : 'Kaydet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
