module.exports = function(rota, Monografia) {
  /** Rotas que irão terminar em '/usuarios' - (servem tanto para: GET All &amp; POST) */
  rota.route('/monografias')

  /** 1) Método: Criar Monografia (acessar em: POST http://localhost:8000/monografias) */
  .post(function(req, res) {
    var monografia = new Monografia();

    monografia.titulo = req.body.titulo;
    monografia.resumo = req.body.resumo;
    monografia.autores = req.body.autores;
    monografia.data_publicacao = req.body.data_publicacao;
    monografia.pdf = req.body.pdf;

    monografia.save(function(error) {
      if(error) {
        res.send(error);
      }
      res.json({
        message: 'Monografia criada com sucesso!'
      });
    });
  })
  /** 2) Método: Selecionar Todos (acessar em: GET http://locahost:8000/monografias) */
  .get(function(req, res) {

    Monografia.find(function(error, monografias) {
      if(error) {
        res.send(error);
      }
      res.json(monografias);
    });
  });
}
