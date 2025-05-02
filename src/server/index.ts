import express from 'express';
import pool from '../lib/db';
import { z } from 'zod';
import bcrypt from 'bcryptjs';

const app = express();
app.use(express.json());

const userSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(['admin', 'manager', 'staff']),
  department: z.string().min(2),
});

app.post('/api/users', async (req, res) => {
  try {
    const data = userSchema.parse(req.body);
    const hashedPassword = await bcrypt.hash(data.password, 10);
    
    const [result] = await pool.execute(
      'INSERT INTO users (name, email, password, role, department, status) VALUES (?, ?, ?, ?, ?, ?)',
      [data.name, data.email, hashedPassword, data.role, data.department, 'active']
    );
    
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(400).json({ error: 'Failed to create user' });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT id, name, email, role, department, status, created_at FROM users');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});