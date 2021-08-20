const express = require("express");
const router = express.Router();

const db = require("../mysqlconnection");

router.get('/:cpf_professor', (req, res, next) => {
    let cpf_professor = req.params.cpf_professor;
    var sql = "SELECT cnpj_escola FROM escolas_professores WHERE cpf_professor = ?;";

    db.query(sql, cpf_professor,(err, result) => {
        if (err) throw err;
        res.render(process.cwd() + '/views/professor/home.ejs', {banco: result});
    })
});

router.get('/:cpf_professor/:cnpj_escola', (req, res, next) => {
    let cpf_professor = req.params.cpf_professor;
    var sql = "SELECT nome FROM professores WHERE cpf = ?;";

    db.query(sql, cpf_professor,(err, result) => {
        if (err) throw err;
        res.render(process.cwd() + '/views/professor/usuario.ejs', {banco: result[0]});
    })
});

router.get('/:cpf_professor/:cnpj_escola/turmas', (req, res, next) => {
    let cnpj_escola = req.params.cnpj_escola;
    let cpf_professor = req.params.cpf_professor;
    var sql = "SELECT DISTINCT turmas_disciplinas.id_turma FROM ((((professores_disciplinas INNER JOIN turmas_disciplinas ON turmas_disciplinas.id_disciplina = professores_disciplinas.id_disciplina AND professores_disciplinas.cpf_professor = ?) INNER JOIN turmas ON turmas.id = turmas_disciplinas.id_turma) INNER JOIN cursos ON cursos.id = turmas.id_curso) INNER JOIN escolas ON cursos.cnpj_escola = escolas.cnpj AND escolas.cnpj = ?);";

    db.query(sql, [cpf_professor,cnpj_escola],(err, result) => {
        if (err) throw err;
        res.render(process.cwd() + '/views/professor/turmas/home.ejs', {banco: result});
    })
});

router.get('/:cpf_professor/:cnpj_escola/turmas/:id_turma', (req, res, next) => {
    let id_turma = req.params.cpf_professor;
    res.render(process.cwd() + '/views/professor/turmas/turma.ejs', {id_turma});
});

router.get('/:cpf_professor/:cnpj_escola/turmas/:id_turma/notas', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/professor/turmas/notas/notas.html');
});

router.get('/:cpf_professor/:cnpj_escola/turmas/:id_turma/notas/acessar', (req, res, next) => {
    let id_turma = req.params.id_turma;
    var sql = "SELECT notas.matricula_aluno, notas.valor1, notas.valor2, notas.valor3, notas.media FROM (alunos_turmas INNER JOIN notas ON alunos_turmas.matricula_aluno = notas.matricula_aluno AND alunos_turmas.id_turma = ?);";

    db.query(sql, id_turma,(err, result) => {
        if (err) throw err;
        res.render(process.cwd() + '/views/professor/turmas/notas/acessar.ejs', {banco: result});
    })
});

router.get('/:cpf_professor/:cnpj_escola/turmas/:id_turma/notas/atribuir', (req, res, next) => {
    let id_turma = req.params.id_turma;
    let cpf_professor = req.params.cpf_professor;
    var sql = "SELECT alunos_turmas.matricula_aluno as matricula, professores_disciplinas.id_disciplina as disciplina FROM ((alunos_turmas INNER JOIN turmas_disciplinas ON turmas_disciplinas.id_turma = alunos_turmas.id_turma AND alunos_turmas.id_turma = ?) INNER JOIN professores_disciplinas ON professores_disciplinas.id_disciplina = turmas_disciplinas.id_disciplina AND professores_disciplinas.cpf_professor = ?);";

    db.query(sql, [id_turma, cpf_professor],(err, result) => {
        if (err) throw err;
        res.render(process.cwd() + '/views/professor/turmas/notas/atribuir.ejs', {banco: result});
    })
});

router.post('/:cpf_professor/:cnpj_escola/turmas/:id_turma/notas/atribuir', (req, res, next) => {
    var media = (parseFloat(req.body.nota1) + parseFloat(req.body.nota2) + parseFloat(req.body.nota3))/3 
    var sql = "INSERT INTO notas (matricula_aluno, id_disciplina, valor1, valor2, valor3, media) VALUES (?, ?, ?, ?, ?, ?);";
    db.query(sql, [req.body.matricula, req.body.disciplina, req.body.nota1, req.body.nota2, req.body.nota3, media], (err,result) => {
        if (err) throw err;
        res.redirect("/sucesso/");
    })
});

router.get('/:cpf_professor/:cnpj_escola/turmas/:id_turma/atividades', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/professor/turmas/atividades/atividades.html');
});

router.get('/:cpf_professor/:cnpj_escola/turmas/:id_turma/atividades/acessar', (req, res, next) => {
    let id_turma = req.params.id_turma;
    var sql = "SELECT id, titulo, descricao FROM atividades WHERE id_turma = ?;";

    db.query(sql, id_turma,(err, result) => {
        if (err) throw err;
        res.render(process.cwd() + '/views/professor/turmas/atividades/acessar.ejs', {banco: result});
    })
});

router.get('/:cpf_professor/:cnpj_escola/turmas/:id_turma/atividades/criar', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/professor/turmas/atividades/criar.html');
});

router.post('/:cpf_professor/:cnpj_escola/turmas/:id_turma/atividades/criar', (req, res, next) => {
    let id_turma = req.params.id_turma;
    var sql = "INSERT INTO atividades (id_turma, titulo, descricao) VALUES (?, ?, ?);";
    
    db.query(sql, [id_turma, req.body.titulo, req.body.descricao], (err,result) => {
        if (err) throw err;
        res.redirect("/sucesso/");
    })
});

router.get('/:cpf_professor/:cnpj_escola/aulas', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/professor/aulas/home.html');
});

router.get('/:cpf_professor/:cnpj_escola/aulas/marcadas', (req, res, next) => {
    let cpf_professor = req.params.cpf_professor;
    var sql = "SELECT id_turma, data, disciplina FROM aulas WHERE cpf_professor = ?;";

    db.query(sql, cpf_professor,(err, result) => {
        if (err) throw err;
        res.render(process.cwd() + '/views/professor/aulas/marcadas.ejs', {banco: result});
    })
});

router.get('/:cpf_professor/:cnpj_escola/aulas/marcar', (req, res, next) => {
    let cnpj_escola = req.params.cnpj_escola;
    let cpf_professor = req.params.cpf_professor;
    var sql = "SELECT DISTINCT turmas_disciplinas.id_turma as turma, turmas_disciplinas.id_disciplina as disciplina FROM ((((professores_disciplinas INNER JOIN turmas_disciplinas ON turmas_disciplinas.id_disciplina = professores_disciplinas.id_disciplina AND professores_disciplinas.cpf_professor = ?) INNER JOIN turmas ON turmas.id = turmas_disciplinas.id_turma) INNER JOIN cursos ON cursos.id = turmas.id_curso) INNER JOIN escolas ON cursos.cnpj_escola = escolas.cnpj AND escolas.cnpj = ?);"
    
    db.query(sql, [cpf_professor,cnpj_escola],(err, result) => {
        if (err) throw err;
        res.render(process.cwd() + '/views/professor/aulas/marcar.ejs', {banco: result});
    })
});

router.post('/:cpf_professor/:cnpj_escola/aulas/marcar', (req, res, next) => {
    let cpf_professor = req.params.cpf_professor;
    var sql = "INSERT INTO aulas (cpf_professor, id_turma, data, disciplina) VALUES (?, ?, ?, ?);";
    
    db.query(sql, [cpf_professor, req.body.turma, req.body.data, req.body.disciplina], (err,result) => {
        if (err) throw err;
        res.redirect("/sucesso/");
    })
});

module.exports = router;