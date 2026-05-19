
var http = require('http');
var express = require('express');
var colors = require('colors');
var bodyParser = require('body-parser');
var mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;
const uri = "mongodb+srv://heitor_dn:Hdn261206@heitor-fullstack.5akf9eh.mongodb.net/?appName=heitor-fullstack";
const client = new MongoClient(uri, { useNewUrlParser: true });

var app = express();
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', './views');

var server = http.createServer(app);
server.listen(80);

console.log('Servidor rodando ...'.rainbow);

app.get('/', function (requisicao, resposta){
resposta.redirect('project.html')
})

app.get('/inicio', function (requisicao, resposta){
var nome = requisicao.query.info;
console.log(nome);
})

app.post('/inicio', function (requisicao, resposta){
var data = requisicao.body.data;
console.log(data);
})

app.get('/cadastro',function (requisicao, resposta){
var nome = requisicao.query.nome;
var Email = requisicao.query.Email;
var nascimento = requisicao.query.nascimento;
var civil = requisicao.query.civil;
var senha = requisicao.query.senha;

resposta.render('resposta_cadastro', {nome, Email, nascimento, civil, senha})
})


app.get('/login',function (requisicao, resposta){
var Email = requisicao.query.Email;
var senha = requisicao.query.senha;
var nome = requisicao.query.nome;
resposta.render('entrou', {Email, senha, nome})
})

