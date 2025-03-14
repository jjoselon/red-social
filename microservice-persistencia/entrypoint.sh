#!/bin/sh

echo "Esperando a que la base de datos esté lista..."
until nc -z -v -w30 db 5432; do
  echo "Esperando la base de datos..."
  sleep 1
done
echo "Base de datos lista!"

# Verificar si ya existen migraciones
if [ -z "$(ls -A prisma/migrations 2>/dev/null)" ]; then
  echo "No se encontraron migraciones. Generando la migración inicial..."
  npx prisma migrate dev --name init
else
  echo "Migraciones encontradas. Aplicándolas..."
  npx prisma migrate deploy
fi

# Poblar datos iniciales
echo "Ejecutando el seed de Prisma..."
npx prisma db seed

# Iniciar la aplicación
echo "Iniciando el servidor..."
exec npm run dev
