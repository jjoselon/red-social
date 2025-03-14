import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import axios from 'axios';

const SECRET_KEY = process.env.JWT_SECRET || 'mysecretkey';
const PERSISTENCIA_URL = process.env.PERSISTENCIA_URL || 'http://persistencia:3000';

export const login = async (req: Request, res: Response) => {
  const { username } = req.body;

  try {
    const response = await axios.get(`${PERSISTENCIA_URL}/users/${username}`);
    const token = jwt.sign({ id: response.data.id, username: response.data.username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });

  } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        res.status(401).json({ message: 'Credenciales inválidas' });
      }
      res.status(401).json({ message: 'Credenciales inválidas 2' });
  }
};


export const validateToken = (req: Request, res: Response) => {
  res.json({ message: 'Token válido', user: req.user });
};
