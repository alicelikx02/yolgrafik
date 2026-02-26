import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const file = join(__dirname, 'data.json')

const defaultData = {
  users: [],
  haberler: [],
  programcilar: [],
  sarkilar: [],
  sponsorlar: [],
  ayarlar: {
    siteBaslik: 'Radyo Yol - Turkulerin Susmayan Sesi',
    radyoStreamUrl: 'https://r1.comcities.com/proxy/radyoyol/stream',
    facebookUrl: 'https://www.facebook.com/radyoyol.com.tr',
    twitterUrl: 'https://twitter.com/radyoyol',
    youtubeUrl: 'https://www.youtube.com/channel/UCqx8JAMQxcvKWvPLY3To1-Q',
    instagramUrl: 'https://www.instagram.com/radyoyol',
    whatsapp: '+4917620059161',
    telefon: '+49 176 2005 91 61'
  }
}

const adapter = new JSONFile(file)

// ✅ lowdb v3+ için default data burada verilmek zorunda
const db = new Low(adapter, defaultData)

// Oku
await db.read()

// Dosya boşsa null gelebilir
db.data ||= defaultData

// Eksik alanları tamamla (var olan veriyi silmez)
db.data.users ||= []
db.data.haberler ||= []
db.data.programcilar ||= []
db.data.sarkilar ||= []
db.data.sponsorlar ||= []
db.data.ayarlar ||= defaultData.ayarlar

// Yaz (dosya yoksa oluşturur)
await db.write()

export default db