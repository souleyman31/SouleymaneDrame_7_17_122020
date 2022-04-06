//
const express = require("express");
const router = express.Router();

const commentCtrl = require("../controllers/comment");

// //Routes

router.get("/", commentCtrl.getAllComment);
router.get("/:id", commentCtrl.getSingleComment);

module.exports = router;
