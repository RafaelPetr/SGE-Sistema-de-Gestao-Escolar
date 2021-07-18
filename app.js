const cors = require('cors');
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const alunoRoute = require('./routes/aluno')
const escolaRoute = require('./routes/escola')
const loginRoute = require('./routes/login')
const professorRoute = require('./routes/professor')

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.use('/client',express.static(__dirname + "/client"));
app.use('/', loginRoute)
app.use('/aluno', alunoRoute)
app.use('/escola', escolaRoute)
app.use('/professor', professorRoute)

module.exports = app;