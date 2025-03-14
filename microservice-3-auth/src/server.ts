import express from 'express';
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();

// Configuración de Swagger
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API de Microservicios",
            version: "1.0.0",
            description: "Documentación de los endpoints",
        },
        servers: [{ url: "http://localhost:3001" }],
    },
    apis: ["./src/routes/*.ts"],
};


app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));

export default app;