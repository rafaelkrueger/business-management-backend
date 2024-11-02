# Use a imagem oficial do Node.js
FROM node:18

# Crie e defina o diretório de trabalho
WORKDIR /usr/src/app

# Copie os arquivos do package.json e package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código da aplicação
COPY . .

# Compile o código TypeScript
RUN npm run build

# Exponha a porta que sua aplicação usa
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "start:prod"]
