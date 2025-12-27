# Introduction à la persistance Docker

## Pourquoi la persistance est-elle importante ?

Par défaut, les conteneurs Docker sont éphémères : lorsqu'un conteneur est supprimé, toutes les données qu'il contient sont perdues. Cette caractéristique pose problème dans plusieurs scénarios critiques :

* **Bases de données** : Les données doivent survivre aux redémarrages et aux mises à jour
* **Logs applicatifs** : Nécessité de conservation pour analyse et audit
* **Fichiers uploadés** : Photos, documents, et autres médias utilisateur
* **Configuration** : Paramètres personnalisés et configurations d'environnement

### Analogie pédagogique

Imaginez un conteneur comme un **bloc-notes jetable** : lorsque vous le jetez, tout ce que vous avez écrit disparaît définitivement. Les volumes Docker, quant à eux, sont comparables à des **classeurs permanents** où vous archivez les éléments devant être conservés indépendamment du support d'origine.

## Le problème des conteneurs éphémères

### Démonstration pratique

```bash
# Lancer un conteneur MySQL temporaire
docker run -d --name mysql-test \
  -e MYSQL_ROOT_PASSWORD=secret \
  mysql:8

# Créer une base de données de test
docker exec -it mysql-test mysql -proot -e "CREATE DATABASE testdb;"

# Vérifier l'existence de la base de données
docker exec -it mysql-test mysql -proot -e "SHOW DATABASES;"

# Supprimer le conteneur
docker rm -f mysql-test

# Relancer un nouveau conteneur
docker run -d --name mysql-test \
  -e MYSQL_ROOT_PASSWORD=secret \
  mysql:8

# Constater la perte de données
docker exec -it mysql-test mysql -proot -e "SHOW DATABASES;"
```

**Résultat** : La base `testdb` a disparu. Les données ont été perdues de manière irréversible.

## Types de stockage Docker

Docker propose trois méthodes principales de gestion de la persistance des données :

| **Volumes** | **Bind Mounts** | **tmpfs Mounts** |
|-------------|-----------------|------------------|
| Géré par Docker | Géré par le système d'exploitation hôte | Stockage en mémoire RAM |
| Emplacement : `/var/lib/docker/` | Emplacement : N'importe quel chemin accessible | Mémoire temporaire uniquement |
| **Recommandé pour la production**  | Idéal pour le développement et les tests | Données sensibles/volatiles |
| Performances optimisées | Accès direct aux fichiers hôtes | Persistance limitée à la durée de vie du conteneur |

## Volumes Docker

### Définition

Un volume Docker est un espace de stockage géré par le moteur Docker, indépendant du cycle de vie des conteneurs.

### Avantages des volumes

**Gestion Docker native** : Backup et migration simplifiés  
**Performances** : Optimisé pour les environnements Windows/Mac  
**Partage multi-conteneurs** : Plusieurs conteneurs peuvent utiliser le même volume simultanément  
**Extensibilité** : Support des drivers de stockage distant (NFS, solutions cloud)  
**Isolation sécurisée** : Séparation nette entre conteneur et système hôte  

### Création et gestion des volumes

#### Créer un volume nommé

```bash
# Créer un volume avec identifiant explicite
docker volume create mon-volume

# Lister tous les volumes disponibles
docker volume ls

# Inspecter la configuration d'un volume
docker volume inspect mon-volume
```

**Sortie de la commande `inspect`** :

```json
[
    {
        "CreatedAt": "2024-12-25T10:30:00Z",
        "Driver": "local",
        "Labels": {},
        "Mountpoint": "/var/lib/docker/volumes/mon-volume/_data",
        "Name": "mon-volume",
        "Options": {},
        "Scope": "local"
    }
]
```

### Utilisation d'un volume avec un conteneur

```bash
# Monter un volume lors du lancement d'un conteneur
docker run -d \
  --name mysql-persistent \
  -v mon-volume:/var/lib/mysql \
  -e MYSQL_ROOT_PASSWORD=secret \
  mysql:8

# Syntaxe alternative recommandée (plus explicite)
docker run -d \
  --name mysql-persistent2 \
  --mount source=mon-volume2,target=/var/lib/mysql \
  -e MYSQL_ROOT_PASSWORD=secret \
  mysql:8
```

**Explication** :

* `-v mon-volume:/var/lib/mysql` : Monte le volume `mon-volume` dans le conteneur au chemin `/var/lib/mysql`
* Le volume est automatiquement créé s'il n'existe pas préalablement

### Test de persistance des données

```bash
# 1. Création d'une base de données de test
docker exec -it mysql-persistent mysql -proot -e "CREATE DATABASE myapp;"
docker exec -it mysql-persistent mysql -proot -e "SHOW DATABASES;"

# 2. Suppression du conteneur actuel
docker rm -f mysql-persistent

# 3. Création d'un nouveau conteneur utilisant le MÊME volume
docker run -d \
  --name mysql-new \
  -v mon-volume:/var/lib/mysql \
  -e MYSQL_ROOT_PASSWORD=secret \
  mysql:8

# 4. Vérification de la persistance des données
docker exec -it mysql-new mysql -proot -e "SHOW DATABASES;"
```

**Résultat** : La base de données `myapp` est toujours présente, démontrant l'efficacité du mécanisme de volume. 🎉

### Volumes anonymes

```bash
# Docker crée automatiquement un volume avec un identifiant aléatoire
docker run -d \
  -v /var/lib/mysql \
  -e MYSQL_ROOT_PASSWORD=secret \
  mysql:8

# Lister les volumes anonymes
docker volume ls
```

**Note importante** : Les volumes anonymes sont difficiles à identifier et gérer. Il est recommandé d'utiliser systématiquement des volumes nommés en environnement de production.

### Suppression de volumes

```bash
# Supprimer un volume spécifique
docker volume rm mon-volume

# Supprimer tous les volumes non utilisés
docker volume prune

# Supprimer un conteneur et son volume associé
docker rm -v nom-conteneur
```

**Attention** : La commande `docker volume prune` supprime **TOUS** les volumes non attachés à un conteneur actif. Utilisez-la avec précaution.

## Bind Mounts

### Définition

Un bind mount permet de monter un fichier ou répertoire spécifique du système hôte directement dans le conteneur.

### Cas d'utilisation recommandés

**Environnements de développement** : Synchronisation du code source en temps réel  
**Gestion de configuration** : Utilisation de fichiers de configuration de l'hôte  
**Centralisation des logs** : Accès direct aux fichiers de log depuis l'hôte  

### Syntaxe d'utilisation

```bash
# Syntaxe historique avec -v
docker run -v /chemin/hote:/chemin/conteneur image-name

# Syntaxe moderne avec --mount (recommandée pour sa clarté)
docker run --mount type=bind,source=/chemin/hote,target=/chemin/conteneur image-name
```

### Lancement avec bind mount

```bash
# En développement (bind mount)
docker run -d \
  --name dev-nginx \
  -p 8080:80 \
  -v $(pwd):/usr/share/nginx/html \
  nginx:alpine

# Les changements dans index.html sont immédiatement visibles !
```

### Mode lecture seule

```bash
# Monter en lecture seule avec :ro
docker run -d \
  -v $(pwd):/usr/share/nginx/html:ro \
  -p 8080:80 \
  nginx:alpine
```

Le conteneur ne peut pas modifier les fichiers sur l'hôte.

### Bind mount de fichiers individuels

```bash
# Monter un seul fichier
docker run -d \
  --name nginx-custom \
  -v $(pwd)/nginx.conf:/etc/nginx/nginx.conf:ro \
  -p 8080:80 \
  nginx:alpine
```

## tmpfs Mounts

### Qu'est-ce qu'un tmpfs mount ?

Un tmpfs mount stocke les données en mémoire RAM uniquement. Les données sont perdues à l'arrêt du conteneur.

### Cas d'usage

✅ **Données temporaires** : Cache, sessions  
✅ **Données sensibles** : Mots de passe, tokens (jamais écrits sur disque)  
✅ **Performance** : Accès ultra-rapide  

### Syntaxe

```bash
# Avec --tmpfs
docker run -d --tmpfs /app/temp nginx:alpine

# Avec --mount (plus d'options)
docker run -d \
  --mount type=tmpfs,target=/app/temp,tmpfs-size=100m \
  nginx:alpine
```

### Exemple : Cache applicatif

```bash
docker run -d \
  --name app-cache \
  --tmpfs /app/cache:size=500m,mode=1777 \
  mon-app:latest
```

**Options** :
- `size=500m` : Limite à 500 Mo
- `mode=1777` : Permissions (équivalent à chmod)

## Comparaison et cas d'usage

### Tableau comparatif

| Caractéristique | Volumes | Bind Mounts | tmpfs |
|-----------------|---------|-------------|-------|
| **Gestion** | Docker | OS | RAM |
| **Performance** | Excellente | Moyenne | Ultra-rapide |
| **Persistance** | ✅ Oui | ✅ Oui | ❌ Non |
| **Partage** | ✅ Multi-conteneurs | ✅ Multi-conteneurs | ❌ Un seul |
| **Backup** | ✅ Facile | ⚠️ Manuel | ❌ Impossible |
| **Portable** | ✅ Oui | ❌ Dépend de l'hôte | ✅ Oui |
| **Production** | ✅ Recommandé | ❌ Non | ⚠️ Spécifique |
| **Développement** | ⚠️ Possible | ✅ Idéal | ❌ Rare |

### Quand utiliser quoi ?

**Utilisez des VOLUMES pour** :
- Bases de données en production
- Données importantes à sauvegarder
- Partage entre conteneurs
- Stockage distant (NFS, cloud)

**Utilisez des BIND MOUNTS pour** :
- Développement local (hot reload)
- Configuration hôte → conteneur
- Accès aux logs depuis l'hôte
- Partage de code source

**Utilisez tmpfs pour** :
- Cache applicatif temporaire
- Sessions utilisateur
- Données sensibles (clés, tokens)
- Fichiers temporaires de build

## Gestion avancée des volumes

### Partager un volume entre plusieurs conteneurs

```bash
# Créer un volume partagé
docker volume create shared-data

# Conteneur 1 : écrit des données
docker run -d \
  --name writer \
  -v shared-data:/data \
  alpine sh -c "echo 'Hello' > /data/message.txt && sleep 3600"

# Conteneur 2 : lit les données
docker run --rm \
  -v shared-data:/data \
  alpine cat /data/message.txt
```

**Résultat** : `Hello`

### Volumes avec drivers

```bash
# Créer un volume avec un driver spécifique
docker volume create \
  --driver local \
  --opt type=nfs \
  --opt o=addr=192.168.1.100,rw \
  --opt device=:/path/to/dir \
  nfs-volume

# Utiliser le volume NFS
docker run -d -v nfs-volume:/data mon-app
```

### Backup d'un volume

```bash
# Méthode 1 : Utiliser un conteneur temporaire
docker run --rm \
  -v mon-volume:/source \
  -v $(pwd):/backup \
  alpine tar czf /backup/backup.tar.gz -C /source .

# Méthode 2 : Docker cp
docker run -d --name temp -v mon-volume:/data alpine sleep 3600
docker cp temp:/data ./backup
docker rm -f temp
```

### Restaurer un volume

```bash
# Créer un nouveau volume
docker volume create mon-volume-restaure

# Restaurer depuis le backup
docker run --rm \
  -v mon-volume-restaure:/target \
  -v $(pwd):/backup \
  alpine tar xzf /backup/backup.tar.gz -C /target
```

### Inspecter l'utilisation des volumes

```bash
# Voir l'espace utilisé
docker system df -v

# Détails d'un volume spécifique
docker volume inspect mon-volume

# Lister les conteneurs utilisant un volume
docker ps -a --filter volume=mon-volume
```

### Labels pour organiser les volumes

```bash
# Créer un volume avec des labels
docker volume create \
  --label project=myapp \
  --label environment=production \
  myapp-prod-data

# Filtrer les volumes par label
docker volume ls --filter label=project=myapp
```

## Dépannage

### 1. "Permission denied" avec bind mount
```bash
# Vérifier les permissions
ls -la /chemin/hote

# Sur Linux, ajouter l'option Z pour SELinux
docker run -v /chemin/hote:/conteneur:Z image
```

### 2. Volume ne se supprime pas
**Erreur** :
```
Error response from daemon: volume is in use
```

**Solution** :
```bash
# Trouver quel conteneur utilise le volume
docker ps -a --filter volume=mon-volume

# Supprimer les conteneurs puis le volume
docker rm -f container-id
docker volume rm mon-volume
```

### 3. Données pas synchronisées (bind mount)
**Problème** : Les changements ne sont pas visibles

**Solutions** :
- Sur Windows/Mac : Vérifier les paramètres de partage de fichiers dans Docker Desktop
- Vérifier les chemins absolus
- Sur Linux : Vérifier les permissions (SELinux, AppArmor)

### 4. Volume plein
**Erreur** :
```
no space left on device
```

**Solution** :
```bash
# Vérifier l'utilisation
docker system df -v

# Nettoyer
docker volume prune
docker system prune -a
```

## Bonnes pratiques

### ✅ À faire

- **Nommer les volumes** : Volumes nommés plutôt qu'anonymes
- **Utiliser des volumes pour la production** : Meilleure performance et gestion
- **Backup régulier** : Scripts automatisés de backup
- **Labels** : Organiser les volumes avec des labels
- **Monitoring** : Surveiller l'espace disque
- **Documentation** : Documenter quel volume contient quoi

### ❌ À éviter

- **Volumes anonymes** : Difficiles à gérer
- **Données sensibles en bind mount** : Préférer les volumes
- **Pas de backup** : Toujours avoir une stratégie de backup
- **Permissions root** : Utiliser des utilisateurs non-root
- **Oublier de nettoyer** : Supprimer les volumes inutilisés

## Cheat Sheet - Volumes

```bash
# CRÉATION
docker volume create mon-volume                    # Créer
docker volume create --label env=prod vol-prod    # Avec label

# UTILISATION
docker run -v mon-volume:/data image              # Avec -v
docker run --mount source=vol,target=/data image  # Avec --mount
docker run -v /host/path:/container/path image    # Bind mount
docker run --tmpfs /tmp image                     # tmpfs mount

# CONSULTATION
docker volume ls                                   # Lister
docker volume ls --filter dangling=true           # Volumes orphelins
docker volume inspect mon-volume                  # Détails
docker system df -v                               # Utilisation espace

# SUPPRESSION
docker volume rm mon-volume                       # Supprimer un
docker volume prune                               # Supprimer non utilisés
docker volume prune --filter label=env=dev        # Avec filtre

# BACKUP/RESTORE
docker run --rm -v vol:/src -v $(pwd):/backup alpine \
  tar czf /backup/backup.tar.gz -C /src .         # Backup

docker run --rm -v vol:/target -v $(pwd):/backup alpine \
  tar xzf /backup/backup.tar.gz -C /target        # Restore
```

## Conclusion

La persistance des données est un aspect fondamental de l'utilisation de Docker en production. Le choix entre volumes, bind mounts et tmpfs mounts dépend des exigences spécifiques de votre application :

* **Volumes** : Solution recommandée pour la production et les données critiques
* **Bind Mounts** : Adapté au développement et aux environnements de test
* **tmpfs Mounts** : Réservé aux données temporaires ou sensibles
