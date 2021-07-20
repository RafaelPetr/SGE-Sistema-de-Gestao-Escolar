const express = require("express");
const router = express.Router();

const db = require("../mysqlconnection");

router.get('/:id_escola', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/escola/home.html');
});

router.get('/:id_escola/cursos', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/escola/cursos/home.html');
});

router.get('/:id_escola/cursos/criados', (req, res, next) => {
    let id_escola = req.params.id_escola;
    var sql = "SELECT id, nome, anos FROM cursos WHERE id_escola = ?;";

    db.query(sql, id_escola,(err, result) => {
        if (err) throw err;
        res.render(process.cwd() + '/views/escola/cursos/criados.ejs', {banco: result});
    })
});

router.get('/:id_escola/cursos/criar', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/escola/cursos/criar.html');
});

router.get('/:id_escola/disciplinas', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/escola/disciplinas/home.html');
});

router.get('/:id_escola/disciplinas/criadas', (req, res, next) => {
    let id_escola = req.params.id_escola;
    var sql = "SELECT id, nome, carga_horaria FROM disciplinas WHERE id_escola = ?;";

    db.query(sql, id_escola,(err, result) => {
        if (err) throw err;
        res.render(process.cwd() + '/views/escola/disciplinas/criadas.ejs', {banco: result});
    })
});

router.get('/:id_escola/disciplinas/criar', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/escola/disciplinas/criar.html');
});

router.get('/:id_escola/professores', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/escola/professores/home.html');
});

router.get('/:id_escola/professores/contratados', (req, res, next) => {
    let id_escola = req.params.id_escola;
    var sql = "SELECT professores.cpf, professores.nome, professores.email, professores.telefone FROM professores INNER JOIN escolas_professores ON escolas_professores.id_escola = ? AND professores.cpf = escolas_professores.cpf_professor;";

    db.query(sql, id_escola,(err, result) => {
        if (err) throw err;
        res.render(process.cwd() + '/views/escola/professores/contratados.ejs', {banco: result});
    })
});

router.get('/:id_escola/professores/contratar', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/escola/professores/contratar.html');
});

router.get('/:id_escola/alunos', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/escola/alunos/home.html');
});

router.get('/:id_escola/alunos/cadastrados', (req, res, next) => {
    let id_escola = req.params.id_escola;
    var sql = "SELECT alunos.matricula, alunos.cpf, alunos.nome, alunos.telefone, alunos.email FROM (((alunos INNER JOIN turmas ON turmas.id = alunos.id_turma) INNER JOIN cursos ON turmas.id_curso = cursos.id) INNER JOIN escolas ON escolas.id = cursos.id_escola);";

    db.query(sql, id_escola,(err, result) => {
        if (err) throw err;
        res.render(process.cwd() + '/views/escola/alunos/cadastrados.ejs', {banco: result});
    })
});

router.get('/:id_escola/alunos/cadastrar', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/escola/alunos/cadastrar.html');
});

module.exports = router;