const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.render("index");
});

router.get("/index.ejs", (req, res) => {
    res.render("index");
});

router.get("/update.ejs", (req, res) => {
    res.render("update");
});

router.get("/signup.ejs", (req, res) => {
    res.render("signup");
});

module.exports = router;
