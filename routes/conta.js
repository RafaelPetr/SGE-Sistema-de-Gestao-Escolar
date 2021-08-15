const express = require("express");
const router = express.Router();

const db = require("../mysqlconnection");

router.get('/login', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/conta/login.html');
});

router.get('/sucesso', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/conta/sucesso.html');
});

router.get('/escola', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/conta/escola.html');
});

router.post('/escola', (req, res, next) => {
    var sql = "INSERT INTO escolas (nome, senha) VALUES (?, ?);";
    db.query(sql, [req.body.nome, req.body.senha], (err,result) => {
        if (err) throw err;
        res.redirect('./');
    })
});

router.get('/professor', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/conta/professor.html');
});

router.post('/professor', (req, res, next) => {
    var sql = "INSERT INTO professores (cpf, nome, telefone, email, senha) VALUES (?, ?, ?, ?, ?);";
    db.query(sql, [req.body.cpf, req.body.nome, req.body.telefone, req.body.email, req.body.senha], (err,result) => {
        if (err) throw err;
        res.redirect('./');
    })
});

router.get('/aluno', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/conta/aluno.html');
});

router.post('/aluno', (req, res, next) => {
    var sql = "INSERT INTO alunos (cpf, nome, telefone, email, senha) VALUES (?, ?, ?, ?, ?);";
    db.query(sql, [req.body.cpf, req.body.nome, req.body.telefone, req.body.email, req.body.senha], (err,result) => {
        if (err) throw err;
        res.redirect('./');
    })
});

module.exports = router;