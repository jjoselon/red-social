import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes";

dotenv.config();

const app = express();

// Configuración de Swagger
const swaggerOptions = {
  definition: {
      openapi: "3.0.0",
      info: {
          title: "Users API",
          version: "1.0.0",
          description: "Documentación de los endpoints",
      },
      servers: [{ url: "http://localhost:3002" }],
  },
  apis: ["./src/routes/*.ts"],
};

app.use(cors());
app.use(bodyParser.json());

app.use("/user", userRoutes);

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3002;
  app.listen(PORT, () => {
    console.log(`Microservicio de Publicaciones corriendo en el puerto ${PORT}`);
  });
}

export default app;
