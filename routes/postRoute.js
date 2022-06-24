const express = require("express");
const {
	createComment,
	updateComment,
	deleteComment,
	getComments,
	getComment
} = require("../controllers/commentCtrl");
const { createPost, getPosts, updatePost, deletePost } = require("../controllers/postCtrl");
const { uploadImage } = require("../controllers/uploadCtrl");
const router = express.Router();

//ROUTES

//POST
router.route("/").post(uploadImage, createPost).get(getPosts);
router.route("/:id").put(updatePost).delete(deletePost);

//COMMENT
router.route("/comment-post/:id").patch(createComment);
router.route("/comment-update/:id").patch(updateComment);
router.route("/comment-delete/:id").patch(deleteComment);

//Comment GET ALL && SINGLE
router.route("/comment-all").get(getComments);
router.route("/comment-all/:id").get(getComment);

module.exports = router;
