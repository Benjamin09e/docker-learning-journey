# Build et exécution d'une API Flask

## Commande de build

```bash
docker build -t express-api:1.0 .
```

## Commande d'exécution

```bash
docker run -d -p 3000:3000 --name my-api express-api:1.0
```

## Test de l'API

```bash
curl http://localhost:3000/api/tasks
```

## Configuration du fichier .dockerignore

Créez un fichier `.dockerignore` dans votre répertoire de projet pour exclure des fichiers inutiles du contexte de build :


### Avantages du .dockerignore :
```bash
- **Build plus rapide** : Moins de fichiers à copier
- **Image plus petite** : Évite d'inclure des fichiers inutiles
- **Sécurité** : Exclut les fichiers sensibles (.env, clés SSH)
- **Prévisibilité** : Build reproductible
```
