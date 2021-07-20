const express = require("express");
const router = express.Router();

const db = require("../mysqlconnection");

router.get('/', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/aluno/home.html');
});

router.get('/aulas', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/aluno/aulas.html');
});

router.get('/notas', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/aluno/notas.html');
});

router.get('/atividades', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/aluno/atividades.html');
});

module.exports = router;