import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret_hakaton';

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password, full_name, role } = req.body;
    
    // Check if user exists
    const existing = await prisma.user.findUnique({ where: { username } });
    if (existing) return res.status(400).json({ error: 'Username already in use' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        full_name,
        role: role || 'CLIENT',
      },
    });

    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    console.log('db password:', user.password);
    
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('isMatch:', isMatch);

    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role }, 
      JWT_SECRET, 
      { expiresIn: '1d' }
    );

    res.json({ user, token });
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
}