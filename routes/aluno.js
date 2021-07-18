const express = require("express");
const router = express.Router();

const db = require("../mysqlconnection");

router.get('/', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/aluno/home.html');
});

module.exports = router;