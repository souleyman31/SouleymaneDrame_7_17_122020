//
const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post");
const likeCtrl = require("../controllers/likePost");
const { requireAuth } = require("../middleware/auth");
const commentCtrl = require("../controllers/comment");
const { uploadImage } = require("../controllers/upload");

// POSTS
router.post("/", uploadImage, postCtrl.createPost); //=>Upload
router.get("/", postCtrl.readPost);
router.put("/:id", postCtrl.updatePost);
router.delete("/:id", postCtrl.deletePost);

//LIKE/DISLIKE
router.patch("/like/:posterId", likeCtrl.like);
router.patch("/dislike/:posterId", likeCtrl.dislike);

//COMMENTS
router.patch("/post-comment/:id", commentCtrl.createComment);
router.patch("/put-comment/:id", commentCtrl.updateComment);
router.patch("/delete-comment/:id", commentCtrl.deleteComment);

module.exports = router;
