# Développement Node.js avec Hot Reload dans Docker

## Scénario
Configuration d'un environnement de développement Node.js avec rechargement automatique lors des modifications de code, utilisant des montages de volumes intelligents.

## Build de l'image Docker
```bash
docker build -t node-dev-app .
```

**Fichier Dockerfile (exemple) :**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]  # Avec nodemon ou équivalent
```

## Lancement avec montages de volumes
```bash
docker run -d \
  --name dev-app \
  -p 3000:3000 \
  -v $(pwd):/app \
  -v /app/node_modules \
  node-dev-app
```

## Configuration détaillée des montages

### 1. **Bind mount du code source**
```bash
-v $(pwd):/app
```
- **Type** : Bind mount (liaison directe avec l'hôte)
- **Fonction** : Synchronise le répertoire courant avec `/app` dans le conteneur
- **Impact** : Toute modification sur l'hôte est immédiatement visible dans le conteneur

### 2. **Volume anonyme pour node_modules**
```bash
-v /app/node_modules
```
- **Type** : Volume anonyme (géré par Docker)
- **Fonction** : Crée un volume dédié pour `node_modules`
- **Effet** : Empêche l'écrasement des dépendances du conteneur

## Démonstration du Hot Reload
```bash
# Modifier server.js sur l'hôte
nano server.js

# Le serveur redémarre automatiquement grâce à nodemon !
# Les changements sont immédiatement visibles sur http://localhost:3000
```

**Exemple de `server.js` avec nodemon :**
```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello avec hot reload!');  // Modifiez ce message
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

## Fonctionnement de l'astuce node_modules

### Problème sans l'astuce :
```
Hôte :           Conteneur :
┌─────────┐      ┌─────────┐
│ code/   │─────▶│ /app    │
│   ├── src/     │   ├── src/
│   └── node_    │   └── node_modules/
│      modules/  │      (écrasé/vide)
└─────────┘      └─────────┘
```

### Solution avec l'astuce :
```
Hôte :           Conteneur :
┌─────────┐      ┌─────────┐
│ code/   │─────▶│ /app    │
│   ├── src/     │   ├── src/
│   └── node_    │   └── node_modules/
│      modules/  │      (volume Docker)
│        (vide)  │        ✓ intact
└─────────┘      └─────────┘
```

## Configuration package.json recommandée
```json
{
  "scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js"
  },
  "devDependencies": {
    "nodemon": "^3.0.0"
  }
}
```

## Commandes utiles pour le développement

### Voir les logs en temps réel
```bash
docker logs -f dev-app
```

### Accéder au shell du conteneur
```bash
docker exec -it dev-app sh
```

### Installer une nouvelle dépendance
```bash
# Sur l'hôte
npm install express

# OU dans le conteneur
docker exec dev-app npm install express
```

### Nettoyage
```bash
# Arrêter le conteneur
docker stop dev-app

# Supprimer le conteneur
docker rm dev-app

# Les volumes anonymes persistent (pour les supprimer)
docker volume prune
```

## Avantages de cette configuration

### 🚀 **Développement rapide**
- Modification instantanée du code
- Pas besoin de rebuild l'image
- Environnement isolé et reproductible

### 🔧 **Gestion des dépendances**
- `node_modules` protégé des différences OS
- Pas de conflits de versions
- Installation initiale unique

### 📦 **Portabilité**
- Même environnement sur toutes les machines
- Configuration versionnée via Dockerfile
- Facile à partager avec l'équipe

## Workflow de développement complet

1. **Initialisation**
```bash
# Clone du projet
git clone <projet>
cd <projet>

# Build de l'image
docker build -t node-dev-app .

# Lancement
docker run -d --name dev-app -p 3000:3000 -v $(pwd):/app -v /app/node_modules node-dev-app
```

2. **Développement**
```bash
# Éditer les fichiers localement
code .

# Voir les changements en direct
open http://localhost:3000
```

3. **Production**
```bash
# Build pour production (sans devDependencies)
docker build -t node-prod-app -f Dockerfile.prod .

# Lancement sans volumes
docker run -d -p 3000:3000 node-prod-app
```