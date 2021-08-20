const express = require("express");
const router = express.Router();

const db = require("../mysqlconnection");

router.get('/:cpf_aluno', (req, res, next) => {
    let cpf_aluno = req.params.cpf_aluno;
    var sql = "SELECT escolas.cnpj as cnpj_escola, alunos_escolas.matricula as matricula FROM ((((escolas INNER JOIN alunos_escolas ON alunos_escolas.cpf_aluno = ?) INNER JOIN alunos_turmas ON alunos_turmas.matricula_aluno = alunos_escolas.matricula) INNER JOIN turmas ON turmas.id = alunos_turmas.id_turma) INNER JOIN cursos ON turmas.id_curso = cursos.id AND cursos.cnpj_escola = escolas.cnpj);"
    
    db.query(sql, cpf_aluno,(err, result) => {
        if (err) throw err;
        res.render(process.cwd() + '/views/aluno/home.ejs', {banco: result});
    })
});

router.get('/:cpf_aluno/:matricula', (req, res, next) => {
    let cpf_aluno = req.params.cpf_aluno;
    var sql = "SELECT nome FROM alunos WHERE cpf = ?;"
    
    db.query(sql, cpf_aluno,(err, result) => {
        if (err) throw err;
        res.render(process.cwd() + '/views/aluno/usuario.ejs', {banco: result[0]});
    })
});

router.get('/:cpf_aluno/:matricula/aulas', (req, res, next) => {
    let matricula = req.params.matricula;
    var sql = "SELECT aulas.cpf_professor, aulas.id_turma, aulas.data, aulas.disciplina FROM (alunos_turmas INNER JOIN aulas ON alunos_turmas.matricula_aluno = ? AND alunos_turmas.id_turma = aulas.id_turma);"
    
    db.query(sql, matricula,(err, result) => {
        if (err) throw err;
        res.render(process.cwd() + '/views/aluno/aulas.ejs', {banco: result});
    })
});

router.get('/:cpf_aluno/:matricula/notas', (req, res, next) => {
    let matricula = req.params.matricula;
    var sql = "SELECT id_disciplina, valor1, valor2, valor3, media FROM notas WHERE matricula_aluno = ?;";

    db.query(sql, matricula,(err, result) => {
        if (err) throw err;
        res.render(process.cwd() + '/views/aluno/notas.ejs', {banco: result});
    })
});

router.get('/:cpf_aluno/:matricula/atividades', (req, res, next) => {
    let matricula = req.params.matricula;
    var sql = "SELECT atividades.titulo, atividades.descricao FROM (atividades INNER JOIN alunos_turmas ON atividades.id_turma = alunos_turmas.id_turma AND alunos_turmas.matricula_aluno = ?);";

    db.query(sql, matricula,(err, result) => {
        if (err) throw err;
        res.render(process.cwd() + '/views/aluno/atividades.ejs', {banco: result});
    })
});

module.exports = router;