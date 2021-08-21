const express = require("express");
const router = express.Router();

const db = require("../mysqlconnection");

router.get('/', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/geral/homePage.html');
});

router.get('/sucesso', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/geral/sucesso.html');
});

router.get('/sobre', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/geral/sobre.html');
});

module.exports = router;