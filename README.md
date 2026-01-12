# TP 3 : Créer un blog

Projet réalisé avec Node.js, Express, Sequelize (SQLite) et Vanilla JS.

## Installation

1. Installer les dépendances :
   ```bash
   npm install
   ```

## Démarrage

1. Lancer le serveur :
   ```bash
   node server.js
   ```
2. Ouvrir `http://localhost:3000` dans le navigateur.

## Fonctionnalités

- **Authentification** : Inscription, Connexion (JWT en HTTP-Only Cookie), Déconnexion.
- **Articles** :
  - Lecture (Public)
  - Création/Modification/Suppression (Privé/Admin)
- **Tech** :
  - Backend : Express.js
  - BDD : SQLite (Fichier `database.sqlite` généré automatiquement)
  - Frontend : HTML/JS natif (Fetch API)

## Structure

- `server.js` : Point d'entrée.
- `models/` : Modèles de base de données (User, Article).
- `routes/` : Routes API.
- `public/` : Fichiers Frontend.
