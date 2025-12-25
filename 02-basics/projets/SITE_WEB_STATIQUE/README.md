# Build et exécution d'un site statique

## Commande de build

```bash
docker build -t static-site:1.0 .
```

## Commande d'exécution

```bash
docker run -d -p 8080:80 --name my-site static-site:1.0
```

## Accès au site

Ouvrez votre navigateur à l'adresse : [http://localhost:8080](http://localhost:8080)

## Commandes supplémentaires utiles

### Vérification du conteneur

```bash
# Vérifier si le conteneur est en cours d'exécution
docker ps

# Voir les logs du serveur web
docker logs my-site

# Arrêter le conteneur
docker stop my-site

# Redémarrer le conteneur
docker restart my-site

# Supprimer le conteneur
docker rm my-site
```

### Exemple de Dockerfile pour un site statique

```dockerfile
# Dockerfile pour site statique avec Nginx
FROM nginx:alpine

# Copier les fichiers du site dans le répertoire Nginx
COPY . /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Nginx démarre automatiquement
```

### Structure de projet typique

```
mon-site/
├── Dockerfile
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/
└── .dockerignore
```