```markdown
# Installation

## Windows

**Prérequis :** Windows 10/11 Pro, Enterprise ou Education (pour WSL2)

1. Téléchargez Docker Desktop : https://www.docker.com/products/docker-desktop
2. Lancez l'installateur
3. Activez WSL2 si demandé
4. Redémarrez votre ordinateur
5. Lancez Docker Desktop

## macOS

1. Téléchargez Docker Desktop pour Mac : https://www.docker.com/products/docker-desktop
2. Glissez Docker.app dans Applications
3. Lancez Docker depuis Applications
4. Autorisez l'accès si demandé

## Linux (Ubuntu/Debian)

```bash
# Mise à jour des paquets
sudo apt-get update

# Installation des dépendances
sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

# Ajout de la clé GPG officielle de Docker
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Configuration du dépôt
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Installation de Docker
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Permettre à votre utilisateur d'utiliser Docker sans sudo
sudo usermod -aG docker $USER

# Déconnectez-vous et reconnectez-vous pour que les changements prennent effet
```

## Linux (CentOS/RHEL/Fedora)

```bash
# Installation
sudo yum install -y yum-utils
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
sudo yum install docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Démarrage de Docker
sudo systemctl start docker
sudo systemctl enable docker

# Ajouter votre utilisateur au groupe docker
sudo usermod -aG docker $USER
```

# Vérification de l'installation

## 1. Vérifier la version de Docker

```bash
docker --version
```

**Sortie attendue (la version peut varier) :**
```
Docker version 24.0.7, build afdd53b
```

## 2. Vérifier que le daemon Docker fonctionne

```bash
docker info
```

Vous devriez voir des informations détaillées sur votre installation Docker.

## 3. Tester avec votre premier conteneur

```bash
docker run hello-world
```

**Ce qui se passe :**
1. Docker cherche l'image "hello-world" localement
2. Ne la trouvant pas, il la télécharge depuis Docker Hub
3. Il crée un conteneur à partir de cette image
4. Le conteneur s'exécute, affiche un message, puis s'arrête

**Sortie attendue :**
```
Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
...
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.
...
```

## 4. Test plus avancé : lancer un serveur web

```bash
docker run -d -p 8080:80 nginx
```

Ouvrez votre navigateur et allez sur http://localhost:8080. Vous devriez voir la page d'accueil de Nginx.

**Explication de la commande :**
- `run` : crée et démarre un conteneur
- `-d` : mode détaché (en arrière-plan)
- `-p 8080:80` : mappe le port 8080 de votre machine au port 80 du conteneur
- `nginx` : nom de l'image à utiliser

**Pour arrêter le conteneur :**

```bash
# Lister les conteneurs en cours d'exécution
docker ps

# Arrêter le conteneur (remplacez CONTAINER_ID par l'ID affiché)
docker stop CONTAINER_ID
```

# Erreurs courantes et solutions

## 1. "Cannot connect to the Docker daemon"
**Cause :** Le service Docker n'est pas démarré

**Solution :**
```bash
# Linux
sudo systemctl start docker

# Windows/Mac : Lancez Docker Desktop
```

## 2. "Permission denied"
**Cause :** Votre utilisateur n'est pas dans le groupe docker

**Solution :**
```bash
sudo usermod -aG docker $USER
# Puis déconnectez-vous et reconnectez-vous
```

## 3. "Port is already allocated"
**Cause :** Le port que vous essayez d'utiliser est déjà occupé

**Solution :** Utilisez un autre port ou arrêtez le processus utilisant ce port

# Ressources supplémentaires

- [Documentation officielle Docker](https://docs.docker.com/)
- [Docker Hub](https://hub.docker.com/) - Parcourir les images disponibles
- [Docker Playground](https://labs.play-with-docker.com/) - Tester Docker en ligne

# Exercice pratique

1. Installez Docker sur votre machine
2. Lancez le conteneur hello-world
3. Lancez un serveur web nginx sur le port 8080
4. Vérifiez qu'il fonctionne dans votre navigateur
5. Arrêtez et supprimez le conteneur

**Commandes à utiliser :**

```bash
docker run hello-world
docker run -d -p 8080:80 --name mon-nginx nginx
docker ps
docker stop mon-nginx
docker rm mon-nginx
```

# Points clés à retenir

 Docker permet de packager des applications avec toutes leurs dépendances
 Les conteneurs sont légers et rapides comparés aux VMs
 Une application Dockerisée fonctionne de manière identique partout
 Docker utilise une architecture client-serveur
 L'installation varie selon votre système d'exploitation
```