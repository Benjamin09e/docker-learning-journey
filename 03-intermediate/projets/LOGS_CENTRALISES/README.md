# Partage de logs entre conteneurs avec Docker Volumes

## Scénario
Plusieurs applications écrivent leurs logs dans un volume partagé, permettant à un conteneur de monitoring de les consulter en temps réel.

## Création du volume partagé
```bash
# Créer un volume pour les logs
docker volume create app-logs
```

## Application 1
```bash
docker run -d \
  --name app1 \
  -v app-logs:/var/log/app \
  alpine sh -c 'while true; do echo "[APP1] $(date)" >> /var/log/app/app1.log; sleep 5; done'
```

Cette application :
- S'exécute en arrière-plan (`-d`)
- Monte le volume `app-logs` dans `/var/log/app`
- Écrit un message avec timestamp toutes les 5 secondes dans `app1.log`

## Application 2
```bash
docker run -d \
  --name app2 \
  -v app-logs:/var/log/app \
  alpine sh -c 'while true; do echo "[APP2] $(date)" >> /var/log/app/app2.log; sleep 3; done'
```

Cette application :
- S'exécute également en arrière-plan
- Partage le même volume `app-logs`
- Écrit un message toutes les 3 secondes dans `app2.log`

## Conteneur de monitoring
```bash
docker run -it --rm \
  -v app-logs:/logs:ro \
  alpine sh -c 'tail -f /logs/*.log'
```

Ce conteneur de monitoring :
- S'exécute en mode interactif (`-it`)
- Est automatiquement supprimé à l'arrêt (`--rm`)
- Monte le volume en lecture seule (`:ro`)
- Utilise `tail -f` pour suivre en temps réel tous les fichiers `.log`

## Architecture
```
[App1] ---\
           \
            --> [Volume: app-logs] --> [Monitoring]
           /
[App2] ---/
```

## Avantages
- **Centralisation** : Tous les logs sont stockés au même endroit
- **Persistance** : Les logs survivent à l'arrêt des conteneurs
- **Monitoring unifié** : Une seule interface pour surveiller toutes les applications
- **Séparation des préoccupations** : Les applications se concentrent sur leur métier, le monitoring sur l'observation