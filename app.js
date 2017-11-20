/**
 * Arquivo: server.js
 * Descrição: Arquivo responsável por levantar o serviço do Node.Js para poder
 * executar a aplicação e a API através do Express.Js.
 * Author: Matheus Coqueiro Andrade
 * Data de Criação: 07/10/2017
 */

/*------------------------ Configuração Base da Aplicação: ------------------------*/

/** Chamada das Packages que iremos precisar para a nossa aplicação */
const express         = require('express'); //chamando o pacote express
const app             = express(); //definção da nossa aplicação através do express
const bodyParser      = require('body-parser');  //chamando o pacote body-parser
const morgan          = require('morgan');  //chamando o pacote morgan
const mongoose        = require('mongoose');   //chamando o pacote mongoose
const config          = require('./config'); //retorna a configuração criada nesse arquivo relacionado ao bd
const methodOverride  = require('method-override'); // simular DELETE e PUT (express4)
const helmet          = require('helmet');

/** Configuração do banco de dados */
mongoose.connect(config.database, { useMongoClient: true});
mongoose.Promise = global.Promise;

app.set('superNode-auth', config.configName); //variável que criamos no arquivo 'config'

// Requisição ao arquivo que cria nosso model Contato
require('./app/models/usuario.model');
require('./app/models/monografia.model');
require('./app/models/reporte.model');

// DEFININDO A APLICAÇÃO ==============================
// definindo local de arquivos públicos
app.use(express.static(__dirname + '/public'));

/** Configuração da variável 'app' para usar o 'bodyParser()'.
 * Ao fazermos isso nos permitirá retornar os dados a partir de um POST
 */
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());
// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

/** Configurações do helme **/
app.use(helmet());
app.disable('x-powered-by');

/** Configurando nome generico para o cookie **/
const session = require('express-session');
app.set('trust proxy', 1) // trust first proxy
app.use( session({
   secret : 's3Cur3',
   name : 'sessionId',
  })
);

/** Definição da porta onde será executada a nossa aplicação */
const port = process.env.PORT || 8000;

/** Usando o 'morgan' para criar um log de requisições através do console de qualquer alteração que tivermos: */
app.use(morgan('dev'));

/*------------------------ Rotas da aplicação: ------------------------*/

/** Aqui o 'router' irá pegar as instâncias das Rotas do Express */
const router = express.Router();

/** Rota de Teste para sabermos se tudo está realmente funcionando (acessar através: GET: http://localhost:8000) */
//const rotaHome = require('./app/routes/home')(rota);

/** Rota que irá terminar em '/autenticar' (acessar em: GET http://localhost:8000/autenticar) */
const rotaAutenticar = require('./app/routes/autenticar')(router, app);

/** Middleware para poder verificar e autenticar o token */
//const middlewareCheckToken = require('./app/middlewares/check_token')(rota, app, jwt);

/** Rotas utilizadas pela API */
//const rotaLogado = require('./app/routes/logado')(rota);
const rotaUsuario = require('./app/routes/usuario.route')(router);
const rotaMonografia = require('./app/routes/monografia.route')(router);
const rotaReporte = require('./app/routes/reporte.route')(router);

// DEFININDO NOSSA ROTA PARA O ANGULARJS/FRONT-END =========
router.get('*', function(req, res) {
    // Carrega nossa view index.html que será a única da nossa aplicação
    // O Angular irá lidar com as mudanças de páginas no front-end
    res.sendfile('./public/usuario.view.html');
});
/** Todas as nossas rotas serão prefixadas com '/' */
app.use('/api', router);

//Iniciando o Servidor (Aplicação):
//==============================================================
app.listen(port);
console.log('Iniciando a aplicação na porta ' + port);
