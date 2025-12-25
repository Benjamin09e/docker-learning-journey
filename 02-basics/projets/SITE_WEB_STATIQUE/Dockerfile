FROM nginx:alpine

# Métadonnées
LABEL maintainer="ekiabenjamin@gmail.com"

# Copier les fichiers statiques
COPY html/ /usr/share/nginx/html/

# Exposer le port 80
EXPOSE 80

# Nginx se lance automatiquement
# lorsque le conteneur démarre grâce à l'image de base nginx:alpine

# Aucune commande CMD ou ENTRYPOINT supplémentaire n'est nécessaire
# car l'image de base nginx gère déjà le démarrage du serveur Nginx.

# Le serveur Nginx écoutera sur le port 80 par défaut.
# Le port 80 est exposé pour permettre l'accès au serveur web.
# Le répertoire par défaut pour les fichiers web dans Nginx est /usr/share/nginx/html/
# où nous avons copié nos fichiers statiques.
