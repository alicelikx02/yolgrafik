import express from 'express';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import db from '../database/db.js';
import { generateToken, authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    await db.read();
    const user = db.data.users.find(u => u.username === username);
    
    if (!user) {
      return res.status(401).json({ error: 'Kullanıcı adı veya şifre hatalı' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Kullanıcı adı veya şifre hatalı' });
    }

    const token = generateToken(user);
    
    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Register (sadece ilk kurulum için)
router.post('/register', async (req, res) => {
  try {
    const { username, password, email, name } = req.body;
    
    await db.read();
    
    // Eğer kullanıcı varsa kayıt kapatık
    if (db.data.users.length > 0) {
      return res.status(403).json({ error: 'Kayıt kapalı' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = {
      id: uuidv4(),
      username,
      password: hashedPassword,
      email,
      name,
      createdAt: new Date().toISOString()
    };

    db.data.users.push(newUser);
    await db.write();

    const token = generateToken(newUser);
    
    res.status(201).json({
      token,
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        name: newUser.name
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Profil bilgileri
router.get('/me', authMiddleware, async (req, res) => {
  try {
    await db.read();
    const user = db.data.users.find(u => u.id === req.user.id);
    
    if (!user) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
    }

    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      name: user.name
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Şifre değiştir
router.put('/password', authMiddleware, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    await db.read();
    const userIndex = db.data.users.findIndex(u => u.id === req.user.id);
    
    if (userIndex === -1) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
    }

    const isValidPassword = await bcrypt.compare(currentPassword, db.data.users[userIndex].password);
    
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Mevcut şifre hatalı' });
    }

    db.data.users[userIndex].password = await bcrypt.hash(newPassword, 10);
    await db.write();

    res.json({ message: 'Şifre başarıyla değiştirildi' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
