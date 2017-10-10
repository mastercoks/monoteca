/**
 * Arquivo: usuario.js
 * Author: Matheus Coqueiro Andrade
 * Description: Arquivo onde trataremos o modelo do projeto.
 * Definição dos esquemas para serem utilizadas na Base de Dados (MongoDb)
 * Data: 07/10/2017
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsuarioSchema = new Schema({
  nome:         String,
  cpf:          String,
  curso:        String,
  universidade: String,
  email:        String,
  senha:        String
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
