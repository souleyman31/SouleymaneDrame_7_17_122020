const express = require("express");
const { register, login, logout } = require("../controllers/authCtrl");
const { uploadImage, uploadProfil } = require("../controllers/uploadCtrl");
const { getUsers, getUser, updateUser, deleteUser } = require("../controllers/userCtrl");
const router = express.Router();

//ROUTES

//AUTH
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);

//USERS
router.route("/").get(getUsers);
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

// UPLOAD
router.route("/upload/:id").post(uploadImage, uploadProfil);

module.exports = router;
