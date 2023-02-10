# Imagen base
FROM node:18

# Crear el directorio app y todos sus subdirectorios
RUN mkdir -p /usr/src/app

# Ruta de trabajo
WORKDIR /usr/src/app

# Copiar el código de la aplicación al contenedor 
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar todos los archivos al directorio de trabajo
COPY . .

# Indicar en qué puerto escuchará el contenedor
EXPOSE 8080

# Especifica el comando por defecto para ejecutar al iniciar el contenedor
CMD ["npm", "start"]
