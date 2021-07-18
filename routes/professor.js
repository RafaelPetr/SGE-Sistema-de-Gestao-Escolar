const express = require("express");
const router = express.Router();

const db = require("../mysqlconnection");

router.get('/', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/professor/home.html');
});

router.get('/0', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/professor/escola.html');
});

router.get('/0/turmas', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/professor/turmas/home.html');
});

router.get('/0/turmas/0', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/professor/turmas/turma.html');
});

router.get('/0/turmas/0/alunos', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/professor/turmas/alunos.html');
});

router.get('/0/turmas/0/alunos/0/notas', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/professor/turmas/notas.html');
});

router.get('/0/turmas/0/atividade', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/professor/turmas/atividade.html');
});

router.get('/0/aulas', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/professor/aulas/home.html');
});

router.get('/0/aulas/marcadas', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/professor/aulas/marcadas.html');
});

router.get('/0/aulas/marcar', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/professor/aulas/marcar.html');
});

module.exports = router;