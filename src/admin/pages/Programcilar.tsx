import { useEffect, useState } from 'react';
import { useApi } from '../hooks/useApi';
import { Plus, Edit2, Trash2 } from 'lucide-react';

interface Programci {
  id: string;
  name: string;
  program: string;
  image?: string;
  bio?: string;
  social?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
  };
}

export default function Programcilar() {
  const [programcilar, setProgramcilar] = useState<Programci[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProgramci, setEditingProgramci] = useState<Programci | null>(null);
  const { get, post, put, del } = useApi();

  const [formData, setFormData] = useState<{
    name: string;
    program: string;
    image: string;
    bio: string;
    social: { facebook?: string; twitter?: string; instagram?: string };
  }>({
    name: '',
    program: '',
    image: '',
    bio: '',
    social: { facebook: '', twitter: '', instagram: '' }
  });

  useEffect(() => {
    loadProgramcilar();
  }, []);

  const loadProgramcilar = async () => {
    try {
      const data = await get('/programcilar');
      setProgramcilar(data);
    } catch (error) {
      console.error('Programcılar yüklenemedi:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingProgramci) {
        await put(`/programcilar/${editingProgramci.id}`, formData);
      } else {
        await post('/programcilar', formData);
      }
      
      setShowModal(false);
      setEditingProgramci(null);
      setFormData({ name: '', program: '', image: '', bio: '', social: { facebook: '', twitter: '', instagram: '' } });
      loadProgramcilar();
    } catch (error) {
      console.error('Programcı kaydedilemedi:', error);
    }
  };

  const handleEdit = (programci: Programci) => {
    setEditingProgramci(programci);
    setFormData({
      name: programci.name,
      program: programci.program,
      image: programci.image || '',
      bio: programci.bio || '',
      social: programci.social || { facebook: '', twitter: '', instagram: '' }
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu programcıyı silmek istediğinize emin misiniz?')) return;
    
    try {
      await del(`/programcilar/${id}`);
      loadProgramcilar();
    } catch (error) {
      console.error('Programcı silinemedi:', error);
    }
  };

  const handleNew = () => {
    setEditingProgramci(null);
    setFormData({ name: '', program: '', image: '', bio: '', social: { facebook: '', twitter: '', instagram: '' } });
    setShowModal(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Programcılar</h1>
        <button
          onClick={handleNew}
          className="flex items-center px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Yeni Programcı
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programcilar.map((programci) => (
          <div key={programci.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="h-48 bg-gray-200 relative">
              {programci.image ? (
                <img 
                  src={programci.image} 
                  alt={programci.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-sky-400 to-sky-600">
                  <div className="text-center text-white">
                    <div className="text-xs font-bold">RADYO</div>
                    <div className="text-2xl font-black">YOL</div>
                  </div>
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg text-gray-800">{programci.name}</h3>
              <p className="text-gray-500 text-sm">{programci.program}</p>
              
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  onClick={() => handleEdit(programci)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(programci.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold">
                {editingProgramci ? 'Programcı Düzenle' : 'Yeni Programcı'}
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">İsim</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Program</label>
                <input
                  type="text"
                  value={formData.program}
                  onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fotoğraf URL</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Biyografi</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                  rows={3}
                />
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-700 mb-2">Sosyal Medya</h4>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={formData.social.facebook}
                    onChange={(e) => setFormData({ ...formData, social: { ...formData.social, facebook: e.target.value } })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                    placeholder="Facebook URL"
                  />
                  <input
                    type="text"
                    value={formData.social.twitter}
                    onChange={(e) => setFormData({ ...formData, social: { ...formData.social, twitter: e.target.value } })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                    placeholder="Twitter URL"
                  />
                  <input
                    type="text"
                    value={formData.social.instagram}
                    onChange={(e) => setFormData({ ...formData, social: { ...formData.social, instagram: e.target.value } })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                    placeholder="Instagram URL"
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
                  {editingProgramci ? 'Güncelle' : 'Kaydet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
