# Usamos una imagen base de Node.js para construir el frontend
FROM node:18 AS build

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos los archivos de configuración e instalamos dependencias
COPY package.json package-lock.json ./
RUN npm install

# Copiamos el resto de la aplicación y la construimos
COPY . .
RUN npm run build

# Usamos una imagen de Nginx para servir la aplicación
FROM nginx:alpine

# Copiamos los archivos construidos al directorio de Nginx
COPY --from=build /app/build /usr/share/nginx/html

COPY public/nginx.conf /etc/nginx/conf.d/default.conf

# Exponemos el puerto en el que correrá el frontend
EXPOSE 80

# Arrancamos Nginx
CMD ["nginx", "-g", "daemon off;"]
