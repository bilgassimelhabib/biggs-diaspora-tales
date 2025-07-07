# Utilise l'image Node.js officielle comme base
FROM node:18-alpine

# Définit le répertoire de travail dans le conteneur
WORKDIR /app

# Copie les fichiers package.json et package-lock.json
COPY package*.json ./

# Installe les dépendances
RUN npm ci --only=production

# Copie le reste des fichiers du projet
COPY . .

# Build l'application pour la production
RUN npm run build

# Installe un serveur HTTP statique pour servir l'application
RUN npm install -g serve

# Expose le port 3000
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["serve", "-s", "dist", "-l", "3000"]

# Pour le développement, décommentez les lignes suivantes et commentez les lignes ci-dessus
# EXPOSE 8080
# CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]