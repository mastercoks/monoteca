module.exports = function(router) {
  // INICIANDO ==============================================
  // Define as bibliotecas que iremos utilizar
  const mongoose = require('mongoose');
  const Monografia = mongoose.model('Monografia');  //retorna a classe de modelo 'Usuario'

  router.route('/monografias')
    // ROTA BUSCAR ============================================
    .get(function(req, res) {
      // utilizaremos o mongoose para buscar todos os contatos no BD
      Monografia.find(function(error, monografias) {
        // Em caso de erros, envia o erro na resposta
        if (error) {
          res.send(error);
        }
        // Retorna todos os monografias encontrados no BD
        res.json(monografias);
      });
    })

    // ROTA CRIAR =============================================
    .post(function(req, res) {
      // Cria um monografia, as informações são enviadas por uma requisição AJAX pelo Angular
      Monografia.find({cpf: req.body.cpf}, function(error, monografia) {
        if (error) {
          res.send(error);
        }
        Monografia.create({
          titulo: req.body.titulo,
          resumo: req.body.resumo,
          autor: {
            nome: req.body.nome,
            lattes: req.body.lattes
          },
          arquivo: req.body.arquivo,
          id_usuario: req.body.id_usuario

        }, function(error, monografia) {
          // Em caso de erros, envia o erro na resposta
          if (error) {
            res.send(error);
          }
          Monografia.find(function(error, monografias) {
            if (error) {
              res.send(error);
            }
            res.json(monografias);
          })
        });
      })
    });
  router.route('/monografias/:monografia_id')
    // ROTA DELETAR ============================================
    .delete(function(req, res) {
      // Remove o monografia no Model pelo parâmetro _id
      Monografia.remove({
        _id : req.params.monografia_id
      }, function(error, monografia) {
        // Em caso de erros, envia o erro na resposta
        if (error) {
          res.send(error);
        }
        // Busca novamente todos os contatos após termos removido o registro
        Monografia.find(function(err, monografias) {
          if (error) {
            res.send(error);
          }
          res.json(monografias);
        });
      });
    })

    // ROTA EDITAR =============================================
    .get(function(req, res) {
        // Busca o contato no Model pelo parâmetro id
        Monografia.findOne({
            _id : req.params.monografia_id
        }, function(error, monografia) {
          // Em caso de erros, envia o erro na resposta
          if (error) {
            res.send(error);
          }
          res.json(monografia);
        });
    })

    // ROTA ATUALIZAR ==========================================
    .put(function(req, res) {
        // Busca o contato no Model pelo parâmetro id
        const monografiaData = req.body;
        const id = req.params.monografia_id;

        Monografia.update(
            {_id: id },
            monografiaData,
            { upsert: true},
            function(error, monografia) {
              if (error) {
                res.send(error);
              }
              res.json(monografia);
        });
    });
};
