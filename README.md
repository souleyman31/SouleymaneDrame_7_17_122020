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

Dans CONFIG, on a 2 fichiers: config.env et config.json

1.  Dans config.env:

-   mettre PORT=5000,
    MAX_FILE_UPLOAD=1000000,
-   FILE_UPLOAD_PATH = ./public/uploads,
-   CLIENT_URL=http://localhost:3000,
-   et mettre un code à ACCESS_TOKEN_SECRET

2.  Dans config.json, on change le username, le password et le nom de database, que l'on a crée avec **SEQUELIZE CLI**

#### Frontend

---

-   On crée .env et on y met REACT_APP_API_URL=http://localhost:5000

![Groupomania](http://localhost:5000/client/public/uploads/1649316083330.png)
