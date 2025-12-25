# Build d'images Docker

## Build de base

```bash
docker build -t mon-app:1.0 .
```

### Explication de la commande :

- `build` : construit une image Docker
- `-t` : tag (nom:version de l'image)
- `.` : contexte de build (répertoire contenant le Dockerfile)

## Format des tags d'image

```
nom-image:version
```

### Exemples :

- `mon-app:1.0`
- `mon-app:latest`
- `mon-app:dev`
- `mon-app:prod`
- `utilisateur/mon-app:1.0`
- `registry.example.com/mon-app:1.0`

## Exemple avec Node.js

```bash
# Pour l'app Node.js
docker run -d -p 3000:3000 --name node-app mon-app:1.0

# Test de l'application
curl http://localhost:3000
```

## Bonnes pratiques de build

### Utilisation du cache des layers Docker

- Si le code change mais pas les dépendances,
- Docker réutilise le layer des dépendances
- **Build plus rapide**
- **Image plus petite**

### Exemple d'optimisation dans Dockerfile :

```dockerfile
# Étape 1 : Copier uniquement les fichiers de dépendances
COPY package*.json ./

# Étape 2 : Installer les dépendances (layer mis en cache)
RUN npm install

# Étape 3 : Copier le reste du code
COPY . .
```