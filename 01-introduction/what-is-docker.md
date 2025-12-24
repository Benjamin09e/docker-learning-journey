```markdown
# Qu'est-ce que Docker ?

Docker est une plateforme open-source qui permet de créer, déployer et exécuter des applications dans des conteneurs. Un conteneur est un package léger et autonome qui contient tout ce dont une application a besoin pour fonctionner : le code, les bibliothèques, les dépendances et les configurations.

## Analogie simple

Imaginez Docker comme un système de conteneurs de transport maritime :

- Chaque conteneur est standardisé
- Il peut contenir n'importe quelle marchandise (application)
- Il peut être transporté n'importe où (n'importe quel serveur)
- Les conteneurs sont isolés les uns des autres

## Pourquoi utiliser Docker ?

1. **Portabilité**
   *"Ça marche sur ma machine" n'est plus un problème.* Une application Dockerisée fonctionne de la même manière partout : sur votre laptop, sur les serveurs de production, dans le cloud.

2. **Isolation**
   Chaque conteneur est isolé. Vous pouvez avoir plusieurs versions de Python ou Node.js sur la même machine sans conflit.

3. **Légèreté**
   Les conteneurs partagent le noyau du système d'exploitation, ce qui les rend beaucoup plus légers que les machines virtuelles.

4. **Rapidité**
   Un conteneur démarre en quelques secondes (vs plusieurs minutes pour une VM).

5. **Reproductibilité**
   L'environnement de développement est identique à celui de production. Plus de surprises lors du déploiement.

6. **Scalabilité**
   Facile de créer et détruire des instances de votre application selon la demande.

## Docker vs Machines Virtuelles

**Machines Virtuelles (VM)**

```
+------------------------+
|     Application A      |
+------------------------+
|      Librairies        |
+------------------------+
|    Système invité      |
|      (Ubuntu)          |
+------------------------+
|     Hyperviseur        |
+------------------------+
|   Système hôte         |
+------------------------+
|      Hardware          |
+------------------------+
```

**Conteneurs Docker**

```
+------------------------+
|     Application A      |
+------------------------+
|      Librairies        |
+------------------------+
|    Docker Engine       |
+------------------------+
|   Système hôte         |
+------------------------+
|      Hardware          |
+------------------------+
```

### Différences clés

| Aspect                | Machine Virtuelle       | Conteneur Docker       |
|-----------------------|-------------------------|------------------------|
| **Taille**            | Plusieurs Go            | Quelques Mo            |
| **Démarrage**         | Minutes                 | Secondes               |
| **Performance**       | Overhead important      | Proche du natif        |
| **Isolation**         | Isolation complète      | Isolation des processus |
| **Portabilité**       | Limitée                 | Excellente             |

## Architecture Docker

Docker utilise une architecture client-serveur :

### Composants principaux

- **Docker Client** : Interface en ligne de commande (CLI) que vous utilisez
- **Docker Daemon** : Service qui tourne en arrière-plan et gère les conteneurs
- **Docker Registry** : Dépôt d'images (Docker Hub par exemple)
- **Docker Images** : Templates en lecture seule pour créer des conteneurs
- **Docker Containers** : Instances exécutables d'images

### Flux de travail typique

1. Vous tapez : `docker run nginx`
2. Docker Client envoie la commande au Docker Daemon
3. Le Daemon vérifie si l'image `nginx` existe localement
4. Si non, il la télécharge depuis Docker Hub
5. Le Daemon crée un conteneur à partir de l'image
6. Le conteneur démarre et exécute nginx
```