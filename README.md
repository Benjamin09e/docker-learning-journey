# 🐳 Docker Learning Journey - Du Débutant à l'Expert

[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

>  Un guide complet et progressif pour maîtriser Docker, du niveau débutant au niveau avancé, avec des exemples pratiques et des projets concrets.

## À propos du projet

Ce repository est une série d'apprentissage complète sur **Docker**, conçue pour vous emmener progressivement des concepts de base jusqu'aux techniques avancées de conteneurisation. Chaque module contient des explications claires, des exemples de code fonctionnels, et des projets pratiques pour consolider vos connaissances.

###  Pourquoi ce guide ?

- **Apprentissage progressif** : Du plus simple au plus complexe
- **Exemples concrets** : Tous les exemples sont testés et fonctionnels
- **Projets réels** : Applications pratiques pour chaque concept
- **Explications claires** : Pas de jargon inutile, des analogies simples
- **Best practices** : Les bonnes pratiques de l'industrie intégrées dès le début

##  Objectifs d'apprentissage

À la fin de cette série, vous serez capable de :

**Comprendre** les concepts fondamentaux de Docker et la conteneurisation

**Créer** vos propres images Docker optimisées avec des Dockerfiles

**Déployer** des applications conteneurisées en production

**Orchestrer** plusieurs services avec Docker Compose

**Gérer** les volumes, réseaux et variables d'environnement

**Optimiser** vos images pour la performance et la sécurité

**Mettre en place** des pipelines CI/CD avec Docker

**Débugger** et résoudre les problèmes courants

##  Prérequis

### Connaissances requises

- **Essentiel** :
  - Connaissances de base en ligne de commande (terminal/cmd)
  - Notions de base en développement (un langage au choix : Python, Node.js, etc.)
  
- **Recommandé** :
  - Compréhension des concepts client-serveur
  - Expérience avec Git et GitHub

### Logiciels nécessaires

- **Docker Desktop** (Windows/Mac) ou **Docker Engine** (Linux)
- Un éditeur de code (VS Code, Sublime Text, etc.)
- Un terminal (bash, zsh, PowerShell, etc.)
- Git pour cloner le repository

### Configuration système minimale

- **OS** : Windows 10/11 Pro, macOS 10.15+, ou Linux (Ubuntu 20.04+, Debian, etc.)
- **RAM** : 4 Go minimum (8 Go recommandé)
- **Espace disque** : 20 Go d'espace libre pour bien travailler
- **Processeur** : Support de la virtualisation activé (VT-x/AMD-V)

## Table des matières

### Niveau Débutant

#### [Module 1 : Introduction à Docker](./01-introduction/README.md)
- Qu'est-ce que Docker ?
- Docker vs Machines Virtuelles
- Architecture Docker
- Installation sur Windows/Mac/Linux
- Vérification et premier conteneur
- **Durée estimée** : 1-2 heures

#### [Module 2 : Les bases de Docker](./02-basics/README.md)
- Images vs Conteneurs
- Commandes essentielles
- Créer son premier Dockerfile
- Build et gestion des images
- Cycle de vie d'un conteneur
- **Durée estimée** : 3-4 heures
- **Projets** : Application Flask, Site statique Nginx, API Express

### Niveau Intermédiaire

#### [Module 3 : Volumes et persistance des données](./03-intermediate/volumes/README.md)
- Types de volumes Docker
- Bind mounts vs Volumes
- Partage de données entre conteneurs
- Backup et restauration
- **Durée estimée** : 2-3 heures

#### [Module 4 : Réseaux Docker](./03-intermediate/networks/README.md)
- Types de réseaux (bridge, host, overlay)
- Communication entre conteneurs
- DNS et découverte de services
- Isolation réseau
- **Durée estimée** : 2-3 heures

#### [Module 5 : Docker Compose](./03-intermediate/docker-compose/README.md)
- Introduction à Docker Compose
- Fichier docker-compose.yml
- Orchestration multi-conteneurs
- Variables d'environnement
- **Durée estimée** : 3-4 heures
- **Projets** : Application full-stack (Frontend + Backend + Database)

### Niveau Avancé

#### [Module 6 : Multi-stage builds](./04-advanced/multi-stage-builds/README.md)
- Optimisation des images
- Builds en plusieurs étapes
- Réduction de la taille des images
- **Durée estimée** : 2 heures

#### [Module 7 : Optimisation et performance](./04-advanced/optimization/README.md)
- Meilleures pratiques Dockerfile
- Cache et layers
- Images légères avec Alpine
- Analyse de la taille des images
- **Durée estimée** : 2-3 heures

#### [Module 8 : Sécurité Docker](./04-advanced/security/README.md)
- Principes de sécurité
- Scan de vulnérabilités
- Secrets et informations sensibles
- User namespaces et privileges
- **Durée estimée** : 2-3 heures

#### [Module 9 : Docker en production](./04-advanced/production/README.md)
- Logging et monitoring
- Health checks
- Restart policies
- Resource limits
- **Durée estimée** : 2-3 heures

#### [Module 10 : CI/CD avec Docker](./04-advanced/cicd/README.md)
- Intégration avec GitHub Actions
- Pipeline de déploiement
- Docker Registry privé
- **Durée estimée** : 3-4 heures

### Projets pratiques

#### [Projet 1 : Application Web complète](./05-real-world-projects/project1-web-app/README.md)
- Frontend React
- Backend Node.js/Express
- Base de données PostgreSQL
- Redis pour le cache
- Nginx comme reverse proxy

#### [Projet 2 : Architecture microservices](./05-real-world-projects/project2-microservices/README.md)
- Plusieurs services indépendants
- Communication inter-services
- API Gateway
- Service de messagerie

#### [Projet 3 : Application full-stack avec monitoring](./05-real-world-projects/project3-full-stack/README.md)
- Stack complète (MERN/MEAN)
- Monitoring avec Prometheus + Grafana
- Logging centralisé
- Backup automatique

##  Comment utiliser ce repository

### 1. Cloner le repository

```bash
git clone https://github.com/votre-username/docker-learning-journey.git
cd docker-learning-journey
```

### 2. Suivre les modules dans l'ordre

Commencez par le **Module 1** et progressez séquentiellement. Chaque module s'appuie sur les connaissances des modules précédents.

### 3. Pratiquer avec les exemples

Chaque module contient des exemples de code dans le dossier `examples/`. N'hésitez pas à :
- Copier et modifier les exemples
- Expérimenter avec différentes configurations
- Casser des choses pour mieux comprendre 

### 4. Réaliser les exercices

À la fin de chaque module, des exercices pratiques vous permettent de valider vos acquis.

### 5. Construire les projets

Les projets du Module 5 sont des applications complètes qui combinent tous les concepts appris.

## Structure du repository

```
docker-learning-journey/
│
├── README.md                          # Ce fichier
│
├── 01-introduction/                   # Module 1
│   ├── README.md
│   └── resources/
│
├── 02-basics/                         # Module 2
│   ├── README.md
│   ├── examples/
│   │   ├── flask-api/
│   │   ├── static-site/
│   │   └── express-api/
│   └── exercises/
│
├── 03-intermediate/                   # Modules 3, 4, 5
│   ├── volumes/
│   ├── networks/
│   └── docker-compose/
│
├── 04-advanced/                       # Modules 6-10
│   ├── multi-stage-builds/
│   ├── optimization/
│   ├── security/
│   ├── production/
│   └── cicd/
│
├── 05-real-world-projects/            # Projets complets
│   ├── project1-web-app/
│   ├── project2-microservices/
│   └── project3-full-stack/
│
└── resources/                         # Ressources supplémentaires
    ├── cheatsheet.md
    ├── best-practices.md
    ├── troubleshooting.md
    └── glossary.md
```

## Ressources supplémentaires

### Cheat Sheets et références

- [Docker Cheat Sheet](./resources/cheatsheet.md) - Toutes les commandes importantes
- [Best Practices](./resources/best-practices.md) - Les bonnes pratiques Docker
- [Troubleshooting Guide](./resources/troubleshooting.md) - Solutions aux problèmes courants
- [Glossaire](./resources/glossary.md) - Définitions des termes Docker

### Liens utiles

- [Documentation officielle Docker](https://docs.docker.com/)
- [Docker Hub](https://hub.docker.com/) - Repository d'images
- [Docker Playground](https://labs.play-with-docker.com/) - Tester Docker en ligne
- [Awesome Docker](https://github.com/veggiemonk/awesome-docker) - Liste de ressources Docker

##  Comment contribuer

Les contributions sont les bienvenues ! Voici comment vous pouvez aider :

### Types de contributions acceptées

-  **Corrections de bugs** dans les exemples de code
-  **Améliorations de documentation** (typos, clarifications)
-  **Nouveaux exemples** ou projets pratiques
-  **Traductions** dans d'autres langues
-  **Suggestions** d'améliorations

### Processus de contribution

1. **Fork** le repository
2. **Créez une branche** pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. **Committez** vos changements (`git commit -m 'Add some AmazingFeature'`)
4. **Push** vers la branche (`git push origin feature/AmazingFeature`)
5. **Ouvrez une Pull Request**

### Guidelines

- Assurez-vous que tout le code fonctionne avant de soumettre
- Suivez le style et la structure existants
- Ajoutez des commentaires pour expliquer les parties complexes
- Testez vos exemples sur plusieurs systèmes si possible
- Mettez à jour la documentation si nécessaire

##  Série d'articles sur Medium

Cette série d'apprentissage est également disponible sous forme d'articles sur Medium, avec des explications détaillées et des retours d'expérience.

### Articles publiés

1. **[Introduction à Docker : Pourquoi et Comment ?](#)** - Les bases de la conteneurisation
2. **[Créer son premier Dockerfile : Guide pratique](#)** - De zéro à une image Docker
3. **[Docker Compose : Orchestrer plusieurs services](#)** - Applications multi-conteneurs
4. **[Optimisation Docker : Images légères et performantes](#)** - Best practices
5. **[Docker en production : Ce que vous devez savoir](#)** - Déploiement réel

###  Suivez-moi sur Medium

**[@ekiabenjamin](https://medium.com/@ekiabenjamin)**

Pour recevoir les notifications des nouveaux articles :
- Cliquez sur **Follow** sur mon profil
- Activez les notifications par email
- Partagez si vous trouvez le contenu utile !

##  Communauté et support

### Questions et discussions

- **GitHub Issues** : Pour les bugs et problèmes techniques
- **GitHub Discussions** : Pour les questions générales et discussions

### Rejoignez la communauté

-  **Star** ce repository si vous le trouvez utile
-  **Watch** pour être notifié des mises à jour
-  **Fork** pour créer votre propre version

## Progression suggérée

### Planning sur 4 semaines (débutant)

**Semaine 1** : Modules 1-2 (Introduction et bases)
- Jour 1-2 : Installation et concepts de base
- Jour 3-5 : Dockerfile et commandes essentielles
- Weekend : Projets pratiques du Module 2

**Semaine 2** : Module 3-5 (Intermédiaire)
- Jour 1-2 : Volumes et persistance
- Jour 3-4 : Réseaux Docker
- Jour 5 : Docker Compose
- Weekend : Projet full-stack

**Semaine 3** : Modules 6-8 (Avancé partie 1)
- Jour 1-2 : Multi-stage builds
- Jour 3-4 : Optimisation
- Jour 5 : Sécurité
- Weekend : Révisions et pratique

**Semaine 4** : Modules 9-10 et projets (Avancé partie 2)
- Jour 1-3 : Docker en production et CI/CD
- Jour 4-5 : Début du projet final
- Weekend : Finalisation du projet

### Planning intensif (1 semaine)

**Jour 1** : Modules 1-2  
**Jour 2** : Modules 3-4  
**Jour 3** : Module 5  
**Jour 4** : Modules 6-8  
**Jour 5** : Modules 9-10  
**Jour 6-7** : Projet final

##  Certification et validation

### Checklist de compétences

Validez vos compétences en cochant ces objectifs :

- [ ] Installer Docker et lancer votre premier conteneur
- [ ] Créer un Dockerfile pour une application simple
- [ ] Utiliser des volumes pour persister des données
- [ ] Créer un réseau personnalisé entre conteneurs
- [ ] Orchestrer une application avec Docker Compose
- [ ] Optimiser une image Docker (taille < 100MB)
- [ ] Mettre en place un health check
- [ ] Déployer une application multi-conteneurs
- [ ] Configurer un pipeline CI/CD avec Docker
- [ ] Compléter au moins 2 projets pratiques

### Prochaines étapes

Après avoir terminé cette série, vous pouvez :
- Obtenir la **Docker Certified Associate (DCA)** certification
- Explorer **Kubernetes** pour l'orchestration à grande échelle
- Approfondir **Docker Swarm** ou **Kubernetes**
- Contribuer à des projets open-source utilisant Docker

##  Licence

Ce projet est sous licence **Personnel** - voir le fichier [LICENSE](LICENSE) pour plus de détails.

Vous êtes libre de :
-  Utiliser ce contenu pour apprendre
-  Partager avec d'autres
-  Modifier et adapter à vos besoins
-  Utiliser dans un contexte commercial

À condition de :
- Mentionner l'auteur original


##  Remerciements

- **Docker, Inc.** pour l'excellente documentation
- **La communauté open-source** pour les retours et contributions
- **Tous les apprenants** qui utilisent et améliorent ce guide

##  Contact

- **GitHub** : [Benjamin09e](https://github.com/Benjamin09e)
- **Medium** : [@ekiabenjamin](https://medium.com/@ekiabenjamin)
- **LinkedIn** : [benjamin-ekia](https://linkedin.com/in/benjamin-ekia)
- **Email** : ekiabenjamin@gmail.com

---

<div align="center">

**Si ce guide vous a aidé, n'hésitez pas à lui donner une étoile merci !**

Fait avec ❤️ pour la communauté des développeurs

[🔝 Retour en haut](#-docker-learning-journey---du-débutant-à-lexpert)

</div>
