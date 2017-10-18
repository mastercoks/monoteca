module.exports = function(rota, Usuario) {
  /** Rotas que irão terminar em '/usuarios/:usuario_id' - (servem tanto para GET by Id, PUT, &amp; DELETE) */
  rota.route('/usuarios/:usuario_id')

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
}
