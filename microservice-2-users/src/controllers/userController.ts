import axios from "axios";
import { Request, Response } from "express";

const PERSISTENCIA_URL = process.env.PERSISTENCIA_URL || 'http://persistencia:3000';

export const getProfile = async (req: Request, res: Response) => {
  try {
    const { username } = (req as any).user;
    console.log(`URL PARA LLAMAR ${PERSISTENCIA_URL}/users/${username}`);
    const response = await axios.get(`${PERSISTENCIA_URL}/users/${username}`);
    res.json({ message: "Response from Persistencia", data: response.data });
  } catch (error) {
    //console.error("Error fetching from Persistencia:", error);
    res.status(500).json({ error: "Failed to fetch from Persistencia" });
  }
};
