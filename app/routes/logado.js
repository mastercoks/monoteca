/**
 * Arquivo: logado.js
 * Descrição: Arquivo responsável por criar a rota 'logado'.
 * Author: Matheus Coqueiro Andrade
 * Data de Criação: 18/10/2017
 * Ultima Modificação: 18/10/2017
 */

module.exports = function(rota) {
  /** Rota de Teste para sabermos se tudo está realmente funcionando (acessar através: GET: http://localhost:8000) */
  rota.get('/logado', function(req, res) {
    res.send('Bem vindo Usuario!');
  });
}
