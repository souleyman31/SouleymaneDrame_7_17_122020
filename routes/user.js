//
const express = require("express");
const router = express.Router();
const authCtrl = require("../controllers/auth");
const userCtrl = require("../controllers/user");

const { uploadProfil, uploadImage } = require("../controllers/upload");

//AUTH
router.post("/signup", authCtrl.signup);
router.post("/login", authCtrl.login);
router.get("/logout", authCtrl.logout);

//USERS
router.get("/", userCtrl.getAllUsers);
router.get("/:id", userCtrl.getSingleUser);
router.put("/:id", userCtrl.updateUser);
router.delete("/:id", userCtrl.deleteUser);
router.patch("/follow/:id", userCtrl.followUser);
router.patch("/unfollow/:id", userCtrl.unFollowUser);

//UPLOAD
router.post("/upload/:id", uploadImage, uploadProfil); //=> upload

module.exports = router;
