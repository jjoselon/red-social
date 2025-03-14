import express from "express";
import { getMyPosts, addLike } from "../controllers/postController";
import { authenticateJWT } from "../middlewares/authMiddleware";

const router = express.Router();

/**
 * @swagger
 * /my-posts:
 *   get:
 *     summary: Obtener las publicaciones del usuario autenticado
 *     description: Devuelve las publicaciones del usuario autenticado.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de publicaciones del usuario autenticado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Response from Persistencia"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       content:
 *                         type: string
 *                         example: "Primera publicación de jhon"
 *                       likes:
 *                         type: integer
 *                         example: 10
 *                       userId:
 *                         type: integer
 *                         example: 1
 *                       user:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           username:
 *                             type: string
 *                             example: "jhon"
 *       500:
 *         description: Error al obtener las publicaciones.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch from Persistencia"
 */
router.get("/my-posts", authenticateJWT, getMyPosts);

/**
 * @swagger
 * /{postId}/like:
 *   post:
 *     summary: Dar "like" a una publicación
 *     description: Incrementa el número de likes en una publicación específica.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la publicación a la que se le dará "like".
 *     responses:
 *       200:
 *         description: Like agregado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Response from Persistencia"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       content:
 *                         type: string
 *                         example: "Primera publicación de jhon"
 *                       likes:
 *                         type: integer
 *                         example: 11
 *                       userId:
 *                         type: integer
 *                         example: 1
 *       500:
 *         description: Error al procesar el "like".
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch from Persistencia"
 */
router.post("/:postId/like", authenticateJWT, addLike);

export default router;
