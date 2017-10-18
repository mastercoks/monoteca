module.exports = function(rota, app, Usuario, jwt) {
  /** Rota que irão terminar em '/autenticar' (acessar em: GET http://localhost:8000/autenticar) */
  rota.post('/autenticar', function(req, res) {

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
            expiresIn: 86400 //o token irá expirar em 24 horas (em segundos)
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
}
