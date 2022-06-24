const express = require("express");
const { register, login, logout } = require("../controllers/authCtrl");
const { like, disLike } = require("../controllers/likeCtrl");
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

//LIKE
router.route("/like/:id").post(like);
router.route("/dislike/:id").post(disLike);

//
router.route("/upload/:id").post(uploadImage, uploadProfil);

module.exports = router;
