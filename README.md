# Création d'un réseau social d'entreprise

## PROJET 7

---

Créer un réseau social d'entreprise. La stack utilisée pour ce projet:

-   ReactJs
-   NodeJs + Express + Sequelize
-   Mysql

---

### Backend et Frontend du réseau social de l'entreprise Groupomania

#### Backend:

-   npm install,
-   npm run dev

#### Frontend

-   npm install,
-   npm start

### Pour tester les fonctionnalités de l'application :

#### Backend

Dans CONFIG, on a 3 fichiers config.env, config.json

-   Une fois dans config.env, mettre PORT=5000, MAX_FILE_UPLOAD=1000000, FILE_UPLOAD_PATH = ./public/uploads, CLIENT_URL=http://localhost:3000, et mettre un code d'une vingtaine de chiffre à ACCESS_TOKEN_SECRET
-   Une fois dans config.json, on change le username, le password et le nom de database, que l'on a crée avec SEQUELIZE CLI

#### Frontend

On crée .env et on y met REACT_APP_API_URL=http://localhost:5000
