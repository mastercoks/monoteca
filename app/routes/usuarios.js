module.exports = function(rota, Usuario) {
  /** Rotas que irão terminar em '/usuarios' - (servem tanto para: GET All &amp; POST) */
  rota.route('/usuarios')

  /** 1) Método: Criar Usuario (acessar em: POST http://localhost:8000/usuarios) */
  .post(function(req, res) {
    var usuario = new Usuario();

    usuario.nome = req.body.nome;
    usuario.cpf = req.body.cpf;
    usuario.curso = req.body.curso;
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
}
