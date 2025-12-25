# Build d'images Docker

## Commande de build de base

```bash
docker build -t mon-app:1.0 .
```

### Explication des paramètres :

- **`build`** : Construit une image Docker à partir d'un Dockerfile
- **`-t`** : Tag (nom et version de l'image)
- **`.`** : Contexte de build (répertoire contenant le Dockerfile)

## Format des tags d'image

### Syntaxe :
```
nom-image:version
```

### Exemples de tags :
```bash
mon-app:1.0                    # Version spécifique
mon-app:latest                # Dernière version
mon-app:dev                   # Environnement de développement
mon-app:prod                  # Environnement de production
utilisateur/mon-app:1.0       # Avec namespace utilisateur
registry.example.com/mon-app:1.0  # Avec registry personnalisé
```

## Exemple d'application Python/Flask

```bash
# Lancer l'application Python
docker run -d -p 5000:5000 --name flask-app mon-app:1.0

# Tester l'application
curl http://localhost:5000
```

## Bonnes pratiques de build

### Optimisation du cache des layers Docker

- **Réutilisation des layers** : Si seul le code change (pas les dépendances), Docker réutilise les layers existants
- **Build plus rapide** : Évite de réinstaller les dépendances à chaque modification
- **Image plus petite** : Optimise l'utilisation du cache

### Structure recommandée du Dockerfile :

```dockerfile
# 1. Copier d'abord les fichiers de dépendances
COPY requirements.txt .

# 2. Installer les dépendances (layer mis en cache)
RUN pip install -r requirements.txt

# 3. Copier ensuite le code de l'application
COPY . .
```