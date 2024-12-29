# Étape 1 : Construction (Build Stage)
FROM node:21.5.0-alpine AS build
# Utilisation d'une image Node.js Alpine légère pour la phase de construction.
# "AS build" nomme cette étape pour une référence ultérieure.

WORKDIR /app
# Définit le répertoire de travail à l'intérieur du conteneur.

COPY package*.json ./
# Copie les fichiers package.json et package-lock.json en premier.
# Ceci est crucial pour la mise en cache de Docker. Si ces fichiers n'ont pas changé,
# Docker utilisera la couche mise en cache pour la prochaine commande RUN.

RUN npm ci --production
# Installe les dépendances Node.js en utilisant npm ci, qui est plus rapide et plus fiable
# que npm install dans les environnements CI/CD. Le flag --production garantit que
# seules les dépendances de production sont installées.

COPY . .
# Copie le reste du code de votre application.

RUN npm run build
# Exécute votre script de build (défini dans votre package.json).
# Ceci génère les fichiers statiques prêts pour la production.

# Étape 2 : Production (Nginx)
FROM nginx:alpine-slim
# Utilise une image Nginx Alpine légère pour l'environnement de production.

# Copie des fichiers de build
COPY --from=build /app/build /usr/share/nginx/html
# Copie les fichiers statiques construits depuis l'étape de construction vers la racine web de Nginx.
# Le flag --from=build spécifie l'étape source.

# Copie de la configuration NGINX
COPY nginx.conf /etc/nginx/conf.d/default.conf 

EXPOSE 80
# Expose le port 80 pour le trafic HTTP.

# Vérification de santé
HEALTHCHECK --interval=30s --timeout=3s CMD curl -f http://localhost:80 || exit 1
# Définit un test de santé pour s'assurer que le conteneur fonctionne correctement.
# curl -f est utilisé car il est plus fiable dans les images Alpine.

# CMD est correct tel quel :
CMD ["nginx", "-g", "daemon off;"]
# Démarre Nginx en premier plan. Ceci est important pour la gestion correcte des signaux dans Docker.