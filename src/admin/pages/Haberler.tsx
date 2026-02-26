import { useEffect, useState } from 'react';
import { useApi } from '../hooks/useApi';
import { Plus, Edit2, Trash2 } from 'lucide-react';

interface Haber {
  id: string;
  title: string;
  summary: string;
  content: string;
  type: string;
  image?: string;
  createdAt: string;
}

export default function Haberler() {
  const [haberler, setHaberler] = useState<Haber[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingHaber, setEditingHaber] = useState<Haber | null>(null);
  const { get, post, put, del } = useApi();

  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    type: 'all',
    image: ''
  });

  useEffect(() => {
    loadHaberler();
  }, []);

  const loadHaberler = async () => {
    try {
      const data = await get('/haberler');
      setHaberler(data);
    } catch (error) {
      console.error('Haberler yüklenemedi:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingHaber) {
        await put(`/haberler/${editingHaber.id}`, formData);
      } else {
        await post('/haberler', formData);
      }
      
      setShowModal(false);
      setEditingHaber(null);
      setFormData({ title: '', summary: '', content: '', type: 'all', image: '' });
      loadHaberler();
    } catch (error) {
      console.error('Haber kaydedilemedi:', error);
    }
  };

  const handleEdit = (haber: Haber) => {
    setEditingHaber(haber);
    setFormData({
      title: haber.title,
      summary: haber.summary,
      content: haber.content,
      type: haber.type,
      image: haber.image || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu haberi silmek istediğinize emin misiniz?')) return;
    
    try {
      await del(`/haberler/${id}`);
      loadHaberler();
    } catch (error) {
      console.error('Haber silinemedi:', error);
    }
  };

  const handleNew = () => {
    setEditingHaber(null);
    setFormData({ title: '', summary: '', content: '', type: 'all', image: '' });
    setShowModal(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Haberler</h1>
        <button
          onClick={handleNew}
          className="flex items-center px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Yeni Haber
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Başlık</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tür</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tarih</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">İşlemler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {haberler.map((haber) => (
              <tr key={haber.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{haber.title}</div>
                  <div className="text-sm text-gray-500 line-clamp-1">{haber.summary}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    haber.type === 'video' ? 'bg-red-100 text-red-700' :
                    haber.type === 'photo' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {haber.type === 'video' ? 'Video' : haber.type === 'photo' ? 'Foto' : 'Tümü'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(haber.createdAt).toLocaleDateString('tr-TR')}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleEdit(haber)}
                    className="text-blue-600 hover:text-blue-800 mr-3"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(haber.id)}
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
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold">
                {editingHaber ? 'Haber Düzenle' : 'Yeni Haber'}
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Başlık</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Özet</label>
                <textarea
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">İçerik</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                  rows={5}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tür</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="all">Tümü</option>
                    <option value="video">Video</option>
                    <option value="photo">Foto</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Görsel URL</label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                    placeholder="https://..."
                  />
                </div>
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
                  {editingHaber ? 'Güncelle' : 'Kaydet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
