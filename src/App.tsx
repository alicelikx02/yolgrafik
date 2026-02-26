import { useState, useEffect } from 'react';
import './App.css';
import Header from './sections/Header';
import RadioPlayer from './sections/RadioPlayer';
import MainContent from './sections/MainContent';
import Programcilar from './sections/Programcilar';
import EnIyi20 from './sections/EnIyi20';
import Haberler from './sections/Haberler';
import Sponsorlar from './sections/Sponsorlar';
import Footer from './sections/Footer';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export interface SiteAyarlar {
  siteBaslik: string;
  radyoStreamUrl: string;
  facebookUrl: string;
  twitterUrl: string;
  youtubeUrl: string;
  instagramUrl: string;
  whatsapp: string;
  telefon: string;
}

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [ayarlar, setAyarlar] = useState<SiteAyarlar | null>(null);

  useEffect(() => {
    loadAyarlar();
  }, []);

  const loadAyarlar = async () => {
    try {
      const response = await fetch(`${API_URL}/ayarlar`);
      if (response.ok) {
        const data = await response.json();
        setAyarlar(data);
      }
    } catch (error) {
      console.error('Ayarlar yüklenemedi:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 via-sky-500 to-sky-600">
      <Header />
      <RadioPlayer 
        isPlaying={isPlaying} 
        setIsPlaying={setIsPlaying}
        streamUrl={ayarlar?.radyoStreamUrl}
      />
      <main className="container mx-auto px-4 py-6">
        <MainContent />
        <Programcilar />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h3 className="text-lg font-bold text-gray-800 border-b-2 border-red-500 pb-2 mb-4">
                FACEBOOK SAYFAMIZ
              </h3>
              <div className="bg-gray-100 h-80 flex items-center justify-center rounded">
                <div className="text-center text-gray-500">
                  <svg className="w-16 h-16 mx-auto mb-2 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <p>Facebook Sayfası</p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <EnIyi20 />
          </div>
        </div>
        <Haberler />
        <Sponsorlar />
      </main>
      <Footer ayarlar={ayarlar} />
    </div>
  );
}

export default App;
