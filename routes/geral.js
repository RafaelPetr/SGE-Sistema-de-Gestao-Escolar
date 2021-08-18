const express = require("express");
const router = express.Router();

const db = require("../mysqlconnection");

router.get('/', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/geral/homePage.html');
});

router.get('/sucesso', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/escola/sucesso.html');
});

module.exports = router;