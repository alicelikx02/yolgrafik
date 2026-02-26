import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import db from '../database/db.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Tüm programcıları getir
router.get('/', async (req, res) => {
  try {
    await db.read();
    res.json(db.data.programcilar);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Tek programcı getir
router.get('/:id', async (req, res) => {
  try {
    await db.read();
    const programci = db.data.programcilar.find(p => p.id === req.params.id);
    
    if (!programci) {
      return res.status(404).json({ error: 'Programcı bulunamadı' });
    }

    res.json(programci);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Programcı ekle (auth required)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, program, image, bio, social } = req.body;
    
    await db.read();
    
    const newProgramci = {
      id: uuidv4(),
      name,
      program,
      image,
      bio,
      social,
      createdAt: new Date().toISOString()
    };

    db.data.programcilar.push(newProgramci);
    await db.write();

    res.status(201).json(newProgramci);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Programcı güncelle (auth required)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { name, program, image, bio, social } = req.body;
    
    await db.read();
    const index = db.data.programcilar.findIndex(p => p.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Programcı bulunamadı' });
    }

    db.data.programcilar[index] = {
      ...db.data.programcilar[index],
      name: name || db.data.programcilar[index].name,
      program: program || db.data.programcilar[index].program,
      image: image !== undefined ? image : db.data.programcilar[index].image,
      bio: bio !== undefined ? bio : db.data.programcilar[index].bio,
      social: social !== undefined ? social : db.data.programcilar[index].social,
      updatedAt: new Date().toISOString()
    };

    await db.write();
    res.json(db.data.programcilar[index]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Programcı sil (auth required)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await db.read();
    const index = db.data.programcilar.findIndex(p => p.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Programcı bulunamadı' });
    }

    db.data.programcilar.splice(index, 1);
    await db.write();

    res.json({ message: 'Programcı silindi' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
