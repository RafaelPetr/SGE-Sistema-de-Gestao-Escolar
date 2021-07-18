const express = require("express");
const router = express.Router();

const db = require("../mysqlconnection");

router.get('/', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/login.html');
});

module.exports = router;