import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import db from '../database/db.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Tüm sponsorları getir
router.get('/', async (req, res) => {
  try {
    await db.read();
    res.json(db.data.sponsorlar);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Tek sponsor getir
router.get('/:id', async (req, res) => {
  try {
    await db.read();
    const sponsor = db.data.sponsorlar.find(s => s.id === req.params.id);
    
    if (!sponsor) {
      return res.status(404).json({ error: 'Sponsor bulunamadı' });
    }

    res.json(sponsor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Sponsor ekle (auth required)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, image, url, color, active = true } = req.body;
    
    await db.read();
    
    const newSponsor = {
      id: uuidv4(),
      name,
      image,
      url,
      color,
      active,
      createdAt: new Date().toISOString()
    };

    db.data.sponsorlar.push(newSponsor);
    await db.write();

    res.status(201).json(newSponsor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Sponsor güncelle (auth required)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { name, image, url, color, active } = req.body;
    
    await db.read();
    const index = db.data.sponsorlar.findIndex(s => s.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Sponsor bulunamadı' });
    }

    db.data.sponsorlar[index] = {
      ...db.data.sponsorlar[index],
      name: name !== undefined ? name : db.data.sponsorlar[index].name,
      image: image !== undefined ? image : db.data.sponsorlar[index].image,
      url: url !== undefined ? url : db.data.sponsorlar[index].url,
      color: color !== undefined ? color : db.data.sponsorlar[index].color,
      active: active !== undefined ? active : db.data.sponsorlar[index].active,
      updatedAt: new Date().toISOString()
    };

    await db.write();
    res.json(db.data.sponsorlar[index]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Sponsor sil (auth required)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await db.read();
    const index = db.data.sponsorlar.findIndex(s => s.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Sponsor bulunamadı' });
    }

    db.data.sponsorlar.splice(index, 1);
    await db.write();

    res.json({ message: 'Sponsor silindi' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
