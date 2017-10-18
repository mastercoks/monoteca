module.exports = function(rota) {
  rota.get('/', function(req, res) {
    res.send('Bem vindo a Monoteca!');
  });
}
