/**
 * Arquivo: autenticar.js
 * Descrição: Arquivo responsável por criar a rota 'autenticar', onde será
 * verificado o email e a senha do usuario e retornando um token.
 * Author: Matheus Coqueiro Andrade
 * Data de Criação: 18/10/2017
 * Ultima Modificação: 18/10/2017
 */

 module.exports = function(rota, app) {
   const jwt    = require('jsonwebtoken'); //pacote usado para criar e verificar os tokensr
   const mongoose = require('mongoose');
   const Usuario = mongoose.model('Usuario');  //retorna a classe de modelo 'Usuario'
   const bcrypt = require('bcrypt');

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
        let sucesso = false;
        //Aqui iremos verificar se a senha bate com o que está cadastrado no banco:
        let senha = req.body.senha;
        bcrypt.compare(senha, usuario.senha, function(err, res) {
          if(res) {
            sucesso = true;
          } else {
            sucesso = false;
            console.log(senha, usuario.senha);
          }
        });

        if (sucesso) {
          // caso a senha do usuário seja encontrada.... iremos criar um token:
          const token = jwt.sign(usuario, app.get('superNode-auth'), {
            expiresIn: 86400 //o token irá expirar em 24 horas (em segundos)
          });

          //Aqui iremos retornar a informação do token via JSON:
          res.json({
            success: true,
            message: 'Token criado!!!',
            token: token
          });
        } else {
          res.json({
            success: false,
            message: 'Autenticação do Usuário falhou. Senha incorreta!'
          });
        }
      }
    });
  });
}
