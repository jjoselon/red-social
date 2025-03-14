import axios from "axios";
import { Request, Response } from "express";

const PERSISTENCIA_URL = process.env.PERSISTENCIA_URL || 'http://persistencia:3000';

export const getMyPosts = async (req: Request, res: Response) => {
  try {
    const { id } = (req as any).user;
    console.log(`URL PARA LLAMAR ${PERSISTENCIA_URL}/users/${id}/posts`);
    const response = await axios.get(`${PERSISTENCIA_URL}/users/${id}/posts`);
    res.json({ message: "Response from Persistencia", data: response.data });
  } catch (error) {
    console.error("Error fetching from Persistencia:", error);
    res.status(500).json({ error: "Failed to fetch from Persistencia" });
  }
};

export const addLike = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const { id } = (req as any).user;
    const response = await axios.post(`${PERSISTENCIA_URL}/posts/${postId}/like/${id}`);
    res.json({ message: "Response from Persistencia", data: response.data });
  } catch (error) {
    console.error("Error fetching from Persistencia:", error);
    res.status(500).json({ error: "Failed to fetch from Persistencia" });
  }
};
