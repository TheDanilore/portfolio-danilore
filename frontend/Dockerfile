# Imagen base de Node.js
FROM node:20-alpine

# Instalar pnpm globalmente
RUN npm install -g pnpm

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de configuración de pnpm
COPY package.json pnpm-lock.yaml* ./

# Instalar dependencias
RUN pnpm install --frozen-lockfile

# Copiar el resto de la aplicación
COPY . .

# Exponer puerto de Vite
EXPOSE 5173

# Comando para iniciar el servidor de desarrollo
CMD ["pnpm", "dev", "--host", "0.0.0.0"]
