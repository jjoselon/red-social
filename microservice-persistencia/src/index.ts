import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

// Configuración de Swagger
const swaggerOptions = {
  definition: {
      openapi: "3.0.0",
      info: {
          title: "Persistencia API",
          version: "1.0.0",
          description: "Documentación de los endpoints",
      },
      servers: [{ url: "http://localhost:3000" }],
  },
  apis: ["./src/*.ts"],
};

app.use(express.json());

/**
 * @swagger
 * /users/{username}:
 *   get:
 *     summary: Obtener un usuario por su nombre de usuario
 *     description: Obtiene los datos de un usuario en base a su nombre de usuario.
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre de usuario a buscar
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 username:
 *                   type: string
 *                 age:
 *                   type: integer
 *                 email:
 *                   type: string
 *                 city:
 *                   type: string
 *                 photoUrl:
 *                   type: string 
 *       404:
 *         description: Usuario no encontrado
 */
app.get('/users/:username', async (req, res) => {
  try {
      const { username } = req.params;
      const usuario = await prisma.user.findUnique({
          where: { username }
      });

      if (!usuario) {
          res.status(404).json({ message: 'Usuario no encontrado' });
          return;
      }

      res.json(usuario);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error interno del servidor' });
  }
});

/**
 * @swagger
 * /users/{id}/posts:
 *   get:
 *     summary: Obtener publicaciones de un usuario por su id
 *     description: Obtiene las publicaciones excluyendo las del usuario autenticado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario autenticado
 *     responses:
 *       200:
 *         description: Lista de publicaciones de otros usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   content:
 *                     type: string
 *                   likes:
 *                     type: integer
 *                   user:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       username:
 *                         type: string
 *       500:
 *         description: Error en el servidor
 */
app.get("/users/:id/posts", async (req, res) => {
  const { id } = req.params;
  try {
    const posts = await prisma.post.findMany({
      where: {
        userId: { not: Number(id) } // Excluir publicaciones del usuario autenticado
      },
      orderBy: { id: 'desc' },
      include: { user: true },
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las publicaciones" });
  }
});

/**
 * @swagger
 * /posts/{postId}/like/{userId}:
 *   post:
 *     summary: Agregar un like a una publicación
 *     description: Incrementa en 1 el número de likes de una publicación específica.
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la publicación a la que se le dará like
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario que da like
 *     responses:
 *       200:
 *         description: Like agregado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 posts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       content:
 *                         type: string
 *                       likes:
 *                         type: integer
 *       404:
 *         description: Publicación no encontrada
 *       500:
 *         description: Error interno del servidor
 */
app.post('/posts/:postId/like/:userId', async (req, res) => {
  try {
      const { postId, userId } = req.params;

      // Buscar la publicación por ID
      const publicacion = await prisma.post.findUnique({
          where: { id: Number(postId) }
      });

      if (!publicacion) {
          res.status(404).json({ message: 'Publicación no encontrada' });
      }

      // Asegurar que `likes` tiene un valor válido
      const likesActuales = publicacion?.likes ?? 0; // Si es undefined, asigna 0

      // Incrementar el número de likes
      await prisma.post.update({
          where: { id: Number(postId) },
          data: { likes: likesActuales + 1 }
      });

      const posts = await prisma.post.findMany({
        where: {
          userId: { not: Number(userId) } // Excluir publicaciones del usuario autenticado
        },
        orderBy: { id: 'desc' }
      });

      res.json({ message: 'Like agregado', posts });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error interno del servidor' });
  }
});

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Microservicio ejecutándose en el puerto ${PORT}`);
});
