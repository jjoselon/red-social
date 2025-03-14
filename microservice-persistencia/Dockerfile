# Usa una imagen base de Node.js
FROM node:18

# Instala netcat para verificar PostgreSQL
RUN apt-get update && apt-get install -y netcat-openbsd

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el código fuente y el esquema de Prisma
COPY . .

# Copia el script de entrada y le da permisos de ejecución
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Genera el cliente de Prisma con la ruta correcta
RUN npx prisma generate --schema=./prisma/schema.prisma

# Compila el código TypeScript
RUN npm run build

# Expone el puerto de la aplicación
EXPOSE 3000

# Usa `entrypoint.sh` para ejecutar comandos antes de iniciar la app
ENTRYPOINT ["/entrypoint.sh"]

# Comando de inicio
CMD ["npm", "run", "start"]
