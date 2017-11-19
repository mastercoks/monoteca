/**
 * Arquivo: server.js
 * Descrição: Arquivo responsável por levantar o serviço do Node.Js para poder
 * executar a aplicação e a API através do Express.Js.
 * Author: Matheus Coqueiro Andrade
 * Data de Criação: 07/10/2017
 */

/*------------------------ Configuração Base da Aplicação: ------------------------*/

/** Chamada das Packages que iremos precisar para a nossa aplicação */
var express     = require('express'); //chamando o pacote express
var app         = express(); //definção da nossa aplicação através do express
var bodyParser  = require('body-parser');  //chamando o pacote body-parser
var morgan      = require('morgan');  //chamando o pacote morgan
var mongoose    = require('mongoose');   //chamando o pacote mongoose
var jwt         = require('jsonwebtoken'); //pacote usado para criar e verificar os tokens
var config      = require('./config'); //retorna a configuração criada nesse arquivo relacionado ao bd
var Usuario     = require('./app/models/usuario');  //retorna a classe de modelo 'Usuario'
var Monografia  = require('./app/models/monografia');  //retorna a classe de modelo 'Monografia'

/** Configuração do banco de dados */
mongoose.connect(config.database, { useMongoClient: true});
mongoose.Promise = global.Promise;

app.set('superNode-auth', config.configName); //variável que criamos no arquivo 'config'

/** Configuração da variável 'app' para usar o 'bodyParser()'.
 * Ao fazermos isso nos permitirá retornar os dados a partir de um POST
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/** Definição da porta onde será executada a nossa aplicação */
const port = process.env.PORT || 8000;

/** Usando o 'morgan' para criar um log de requisições através do console de qualquer alteração que tivermos: */
app.use(morgan('dev'));

/*------------------------ Rotas da aplicação: ------------------------*/

/** Aqui o 'router' irá pegar as instâncias das Rotas do Express */
const rota = express.Router();

/** Rota de Teste para sabermos se tudo está realmente funcionando (acessar através: GET: http://localhost:8000) */
const rotaHome = require('./app/routes/home')(rota);

/** Rota que irá terminar em '/autenticar' (acessar em: GET http://localhost:8000/autenticar) */
const rotaAutenticar = require('./app/routes/autenticar')(rota, app, Usuario, jwt);

/** Middleware para poder verificar e autenticar o token */
const middlewareCheckToken = require('./app/middlewares/check_token')(rota, app, jwt);

/** Rotas utilizadas pela API */
const rotaLogado = require('./app/routes/logado')(rota);
const rotaUsuarios = require('./app/routes/usuarios')(rota, Usuario);
const rotaUsuario = require('./app/routes/usuario')(rota, Usuario);
const rotaMonografias = require('./app/routes/monografias')(rota, Monografia);

/** Todas as nossas rotas serão prefixadas com '/' */
app.use('/api', rota);

//Iniciando o Servidor (Aplicação):
//==============================================================
app.listen(port);
console.log('Iniciando a aplicação na porta ' + port);
