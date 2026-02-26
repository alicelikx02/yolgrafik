import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import db from '../database/db.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Tüm şarkıları getir (sıralı)
router.get('/', async (req, res) => {
  try {
    await db.read();
    const sarkilar = db.data.sarkilar.sort((a, b) => a.rank - b.rank);
    res.json(sarkilar);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Tek şarkı getir
router.get('/:id', async (req, res) => {
  try {
    await db.read();
    const sarki = db.data.sarkilar.find(s => s.id === req.params.id);
    
    if (!sarki) {
      return res.status(404).json({ error: 'Şarkı bulunamadı' });
    }

    res.json(sarki);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Şarkı ekle (auth required)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { rank, artist, title, image, audioUrl } = req.body;
    
    await db.read();
    
    // Aynı rank var mı kontrol et
    const existingRank = db.data.sarkilar.find(s => s.rank === rank);
    if (existingRank) {
      return res.status(400).json({ error: 'Bu sıra numarası zaten kullanılıyor' });
    }

    const newSarki = {
      id: uuidv4(),
      rank,
      artist,
      title,
      image,
      audioUrl,
      votes: 0,
      createdAt: new Date().toISOString()
    };

    db.data.sarkilar.push(newSarki);
    await db.write();

    res.status(201).json(newSarki);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Şarkı güncelle (auth required)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { rank, artist, title, image, audioUrl } = req.body;
    
    await db.read();
    const index = db.data.sarkilar.findIndex(s => s.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Şarkı bulunamadı' });
    }

    // Rank değişiyorsa kontrol et
    if (rank && rank !== db.data.sarkilar[index].rank) {
      const existingRank = db.data.sarkilar.find(s => s.rank === rank && s.id !== req.params.id);
      if (existingRank) {
        return res.status(400).json({ error: 'Bu sıra numarası zaten kullanılıyor' });
      }
    }

    db.data.sarkilar[index] = {
      ...db.data.sarkilar[index],
      rank: rank !== undefined ? rank : db.data.sarkilar[index].rank,
      artist: artist || db.data.sarkilar[index].artist,
      title: title || db.data.sarkilar[index].title,
      image: image !== undefined ? image : db.data.sarkilar[index].image,
      audioUrl: audioUrl !== undefined ? audioUrl : db.data.sarkilar[index].audioUrl,
      updatedAt: new Date().toISOString()
    };

    await db.write();
    res.json(db.data.sarkilar[index]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Şarkı sil (auth required)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await db.read();
    const index = db.data.sarkilar.findIndex(s => s.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Şarkı bulunamadı' });
    }

    db.data.sarkilar.splice(index, 1);
    await db.write();

    res.json({ message: 'Şarkı silindi' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Oy ver
router.post('/:id/vote', async (req, res) => {
  try {
    await db.read();
    const index = db.data.sarkilar.findIndex(s => s.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Şarkı bulunamadı' });
    }

    db.data.sarkilar[index].votes = (db.data.sarkilar[index].votes || 0) + 1;
    await db.write();

    res.json({ message: 'Oy verildi', votes: db.data.sarkilar[index].votes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
