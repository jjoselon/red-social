import express from "express";
import { getProfile } from "../controllers/userController";
import { authenticateJWT } from "../middlewares/authMiddleware";

const router = express.Router();

/**
 * @swagger
 * /user/profile:
 *   get:
 *     summary: "Obtiene detalles del perfil del usuario"
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: "Perfil obtenido"
 *       500:
 *         description: "Failed to fetch from Persistencia"
 */
router.get("/profile", authenticateJWT, getProfile);

export default router;
