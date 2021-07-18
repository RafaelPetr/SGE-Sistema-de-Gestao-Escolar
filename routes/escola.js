const express = require("express");
const router = express.Router();

const db = require("../mysqlconnection");

router.get('/', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/escola/home.html');
});

router.get('/professores', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/escola/professores/home.html');
});

router.get('/professores/contratados', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/escola/professores/contratados.html');
});

router.get('/professores/contratar', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/escola/professores/contratar.html');
});

router.get('/cursos', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/escola/cursos/home.html');
});

router.get('/cursos/criados', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/escola/cursos/criados.html');
});

router.get('/cursos/criar', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/escola/cursos/criar.html');
});

router.get('/alunos', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/escola/alunos/home.html');
});

router.get('/alunos/cadastrados', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/escola/alunos/cadastrados.html');
});

router.get('/alunos/cadastrar', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/escola/alunos/cadastrar.html');
});

router.get('/disciplinas', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/escola/disciplinas/home.html');
});

router.get('/disciplinas/criadas', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/escola/disciplinas/criadas.html');
});

router.get('/disciplinas/criar', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/escola/disciplinas/criar.html');
});

module.exports = router;