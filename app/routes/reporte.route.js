module.exports = function(router) {
  // INICIANDO ==============================================
  // Define as bibliotecas que iremos utilizar
  const mongoose = require('mongoose');
  const Reporte = mongoose.model('Reporte');  //retorna a classe de modelo 'Reporte'

  router.route('/reportes')
    // ROTA BUSCAR ============================================
    .get(function(req, res) {
      // utilizaremos o mongoose para buscar todos os contatos no BD
      Reporte.find(function(error, reportes) {
        // Em caso de erros, envia o erro na resposta
        if (error) {
          res.send(error);
        }
        // Retorna todos os reportes encontrados no BD
        res.json(reportes);
      });
    })

    // ROTA CRIAR =============================================
    .post(function(req, res) {
      // Cria um reporte, as informações são enviadas por uma requisição AJAX pelo Angular
      Reporte.find({cpf: req.body.cpf}, function(error, reporte) {
        if (error) {
          res.send(error);
        }
        Reporte.create({
          descricao: req.body.descricao,
          retorno: req.body.retorno,
          id_reporte: req.body.id_reporte,
          id_usuario: req.body.id_usuario,
          data_retorno: req.body.data_retorno

        }, function(error, reporte) {
          // Em caso de erros, envia o erro na resposta
          if (error) {
            res.send(error);
          }
          Reporte.find(function(error, reportes) {
            if (error) {
              res.send(error);
            }
            res.json(reportes);
          })
        });
      })
    });
  router.route('/reportes/:reporte_id')
    // ROTA DELETAR ============================================
    .delete(function(req, res) {
      // Remove o reporte no Model pelo parâmetro _id
      Reporte.remove({
        _id : req.params.reporte_id
      }, function(error, reporte) {
        // Em caso de erros, envia o erro na resposta
        if (error) {
          res.send(error);
        }
        // Busca novamente todos os contatos após termos removido o registro
        Reporte.find(function(err, reportes) {
          if (error) {
            res.send(error);
          }
          res.json(reportes);
        });
      });
    })

    // ROTA EDITAR =============================================
    .get(function(req, res) {
        // Busca o contato no Model pelo parâmetro id
        Reporte.findOne({
            _id : req.params.reporte_id
        }, function(error, reporte) {
          // Em caso de erros, envia o erro na resposta
          if (error) {
            res.send(error);
          }
          res.json(reporte);
        });
    })

    // ROTA ATUALIZAR ==========================================
    .put(function(req, res) {
        // Busca o contato no Model pelo parâmetro id
        const reporteData = req.body;
        const id = req.params.reporte_id;

        Reporte.update(
            {_id: id },
            reporteData,
            { upsert: true},
            function(error, reporte) {
              if (error) {
                res.send(error);
              }
              res.json(reporte);
        });
    });
};
