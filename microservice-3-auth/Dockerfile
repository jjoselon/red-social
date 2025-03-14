# Usamos una imagen base oficial de Node.js
FROM node:18

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos el resto de los archivos de la aplicación
COPY . .

# Exponemos el puerto en el que corre la aplicación (ajústalo si es diferente)
EXPOSE 3001

# Comando por defecto para ejecutar la aplicación
CMD ["npm", "run", "dev"]
