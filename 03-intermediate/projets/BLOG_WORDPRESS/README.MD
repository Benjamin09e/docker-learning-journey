# Déploiement de WordPress avec persistance de données

## Scénario
Déploiement d'un site WordPress complet avec séparation des données (base de données et fichiers) pour assurer leur persistance même après suppression des conteneurs.

## 1. Création des volumes
```bash
docker volume create wordpress-db
docker volume create wordpress-files
```

Deux volumes sont créés :
- **wordpress-db** : Pour la base de données MySQL
- **wordpress-files** : Pour les fichiers WordPress (thèmes, plugins, uploads)

## 2. Lancement de MySQL
```bash
docker run -d \
  --name wordpress-mysql \
  -v wordpress-db:/var/lib/mysql \
  -e MYSQL_ROOT_PASSWORD=rootpass \
  -e MYSQL_DATABASE=wordpress \
  -e MYSQL_USER=wpuser \
  -e MYSQL_PASSWORD=wppass \
  mysql:8
```

Configuration de la base de données :
- **Persistance** : Volume monté sur `/var/lib/mysql`
- **Sécurité** : Mot de passe root défini
- **Base de données préconfigurée** : Base `wordpress` et utilisateur dédié

## 3. Lancement de WordPress
```bash
docker run -d \
  --name wordpress-app \
  -v wordpress-files:/var/www/html \
  -p 8080:80 \
  --link wordpress-mysql:mysql \
  -e WORDPRESS_DB_HOST=mysql \
  -e WORDPRESS_DB_USER=wpuser \
  -e WORDPRESS_DB_PASSWORD=wppass \
  -e WORDPRESS_DB_NAME=wordpress \
  wordpress:latest
```

Configuration de WordPress :
- **Persistance des fichiers** : Volume monté sur `/var/www/html`
- **Exposition** : Port 8080 de l'hôte vers le port 80 du conteneur
- **Connexion à MySQL** : Via le lien réseau `--link`
- **Variables d'environnement** : Configuration de la connexion à la base

## 4. Accès à l'application
```
http://localhost:8080
```

## 5. Démonstration de persistance

### Étape 1 : Installation et configuration
```bash
# 1. Installer WordPress via l'interface web
# 2. Créer quelques articles
# 3. Personnaliser le site
```

### Étape 2 : Suppression des conteneurs
```bash
docker rm -f wordpress-app wordpress-mysql
```

### Étape 3 : Relancement
```bash
# Relancer les mêmes commandes que les étapes 2 et 3
# Les données sont conservées grâce aux volumes !
```

## Architecture
```
┌─────────────────────────────────────────────┐
│                  Hôte Local                 │
│                                             │
│  ┌─────────────┐    ┌─────────────┐        │
│  │  WordPress  │    │    MySQL    │        │
│  │   Port 8080 │    │             │        │
│  └──────┬──────┘    └──────┬──────┘        │
│         │                  │                │
│  ┌──────▼──────┐    ┌──────▼──────┐        │
│  │ Volume      │    │ Volume      │        │
│  │ wordpress-  │    │ wordpress-  │        │
│  │ files       │    │ db          │        │
│  └─────────────┘    └─────────────┘        │
│                                             │
└─────────────────────────────────────────────┘
```

## Avantages de cette configuration

### Persistance des données
- **Base de données** : Articles, pages, commentaires, utilisateurs
- **Fichiers WordPress** : Thèmes, plugins, médias uploadés
- **Configuration** : Paramètres du site

### Séparation des responsabilités
- **Isolation** : Données séparées pour sécurité et maintenance
- **Backup facile** : Sauvegarde indépendante de chaque volume
- **Migration** : Transfert simplifié entre environnements

### Gestion simplifiée
```bash
# Sauvegarde des volumes
docker run --rm -v wordpress-db:/data -v $(pwd):/backup alpine tar cvf /backup/db-backup.tar /data

# Restauration
docker run --rm -v wordpress-db:/data -v $(pwd):/backup alpine tar xvf /backup/db-backup.tar -C /
```
