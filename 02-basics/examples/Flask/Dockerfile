# Image de base Python
FROM python:3.11-slim

# Métadonnées
LABEL maintainer="ekiabenjamin@gmail.com"

# Répertoire de travail
WORKDIR /app

# Copier les dépendances
COPY requirements.txt .

# Installer les dépendances
RUN pip install --no-cache-dir -r requirements.txt

# Copier le code de l'application
COPY app.py .

# Port exposé
EXPOSE 5000

# Commande de démarrage
CMD ["python", "app.py"]