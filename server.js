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

/** Configuração do banco de dados */
mongoose.connect(config.database_remoto, { useMongoClient: true, promiseLibrary: global.Promise });

app.set('superNode-auth', config.configName); //variável que criamos no arquivo 'config'

/** Configuração da variável 'app' para usar o 'bodyParser()'.
 * Ao fazermos isso nos permitirá retornar os dados a partir de um POST
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/** Definição da porta onde será executada a nossa aplicação */
var port = process.env.PORT || 8000;

/** Usando o 'morgan' para criar um log de requisições através do console de qualquer alteração que tivermos: */
app.use(morgan('dev'));

/*------------------------ Rotas da aplicação: ------------------------*/

/** Aqui o 'router' irá pegar as instâncias das Rotas do Express */
var router = express.Router();

/** Rota de Teste para sabermos se tudo está realmente funcionando (acessar através: GET: http://localhost:8000) */
router.get('/', function(req, res) {
  res.send('Bem vindo a Monoteca!');
});

/** Rota que irão terminar em '/autenticar' (acessar em: GET http://localhost:8000/autenticar) */
router.post('/autenticar', function(req, res) {

  //Aqui estaremos buscando o usuário
  Usuario.findOne({email: req.body.email}, function(error, usuario) {
    if(error) {
      res.send(error);
    }
    if(!usuario) {
      res.json({ success: false, message: 'Autenticação do Usuário falhou. Usuário não encontrado!' });
    } else if (usuario) {
      //Aqui iremos verificar se a senha bate com o que está cadastrado no banco:
      if(usuario.senha != req.body.senha) {
        res.json({ success: false, message: 'Autenticação do Usuário falhou. Senha incorreta!' });
      } else {

        // caso a senha do usuário seja encontrada.... iremos criar um token:
        var token = jwt.sign(usuario, app.get('superNode-auth'), {
          expiresInMinutes: 1440 //o token irá expirar em 24 horas
        });

        //Aqui iremos retornar a informação do token via JSON:
        res.json({
          success: true,
          message: 'Token criado!!!',
          toke: token
        });
      }
    }
  });
});

/** Middleware para poder verificar e autenticar o token */
router.use(function(req, res, next) {

  console.log('Alguma operação realizada.');
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if(token) {
    jwt.verify(token, app.get('superNode-auth'), function(error, decoded) {
      if (error) {
        return res.json({ success: false, message: 'Falha ao tentar autenticar o token!' });
      } else {
        /** Se tudo correr bem, salver a requisição para o uso em outras rotas */
        req.decoded = decoded;
        next();
      }
    });

  } else {
    /** Se não tiver o token, retornar o erro 403 */
    return res.status(403).send({
      success: false,
      message: 'Não há token.'
    });
  }
});

/** Rota de Teste para sabermos se tudo está realmente funcionando (acessar através: GET: http://localhost:8000) */
router.get('/logado', function(req, res) {
  res.send('Bem vindo Usuario!');
});


/** Rotas que irão terminar em '/usuarios' - (servem tanto para: GET All &amp; POST) */
router.route('/usuarios')

/** 1) Método: Criar Usuario (acessar em: POST http://localhost:8000/usuarios) */
.post(function(req, res) {
  var usuario = new Usuario();

  usuario.nome = req.body.nome;
  usuario.cpf = req.body.cpf;
  usuario.curso = req.body.curso
  usuario.universidade = req.body.universidade;
  usuario.email = req.body.email;
  usuario.senha = req.body.senha;

  usuario.save(function(error) {
    if(error) {
      res.send(error);
    }
    res.json({
      message: 'Usuário criado com sucesso!'
    });
  });
})
/** 2) Método: Selecionar Todos (acessar em: GET http://locahost:8000/usuarios) */
.get(function(req, res) {

  Usuario.find(function(error, usuarios) {
    if(error) {
      res.send(error);
    }
    res.json(usuarios);
  });
});

/** Rotas que irão terminar em '/usuarios/:usuario_id' - (servem tanto para GET by Id, PUT, &amp; DELETE) */
router.route('/usuarios/:usuario_id')

/** 3) Método: Selecionar Por Id (acessar em: GET http://localhost:8000/usuarios/:usuario_id) */
.get(function(req, res) {

Usuario.findById(req.params.usuario_id, function(error, usuario) {
  if(error) {
    res.send(error);
  }
  res.json(usuario);
  });
})

/** 4) Método: Atualizar (acessar em: PUT http://localhost:8000/usuarios/:usuario_id) */
.put(function(req, res) {

  /** Primeiro: Para atualizarmos, precisamos primeiro achar o Usuario. Para isso, vamos selecionar por id: */
  Usuario.findById(req.params.usuario_id, function(error, usuario) {
    if(error) {
      res.send(error);
    }

    /** Segundo: Diferente do Selecionar Por Id... a resposta será a atribuição do que encontramos na classe modelo: */
    usuario.nome = req.body.nome;
    usuario.cpf = req.body.cpf;
    usuario.curso = req.body.curso
    usuario.universidade = req.body.universidade;
    usuario.email = req.body.email;
    usuario.senha = req.body.senha;

    /** Terceiro: Agora que já atualizamos os campos, precisamos salvar essa alteração. */
    usuario.save(function(error) {
      if(error) {
        res.send(error);
      }
      res.json({ message: 'Usuário Atualizado como sucesso!' });
    });
  });
})

/** 5) Método: Excluir (acessar em: http://localhost:8000/usuarios/:usuario_id) */
.delete(function(req, res) {

  /** Função para excluir os dados e também verificar se há algum erro no momento da exclusão: */
  Usuario.remove({_id: req.params.usuario_id}, function(error) {
    if(error) {
      res.send(error);
    }
    res.json({ message: 'Usuário excluído com Sucesso! '});
  });
});



/** Todas as nossas rotas serão prefixadas com '/' */
app.use('/', router);

//Iniciando o Servidor (Aplicação):
//==============================================================
app.listen(port);
console.log('Iniciando a aplicação na porta ' + port);
