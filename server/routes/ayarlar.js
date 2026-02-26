import express from 'express';
import db from '../database/db.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Ayarları getir (public)
router.get('/', async (req, res) => {
  try {
    await db.read();
    res.json(db.data.ayarlar);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ayarları güncelle (auth required)
router.put('/', authMiddleware, async (req, res) => {
  try {
    const {
      siteBaslik,
      radyoStreamUrl,
      facebookUrl,
      twitterUrl,
      youtubeUrl,
      instagramUrl,
      whatsapp,
      telefon
    } = req.body;

    await db.read();

    db.data.ayarlar = {
      ...db.data.ayarlar,
      ...(siteBaslik !== undefined && { siteBaslik }),
      ...(radyoStreamUrl !== undefined && { radyoStreamUrl }),
      ...(facebookUrl !== undefined && { facebookUrl }),
      ...(twitterUrl !== undefined && { twitterUrl }),
      ...(youtubeUrl !== undefined && { youtubeUrl }),
      ...(instagramUrl !== undefined && { instagramUrl }),
      ...(whatsapp !== undefined && { whatsapp }),
      ...(telefon !== undefined && { telefon })
    };

    await db.write();
    res.json(db.data.ayarlar);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
