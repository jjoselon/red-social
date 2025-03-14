import express from 'express';
import { login, validateToken } from '../controllers/authController';
import { authenticateJWT } from '../middlewares/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Iniciar sesión y obtener un token JWT
 *     description: Valida las credenciales del usuario y devuelve un token JWT si son correctas.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *             properties:
 *               username:
 *                 type: string
 *                 example: "jhon"
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso, devuelve el token JWT.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Credenciales inválidas.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Credenciales inválidas"
 */
router.post('/login', login);

/**
 * @swagger
 * /validate:
 *   get:
 *     summary: Validar token JWT
 *     description: Verifica si el token JWT es válido y devuelve la información del usuario.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token válido, devuelve los datos del usuario autenticado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token válido"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     username:
 *                       type: string
 *       401:
 *         description: Token inválido o expirado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token inválido"
 */
router.get('/validate', authenticateJWT, validateToken);

export default router;
