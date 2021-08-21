const express = require("express");
const router = express.Router();

const db = require("../mysqlconnection");

router.get('/login', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/conta/login.html');
});

router.post('/login', (req, res, next) => {
    var sql = "";

    if (req.body.tipo == "escola") {
        sql = "SELECT cnpj FROM escolas WHERE cnpj = ? AND senha = ?";
    }

    else if (req.body.tipo == "professor") {
        sql = "SELECT cpf FROM professores WHERE cpf = ? AND senha = ?";
    }

    else if (req.body.tipo == "aluno") {
        sql = "SELECT cpf FROM alunos WHERE cpf = ? AND senha = ?";
    }

    db.query(sql, [req.body.usuario, req.body.senha],(err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.redirect("../../" + req.body.tipo + "/" + req.body.usuario + "/");
        }
        else {
            res.redirect("./notfound/");
        }
    })
});

router.get('/login/notfound/', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/conta/notfound.html');
});

router.get('/escola', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/conta/escola.html');
});

router.post('/escola', (req, res, next) => {
    var sql = "INSERT INTO escolas (cnpj, nome, senha) VALUES (?, ?, ?);";
    db.query(sql, [req.body.cnpj, req.body.nome, req.body.senha], (err,result) => {
        if (err) throw err;
        res.redirect('../sucesso/' + req.body.cnpj + "/" + req.body.senha + "/");
    })
});

router.get('/professor', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/conta/professor.html');
});

router.post('/professor', (req, res, next) => {
    var sql = "INSERT INTO professores (cpf, nome, telefone, email, senha) VALUES (?, ?, ?, ?, ?);";
    db.query(sql, [req.body.cpf, req.body.nome, req.body.telefone, req.body.email, req.body.senha], (err,result) => {
        if (err) throw err;
        res.redirect('../sucesso/' + req.body.cpf + "/" + req.body.senha + "/");
    })
});

router.get('/aluno', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/conta/aluno.html');
});

router.post('/aluno', (req, res, next) => {
    var sql = "INSERT INTO alunos (cpf, nome, telefone, email, senha) VALUES (?, ?, ?, ?, ?);";
    db.query(sql, [req.body.cpf, req.body.nome, req.body.telefone, req.body.email, req.body.senha], (err,result) => {
        if (err) throw err;
        res.redirect('/sucesso/');
    })
});

module.exports = router;