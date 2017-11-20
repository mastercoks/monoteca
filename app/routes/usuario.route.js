module.exports = function(router) {
  // INICIANDO ==============================================
  // Define as bibliotecas que iremos utilizar
  const mongoose = require('mongoose');
  const Usuario = mongoose.model('Usuario');  //retorna a classe de modelo 'Usuario'
  const bcrypt = require('bcrypt');

  function isEmpty(obj) {
    for(var prop in obj) {
      if(obj.hasOwnProperty(prop))
        return false;
    }
    return true;
  }

  router.route('/usuarios')
    // ROTA BUSCAR ============================================
    .get(function(req, res) {
      // utilizaremos o mongoose para buscar todos os contatos no BD
      Usuario.find(function(error, usuarios) {
        // Em caso de erros, envia o erro na resposta
        if (error) {
          res.send(error);
        }
        // Retorna todos os usuarios encontrados no BD
        res.json(usuarios);
      });
    })

    // ROTA CRIAR =============================================
    .post(function(req, res) {
      // Cria um usuario, as informações são enviadas por uma requisição AJAX pelo Angular
      Usuario.find({cpf: req.body.cpf}, function(error, usuario) {
        if (error) {
          res.send(error);
        }
        if (!isEmpty(usuario)) {
          res.json({message: 'CPF já existente'});
        } else {
          const myPassword = req.body.senha;
          bcrypt.hash('myPassword', 10, function(err, hash) {
            Usuario.create({
              nome: req.body.nome,
              cpf: req.body.cpf,
              curso: req.body.curso,
              instituicao: req.body.instituicao,
              email: req.body.email,
              senha: hash

            }, function(error, usuario) {
              // Em caso de erros, envia o erro na resposta
              if (error) {
                res.send(error);
              }
              Usuario.find(function(error, usuarios) {
                if (error) {
                  res.send(error);
                }
                res.json(usuarios);
              })
            });
          });
        }
      })
    });
  router.route('/usuarios/:usuario_id')
    // ROTA DELETAR ============================================
    .delete(function(req, res) {
      // Remove o usuario no Model pelo parâmetro _id
      Usuario.remove({
        _id : req.params.usuario_id
      }, function(error, usuario) {
        // Em caso de erros, envia o erro na resposta
        if (error) {
          res.send(error);
        }
        // Busca novamente todos os contatos após termos removido o registro
        Usuario.find(function(err, usuarios) {
          if (error) {
            res.send(error);
          }
          res.json(usuarios);
        });
      });
    })

    // ROTA EDITAR =============================================
    .get(function(req, res) {
        // Busca o contato no Model pelo parâmetro id
        Usuario.findOne({
            _id : req.params.usuario_id
        }, function(error, usuario) {
          // Em caso de erros, envia o erro na resposta
          if (error) {
            res.send(error);
          }
          res.json(usuario);
        });
    })

    // ROTA ATUALIZAR ==========================================
    .put(function(req, res) {
        // Busca o contato no Model pelo parâmetro id
        const usuarioData = req.body;
        const id = req.params.usuario_id;

        Usuario.update(
            {_id: id },
            usuarioData,
            { upsert: true},
            function(error, usuario) {
              if (error) {
                res.send(error);
              }
              res.json(usuario);
        });
    });
};
