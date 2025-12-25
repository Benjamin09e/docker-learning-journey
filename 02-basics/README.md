```markdown
### Images vs Conteneurs

#### **Qu'est-ce qu'une image Docker ?**
Une image Docker est un template **immuable** (en lecture seule) qui contient :

- Système d'exploitation de base
- Dépendances de l'application  
- Code de l'application
- Configurations nécessaires

**Analogie :** Une image est comme une recette de cuisine ou un plan architectural.

#### **Qu'est-ce qu'un conteneur Docker ?**
Un conteneur est une **instance en cours d'exécution** d'une image. C'est un processus isolé qui tourne sur votre machine.

**Analogie :** Si l'image est une recette, le conteneur est le plat cuisiné à partir de cette recette.

#### **Relation entre images et conteneurs**

```
     IMAGE (nginx:latest)
           |
           |-- docker run --> CONTENEUR 1 (running)
           |           |
           |-- docker run --> CONTENEUR 2 (running)
           |           |
           |-- docker run --> CONTENEUR 3 (stopped)
```

** Points importants :**

- Une image peut créer plusieurs conteneurs
- Les conteneurs sont éphémères (peuvent être supprimés sans affecter l'image)
- Les modifications dans un conteneur n'affectent pas l'image source

---

## ⚡ Commandes Essentielles

### 1. Gérer les Images

#### **Lister les images**
```bash
docker images
# ou
docker image ls
```

**Sortie typique :**
```
REPOSITORY    TAG       IMAGE ID       CREATED        SIZE
nginx         latest    605c77e624dd   2 weeks ago    141MB
python        3.11      fc7a60e86bae   3 weeks ago    1.01GB
hello-world   latest    feb5d9fea6a5   2 years ago    13.3kB
```

#### **Télécharger une image**
```bash
docker pull ubuntu:22.04
```

#### **Supprimer une image**
```bash
# Par nom
docker rmi nginx

# Par ID
docker rmi 605c77e624dd
```

#### **Rechercher des images**
```bash
docker search python
```

---

### 2. Gérer les Conteneurs

#### **Créer et démarrer un conteneur**
```bash
# Mode interactif
docker run -it ubuntu:22.04 bash

# Mode détaché (arrière-plan)
docker run -d nginx

# Avec nom personnalisé
docker run -d --name mon-serveur nginx

# Avec mapping de port
docker run -d -p 8080:80 nginx
```

**Options importantes**
- `-d` : mode détaché (arrière-plan)
- `-it` : mode interactif avec terminal
- `-p` : mappage de ports (hôte:conteneur)
- `--name` : donner un nom au conteneur
- `--rm` : supprimer automatiquement à l'arrêt
- `-v` : monter un volume
- `-e` : définir des variables d'environnement

#### **Lister les conteneurs**
```bash
# Conteneurs en cours d'exécution
docker ps

# Tous les conteneurs (y compris arrêtés)
docker ps -a

# Derniers conteneurs créés
docker ps -l
```

#### **Arrêter un conteneur**
```bash
# Arrêt gracieux
docker stop mon-serveur

# Arrêt forcé immédiat
docker kill mon-serveur
```

#### **Démarrer un conteneur arrêté**
```bash
docker start mon-serveur

# Avec attachement au terminal
docker start -a mon-serveur
```

#### **Redémarrer un conteneur**
```bash
docker restart mon-serveur
```

#### **Supprimer un conteneur**
```bash
# Conteneur arrêté
docker rm mon-serveur

# Conteneur en cours d'exécution (force)
docker rm -f mon-serveur

# Supprimer tous les conteneurs arrêtés
docker container prune
```

---

### 3. Interagir avec les Conteneurs

#### **Voir les logs**
```bash
# Afficher les logs
docker logs mon-serveur

# Suivre en temps réel
docker logs -f mon-serveur

# Afficher les 100 dernières lignes
docker logs --tail 100 mon-serveur
```

#### **Exécuter des commandes**
```bash
# Ouvrir un shell
docker exec -it mon-serveur bash

# Commande ponctuelle
docker exec mon-serveur ls /usr/share/nginx/html
```

#### **Inspecter un conteneur**
```bash
docker inspect mon-serveur
```

#### **Voir les statistiques**
```bash
# Tous les conteneurs
docker stats

# Conteneur spécifique
docker stats mon-serveur
```

#### **Copier des fichiers**
```bash
# Du conteneur vers l'hôte
docker cp mon-serveur:/etc/nginx/nginx.conf ./nginx.conf

# De l'hôte vers le conteneur
docker cp ./index.html mon-serveur:/usr/share/nginx/html/
```

---

## Dockerfile : Créer ses Propres Images

### Structure de base
```dockerfile
# Commentaire
INSTRUCTION arguments
```

### Instructions principales

| Instruction | Description | Exemple |
|------------|-------------|---------|
| **FROM** | Image de base | `FROM ubuntu:22.04` |
| **LABEL** | Métadonnées | `LABEL version="1.0"` |
| **RUN** | Exécuter commandes | `RUN apt-get update` |
| **COPY** | Copier fichiers | `COPY app.py /app/` |
| **WORKDIR** | Répertoire de travail | `WORKDIR /app` |
| **ENV** | Variables d'env. | `ENV PORT=8080` |
| **EXPOSE** | Documenter ports | `EXPOSE 8080` |
| **CMD** | Commande par défaut | `CMD ["python", "app.py"]` |
| **ENTRYPOINT** | Point d'entrée | `ENTRYPOINT ["python"]` |
| **USER** | Définir utilisateur | `USER appuser` |

### Exemple de Dockerfile complet
```dockerfile
# Image de base
FROM python:3.11-slim

# Métadonnées
LABEL maintainer="dev@example.com"
LABEL version="1.0"

# Variables d'environnement
ENV PYTHONUNBUFFERED=1
ENV PORT=8080

# Répertoire de travail
WORKDIR /app

# Installer les dépendances
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copier le code
COPY . .

# Exposer le port
EXPOSE 8080

# Définir l'utilisateur
RUN useradd -m appuser
USER appuser

# Commande par défaut
CMD ["python", "app.py"]
```

---

## Erreurs Courantes et Solutions

### 1. **"No space left on device"**
**Cause :** Trop d'images/conteneurs/volumes  
**Solution :**
```bash
# Nettoyer les conteneurs arrêtés
docker container prune

# Nettoyer les images non utilisées
docker image prune

# Nettoyer tout
docker system prune -a
```

### 2. **"Port is already allocated"**
**Cause :** Le port est déjà utilisé  
**Solution :** Changer le port hôte
```bash
docker run -d -p 8081:80 nginx  # au lieu de 8080:80
```

### 3. **"Cannot connect to Docker daemon"**
**Cause :** Docker n'est pas démarré  
**Solution :** Démarrer Docker Desktop ou le service Docker

### 4. **Build très lent**
**Cause :** Contexte de build trop large  
**Solution :** Utiliser `.dockerignore`

### 5. **Image trop volumineuse**
**Solutions :**
- Utiliser des images de base plus légères (alpine)
- Nettoyer les fichiers temporaires dans le Dockerfile
- Utiliser multi-stage builds

---

## Cheat Sheet des Commandes

### Images
```bash
docker pull nginx               # Télécharger une image
docker images                   # Lister les images
docker rmi nginx                # Supprimer une image
docker build -t app:1.0 .       # Construire une image
```

### Conteneurs
```bash
docker run -d nginx             # Créer et démarrer
docker ps                       # Lister (actifs)
docker ps -a                    # Lister (tous)
docker stop <id>                # Arrêter
docker start <id>               # Démarrer
docker restart <id>             # Redémarrer
docker rm <id>                  # Supprimer
docker logs <id>                # Voir les logs
docker exec -it <id> bash       # Entrer dans le conteneur
```

### Nettoyage
```bash
docker system prune             # Nettoyer tout
docker container prune          # Supprimer conteneurs arrêtés
docker image prune              # Supprimer images non utilisées
```

### Inspection
```bash
docker inspect <id>             # Informations détaillées
docker stats                    # Statistiques en temps réel
docker logs -f <id>             # Suivre les logs
```
---
## Best Practices

### Pour les Dockerfiles
1. Utiliser des images de base officielles
2. Optimiser le cache des layers
3. Utiliser `.dockerignore`
4. Spécifier des versions exactes pour les tags
5. Créer un utilisateur non-root

### Pour les Conteneurs
1. Donner des noms significatifs
2. Utiliser `--rm` en développement
3. Limiter les ressources (CPU, mémoire)
4. Utiliser des volumes pour les données persistantes
5. Configurer des health checks
