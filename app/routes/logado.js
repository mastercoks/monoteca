module.exports = function(rota) {
  /** Rota de Teste para sabermos se tudo está realmente funcionando (acessar através: GET: http://localhost:8000) */
  rota.get('/logado', function(req, res) {
    res.send('Bem vindo Usuario!');
  });
}
