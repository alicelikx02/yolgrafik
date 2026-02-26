import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import db from '../database/db.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Tüm haberleri getir
router.get('/', async (req, res) => {
  try {
    await db.read();
    const haberler = db.data.haberler.sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    );
    res.json(haberler);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Tek haber getir
router.get('/:id', async (req, res) => {
  try {
    await db.read();
    const haber = db.data.haberler.find(h => h.id === req.params.id);
    
    if (!haber) {
      return res.status(404).json({ error: 'Haber bulunamadı' });
    }

    res.json(haber);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Haber ekle (auth required)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, summary, content, type = 'all', image } = req.body;
    
    await db.read();
    
    const newHaber = {
      id: uuidv4(),
      title,
      summary,
      content,
      type,
      image,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    db.data.haberler.push(newHaber);
    await db.write();

    res.status(201).json(newHaber);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Haber güncelle (auth required)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { title, summary, content, type, image } = req.body;
    
    await db.read();
    const index = db.data.haberler.findIndex(h => h.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Haber bulunamadı' });
    }

    db.data.haberler[index] = {
      ...db.data.haberler[index],
      title: title || db.data.haberler[index].title,
      summary: summary || db.data.haberler[index].summary,
      content: content || db.data.haberler[index].content,
      type: type || db.data.haberler[index].type,
      image: image !== undefined ? image : db.data.haberler[index].image,
      updatedAt: new Date().toISOString()
    };

    await db.write();
    res.json(db.data.haberler[index]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Haber sil (auth required)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await db.read();
    const index = db.data.haberler.findIndex(h => h.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Haber bulunamadı' });
    }

    db.data.haberler.splice(index, 1);
    await db.write();

    res.json({ message: 'Haber silindi' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
