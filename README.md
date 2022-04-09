# Création d'un réseau social d'entreprise

## PROJET 7

Créer un réseau social d'entreprise. La _stack_ utilisée pour ce projet:

-   **React.Js**
-   **Node.Js** + **Express.Js** + **Sequelize**
-   **MySQL**

Et le lien de la mission :  
[Openclassroom](https://openclassrooms.com/fr/paths/556/projects/677/assignment)

---

### Backend et Frontend du réseau social de l'entreprise Groupomania

#### Backend

---

-   npm install,
-   npm run dev

#### Frontend

---

-   npm install,
-   npm start

---

### Pour tester les fonctionnalités de l'application :

#### Backend

---

on a deux fichiers: config.env et config.json pour ré-installer le CONFIG

1.  Dans config.env:

-   mettre PORT=5000,
    MAX_FILE_UPLOAD=1000000,
-   FILE_UPLOAD_PATH = ./public/uploads,
-   CLIENT_URL=http://localhost:3000,
-   et mettre un code à ACCESS_TOKEN_SECRET

2.  Dans config.json, mettez vos identifiant et mot de passe de votre base de données MYSQL, sans oublier de créer les 3 databases de development, de test et de production à savoir :
- database_development_projet7
- database_test_projet7
- database_production_projet7

#### Frontend

---
cd client => pour acceder au Frontend
