const express = require("express");
const router = express.Router();

const db = require("../mysqlconnection");

router.get('/:cpnj_escola/', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/escola/home.html');
});

router.get('/:cnpj_escola/cursos', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/escola/cursos/home.html');
});

router.get('/:cnpj_escola/cursos/criados', (req, res, next) => {
    let cnpj_escola = req.params.cnpj_escola;
    var sql = "SELECT id, nome, anos FROM cursos WHERE cnpj_escola = ?;";

    db.query(sql, cnpj_escola,(err, result) => {
        if (err) throw err;
        res.render(process.cwd() + '/views/escola/cursos/criados.ejs', {banco: result});
    })
});

router.get('/:cnpj_escola/cursos/criar', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/escola/cursos/criar.html');
});

router.post('/:cnpj_escola/cursos/criar', (req, res, next) => {
    var sql = "INSERT INTO cursos (nome,anos,cnpj_escola) VALUES (?, ?, ?); CALL InserirTurmas(?);";
    db.query(sql, [req.body.nome, req.body.anos, req.params.cnpj_escola, parseInt(req.body.anos)], (err,result) => {
        if (err) throw err;
        res.sendFile(process.cwd() + '/views/escola/cursos/criar.html');
    })
});

router.get('/:cnpj_escola/disciplinas', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/escola/disciplinas/home.html');
});

router.get('/:cnpj_escola/disciplinas/criadas', (req, res, next) => {
    let cnpj_escola = req.params.cnpj_escola;
    var sql = "SELECT id, nome, carga_horaria FROM disciplinas WHERE cnpj_escola = ?;";

    db.query(sql, cnpj_escola,(err, result) => {
        if (err) throw err;
        res.render(process.cwd() + '/views/escola/disciplinas/criadas.ejs', {banco: result});
    })
});

router.get('/:cnpj_escola/disciplinas/criar', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/escola/disciplinas/criar.html');
});

router.post('/:cnpj_escola/disciplinas/criar', (req, res, next) => {
    var sql = "INSERT INTO disciplinas (nome,carga_horaria,cnpj_escola) VALUES (?, ?, ?);";
    db.query(sql, [req.body.nome, req.body.carga, req.params.cnpj_escola], (err,result) => {
        if (err) throw err;
        res.sendFile(process.cwd() + '/views/escola/disciplinas/criar.html');
    })
});

router.get('/:cnpj_escola/disciplinas/vinculo', (req, res, next) => {
    let cnpj_escola = req.params.cnpj_escola;
    var sql = "SELECT turmas_disciplinas.id_turma, turmas_disciplinas.id_disciplina FROM ((turmas_disciplinas INNER JOIN turmas ON turmas_disciplinas.id_turma = turmas.id) INNER JOIN cursos ON turmas.id_curso = cursos.id AND cursos.cnpj_escola = ?);";

    db.query(sql, cnpj_escola,(err, result) => {
        if (err) throw err;
        res.render(process.cwd() + '/views/escola/disciplinas/vinculo.ejs', {banco: result});
    })
});

router.get('/:cnpj_escola/disciplinas/criar_vinculo', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/escola/disciplinas/criar_vinculo.html');
});

router.post('/:cnpj_escola/disciplinas/criar_vinculo', (req, res, next) => {
    var sql = "INSERT INTO turmas_disciplinas (id_turma, id_disciplina) VALUES (?, ?);";
    db.query(sql, [req.body.id_turma, req.body.id_disciplina], (err,result) => {
        if (err) throw err;
        res.sendFile(process.cwd() + '/views/escola/disciplinas/criar_vinculo.html');
    })
});

router.get('/:cnpj_escola/professores', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/escola/professores/home.html');
});

router.get('/:cnpj_escola/professores/contratados', (req, res, next) => {
    let cnpj_escola = req.params.cnpj_escola;
    var sql = "SELECT professores.cpf, professores.nome, professores.email, professores.telefone FROM professores INNER JOIN escolas_professores ON escolas_professores.cnpj_escola = ? AND professores.cpf = escolas_professores.cpf_professor;";

    db.query(sql, cnpj_escola,(err, result) => {
        if (err) throw err;
        res.render(process.cwd() + '/views/escola/professores/contratados.ejs', {banco: result});
    })
});

router.get('/:cnpj_escola/professores/contratar', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/escola/professores/contratar.html');
});

router.post('/:cnpj_escola/professores/contratar', (req, res, next) => {
    let cnpj_escola = req.params.cnpj_escola;
    var sql = "INSERT INTO escolas_professores (cnpj_escola, cpf_professor) VALUES (?, ?);";
    db.query(sql, [cnpj_escola, req.body.cpf], (err,result) => {
        if (err) throw err;
        res.sendFile(process.cwd() + '/views/escola/disciplinas/contratar.html');
    })
});

router.get('/:cnpj_escola/alunos', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/escola/alunos/home.html');
});

router.get('/:cnpj_escola/alunos/cadastrados', (req, res, next) => {
    let cnpj_escola = req.params.cnpj_escola;
    var sql = "SELECT alunos.matricula, alunos.cpf, alunos.nome, alunos.telefone, alunos.email FROM (((alunos INNER JOIN turmas ON turmas.id = alunos.id_turma) INNER JOIN cursos ON turmas.id_curso = cursos.id) INNER JOIN escolas ON escolas.id = cursos.cnpj_escola AND escolas.id = ?);";

    db.query(sql, cnpj_escola,(err, result) => {
        if (err) throw err;
        res.render(process.cwd() + '/views/escola/alunos/cadastrados.ejs', {banco: result});
    })
});

router.get('/:cnpj_escola/alunos/cadastrar', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/escola/alunos/cadastrar.html');
});

router.post('/:cnpj_escola/alunos/cadastrar', (req, res, next) => {
    var sql = "INSERT INTO alunos (matricula, cpf, nome, telefone, email, id_turma) VALUES (?, ?, ?, ?, ?, ?);";
    db.query(sql, [req.body.matricula, req.body.cpf, req.body.nome, req.body.telefone, req.body.email, req.body.turma], (err,result) => {
        if (err) throw err;
        res.sendFile(process.cwd() + '/views/escola/alunos/cadastrar.html');
    })
});

module.exports = router;