const cors = require('cors');
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.set('view engine', 'ejs');

const geralRoute = require('./routes/geral')
const contaRoute = require('./routes/conta')
const alunoRoute = require('./routes/aluno')
const escolaRoute = require('./routes/escola')
const professorRoute = require('./routes/professor')

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.use('/client',express.static(__dirname + "/client"));
app.use('/', geralRoute)
app.use('/conta', contaRoute)
app.use('/aluno', alunoRoute)
app.use('/escola', escolaRoute)
app.use('/professor', professorRoute)

module.exports = app;