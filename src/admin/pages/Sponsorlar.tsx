import { useEffect, useState } from 'react';
import { useApi } from '../hooks/useApi';
import { Plus, Edit2, Trash2, ExternalLink } from 'lucide-react';

interface Sponsor {
  id: string;
  name: string;
  image?: string;
  url?: string;
  color: string;
  active: boolean;
}

const colors = [
  { value: 'bg-blue-500', label: 'Mavi' },
  { value: 'bg-green-500', label: 'Yeşil' },
  { value: 'bg-purple-500', label: 'Mor' },
  { value: 'bg-orange-500', label: 'Turuncu' },
  { value: 'bg-pink-500', label: 'Pembe' },
  { value: 'bg-red-500', label: 'Kırmızı' },
  { value: 'bg-yellow-500', label: 'Sarı' },
  { value: 'bg-gray-500', label: 'Gri' },
];

export default function Sponsorlar() {
  const [sponsorlar, setSponsorlar] = useState<Sponsor[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingSponsor, setEditingSponsor] = useState<Sponsor | null>(null);
  const { get, post, put, del } = useApi();

  const [formData, setFormData] = useState({
    name: '',
    image: '',
    url: '',
    color: 'bg-blue-500',
    active: true
  });

  useEffect(() => {
    loadSponsorlar();
  }, []);

  const loadSponsorlar = async () => {
    try {
      const data = await get('/sponsorlar');
      setSponsorlar(data);
    } catch (error) {
      console.error('Sponsorlar yüklenemedi:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingSponsor) {
        await put(`/sponsorlar/${editingSponsor.id}`, formData);
      } else {
        await post('/sponsorlar', formData);
      }
      
      setShowModal(false);
      setEditingSponsor(null);
      setFormData({ name: '', image: '', url: '', color: 'bg-blue-500', active: true });
      loadSponsorlar();
    } catch (error) {
      console.error('Sponsor kaydedilemedi:', error);
    }
  };

  const handleEdit = (sponsor: Sponsor) => {
    setEditingSponsor(sponsor);
    setFormData({
      name: sponsor.name,
      image: sponsor.image || '',
      url: sponsor.url || '',
      color: sponsor.color || 'bg-blue-500',
      active: sponsor.active
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu sponsoru silmek istediğinize emin misiniz?')) return;
    
    try {
      await del(`/sponsorlar/${id}`);
      loadSponsorlar();
    } catch (error) {
      console.error('Sponsor silinemedi:', error);
    }
  };

  const handleNew = () => {
    setEditingSponsor(null);
    setFormData({ name: '', image: '', url: '', color: 'bg-blue-500', active: true });
    setShowModal(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Sponsorlar</h1>
        <button
          onClick={handleNew}
          className="flex items-center px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Yeni Sponsor
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sponsorlar.map((sponsor) => (
          <div 
            key={sponsor.id} 
            className={`relative rounded-xl shadow-sm overflow-hidden ${sponsor.color} ${!sponsor.active && 'opacity-50'}`}
          >
            <div className="h-32 flex items-center justify-center text-white font-bold text-lg p-4 text-center">
              {sponsor.name}
            </div>
            
            <div className="absolute top-2 right-2 flex space-x-1">
              <button
                onClick={() => handleEdit(sponsor)}
                className="p-1.5 bg-white/20 hover:bg-white/30 rounded text-white"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(sponsor.id)}
                className="p-1.5 bg-white/20 hover:bg-white/30 rounded text-white"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {sponsor.url && (
              <a 
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-2 right-2 p-1.5 bg-white/20 hover:bg-white/30 rounded text-white"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-lg">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold">
                {editingSponsor ? 'Sponsor Düzenle' : 'Yeni Sponsor'}
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sponsor Adı</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                  required
                />
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Website URL</label>
                <input
                  type="text"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Renk</label>
                <div className="grid grid-cols-4 gap-2">
                  {colors.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, color: color.value })}
                      className={`p-3 rounded-lg ${color.value} text-white text-xs font-medium ${
                        formData.color === color.value ? 'ring-2 ring-offset-2 ring-gray-400' : ''
                      }`}
                    >
                      {color.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="active"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="w-4 h-4 text-sky-500 border-gray-300 rounded focus:ring-sky-500"
                />
                <label htmlFor="active" className="ml-2 text-sm text-gray-700">
                  Aktif
                </label>
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
                  {editingSponsor ? 'Güncelle' : 'Kaydet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
