/* importar o modulo do framework express */
var express = require("express");

/* importar o modulo do consign */
var consign = require("consign");

/* importar o modulo do body-parser */
var body_parser = require("body-parser");

/* importar o modulo do express-validator */
var express_validator = require("express-validator");

/*importar o modulo do express session */
var expressSession = require("express-session");

/* iniciar o objeto do express */
var app = express(); //isso qeu o app.js espera no require

/* setar as variaveis 'view engine' e 'views' do express */
app.set("view engine", "ejs"); //engine de view do express, passou a ser o ejs, apontar para o ejs
app.set("views", "./app/views"); //começa a pesquisar a partir do local onde está sendo pesquisado

/* configurar o middleware express.static, busca os arquivos estaticos ( assets ou public ) */
app.use(express.static("./app/public"));

/* configurar o middleware body-parser */
app.use(body_parser.urlencoded({ extended: true })); //quando houver algums post de algum formulario nos conseguimos recuperar os dados via json apartir do body ( req.body)

/* configurar o middleware express-validator */
app.use(express_validator());

/* configura o express session*/
app.use(
  expressSession({
    secret: "aushuahsuah", //string, trata se do id de referencia para acesso as variaeis de sessao criadas ao lado do servidor
    resave: false, //true : faz com que a sessao seja regravada no servidor, mesmo sem nenhuma modication durante o resquest, cada request do user sera regravada do lado do servidor
    saveUninitialized: false, //true : cria uma nova sessao sempre que a mesma for modificada
  })
);

/* configurar o consign para fazer autoload das routes dos models e dos controllers para o objeto app*/
consign()
  .include("app/routes") //carrega todas as rotas
  .then("config/dbConnection.js") //não exportar toda a pasta
  .then("app/models") //carrega todos os models
  .then("app/controllers")
  .into(app); //carrega todas as rotas

module.exports = app;
