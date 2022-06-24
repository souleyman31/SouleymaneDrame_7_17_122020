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

#### **Information trés importante :**

Tout le **Frontend** se trouve dans le dossier Client.

#### Backend

---

-   npm install,
-   npm run dev

#### Frontend

---
-   cd client
-   npm install,
-   npm start

---

### Pour tester les fonctionnalités de l'application :

#### Backend Configuration

---

##### La Base de Donnée

-   Se connecter au serveur MySQL de votre choix.
-   Exécuter la commande: CREATE DATABASE database_development_projet7;
-   Mettez vos identifiant et mot de passe dans le fichier config/config.json du **Backend**

-   Puis importer le fichier "Database.sql" qui se trouve dans le dossier Database du **Backend**


#### Frontend Configuration

---

- cd client => pour acceder au Frontend
- Se créer un fichier .env dans le dossier CLIENT et y mettre :
REACT_APP_API_URL = http://localhost:5000


