import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, 'data.json');

const adapter = new JSONFile(file);
const db = new Low(adapter);

// Initialize with default data
await db.read();

db.data = db.data || {
  users: [],
  haberler: [],
  programcilar: [],
  sarkilar: [],
  sponsorlar: [],
  ayarlar: {
    siteBaslik: 'Radyo Yol - Türkülerin Susmayan Sesi',
    radyoStreamUrl: 'https://r1.comcities.com/proxy/radyoyol/stream',
    facebookUrl: 'https://www.facebook.com/radyoyol.com.tr',
    twitterUrl: 'https://twitter.com/radyoyol',
    youtubeUrl: 'https://www.youtube.com/channel/UCqx8JAMQxcvKWvPLY3To1-Q',
    instagramUrl: 'https://www.instagram.com/radyoyol',
    whatsapp: '+4917620059161',
    telefon: '+49 176 2005 91 61'
  }
};

await db.write();

export default db;
