```markdown
# Images vs Conteneurs

## Qu'est-ce qu'une image Docker ?

Une image Docker est un template **immuable** (en lecture seule) qui contient :

- Le système d'exploitation de base
- Les dépendances de l'application
- Le code de l'application
- Les configurations nécessaires

**Analogie :** Une image est comme une recette de cuisine ou un plan architectural.

## Qu'est-ce qu'un conteneur Docker ?

Un conteneur est une **instance en cours d'exécution** d'une image. C'est un processus isolé qui tourne sur votre machine.

**Analogie :** Si l'image est une recette, le conteneur est le plat cuisiné à partir de cette recette.

## Relation entre images et conteneurs

```
     IMAGE (nginx:latest)
           |
           |-- docker run --> CONTENEUR 1 (running)
           |
           |-- docker run --> CONTENEUR 2 (running)
           |
           |-- docker run --> CONTENEUR 3 (stopped)
```

**Points importants :**

- Une image peut créer plusieurs conteneurs
- Les conteneurs sont éphémères (peuvent être supprimés sans affecter l'image)
- Les modifications dans un conteneur n'affectent pas l'image source

---

# Commandes essentielles

## 1. Gérer les images

### Lister les images

```bash
docker images
# ou
docker image ls
```

**Sortie :**
```
REPOSITORY    TAG       IMAGE ID       CREATED        SIZE
nginx         latest    605c77e624dd   2 weeks ago    141MB
python        3.11      fc7a60e86bae   3 weeks ago    1.01GB
hello-world   latest    feb5d9fea6a5   2 years ago    13.3kB
```

### Télécharger une image

```bash
docker pull ubuntu:22.04
```

### Supprimer une image

```bash
docker rmi nginx
# ou avec l'ID
docker rmi 605c77e624dd
```

### Rechercher des images sur Docker Hub

```bash
docker search python
```

## 2. Gérer les conteneurs

### Créer et démarrer un conteneur

```bash
# Mode interactif
docker run -it ubuntu:22.04 bash

# Mode détaché (arrière-plan)
docker run -d nginx

# Avec un nom personnalisé
docker run -d --name mon-serveur nginx

# Avec mapping de port
docker run -d -p 8080:80 nginx
```

**Options importantes :**

- `-d` : mode détaché (arrière-plan)
- `-it` : mode interactif avec terminal
- `-p` : mappage de ports (hôte:conteneur)
- `--name` : donner un nom au conteneur
- `--rm` : supprimer automatiquement le conteneur quand il s'arrête
- `-v` : monter un volume (nous verrons ça plus tard)
- `-e` : définir des variables d'environnement

### Lister les conteneurs

```bash
# Conteneurs en cours d'exécution
docker ps

# Tous les conteneurs (y compris arrêtés)
docker ps -a

# Derniers conteneurs créés
docker ps -l
```

### Arrêter un conteneur

```bash
# Arrêt gracieux (envoie SIGTERM puis SIGKILL après 10s)
docker stop mon-serveur

# Arrêt forcé immédiat
docker kill mon-serveur
```

### Démarrer un conteneur arrêté

```bash
docker start mon-serveur

# Avec attachement au terminal
docker start -a mon-serveur
```

### Redémarrer un conteneur

```bash
docker restart mon-serveur
```

### Supprimer un conteneur

```bash
# Conteneur arrêté
docker rm mon-serveur

# Conteneur en cours d'exécution (force)
docker rm -f mon-serveur

# Supprimer tous les conteneurs arrêtés
docker container prune
```

## 3. Interagir avec les conteneurs

### Voir les logs

```bash
# Afficher les logs
docker logs mon-serveur

# Suivre les logs en temps réel
docker logs -f mon-serveur

# Afficher les 100 dernières lignes
docker logs --tail 100 mon-serveur
```

### Exécuter une commande dans un conteneur en cours d'exécution

```bash
# Ouvrir un shell bash
docker exec -it mon-serveur bash

# Exécuter une commande ponctuelle
docker exec mon-serveur ls /usr/share/nginx/html
```

### Inspecter un conteneur

```bash
docker inspect mon-serveur
```

### Voir les statistiques en temps réel

```bash
docker stats

# Pour un conteneur spécifique
docker stats mon-serveur
```

### Copier des fichiers

```bash
# Du conteneur vers l'hôte
docker cp mon-serveur:/etc/nginx/nginx.conf ./nginx.conf

# De l'hôte vers le conteneur
docker cp ./index.html mon-serveur:/usr/share/nginx/html/
```

---

# Dockerfile : créer ses propres images

Un Dockerfile est un fichier texte contenant les instructions pour construire une image Docker.

## Structure de base

```dockerfile
# Commentaire
INSTRUCTION arguments
```

## Instructions principales

### 1. `FROM` - Image de base

```dockerfile
FROM ubuntu:22.04
# ou
FROM python:3.11
# ou pour partir de zéro
FROM scratch
```

### 2. `LABEL` - Métadonnées

```dockerfile
LABEL maintainer="votre.email@example.com"
LABEL version="1.0"
LABEL description="Mon application web"
```

### 3. `RUN` - Exécuter des commandes

```dockerfile
# Installer des paquets
RUN apt-get update && apt-get install -y \
    curl \
    git \
    vim

# Créer des répertoires
RUN mkdir -p /app/data
```

### 4. `COPY` et `ADD` - Copier des fichiers

```dockerfile
# COPY (recommandé)
COPY app.py /app/
COPY requirements.txt /app/

# ADD (peut décompresser des archives et télécharger des URLs)
ADD https://example.com/file.tar.gz /tmp/
```

**Différence :** Utilisez `COPY` sauf si vous avez besoin des fonctionnalités spéciales d'`ADD`.

### 5. `WORKDIR` - Définir le répertoire de travail

```dockerfile
WORKDIR /app
# Les commandes suivantes s'exécuteront dans /app
```

### 6. `ENV` - Variables d'environnement

```dockerfile
ENV APP_ENV=production
ENV PORT=8080
```

### 7. `EXPOSE` - Documenter les ports

```dockerfile
EXPOSE 8080
# Note : ceci ne publie pas réellement le port
```

### 8. `CMD` - Commande par défaut

```dockerfile
# Format exec (recommandé)
CMD ["python", "app.py"]

# Format shell
CMD python app.py
```

### 9. `ENTRYPOINT` - Point d'entrée

```dockerfile
ENTRYPOINT ["python"]
CMD ["app.py"]
# Permet d'overrider CMD mais pas ENTRYPOINT
```

### 10. `USER` - Définir l'utilisateur

```dockerfile
RUN useradd -m appuser
USER appuser
```
---
```