/**
 * Arquivo: monografia.js
 * Descrição: Arquivo onde trataremos o modelo do projeto.
 * Definição dos esquemas para serem utilizadas na Base de Dados (MongoDb)
 * Author: Matheus Coqueiro Andrade
 * Data de Criação: 18/10/2017
 * Ultima Modificação: 18/10/2017
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MonografiaSchema = new Schema({
  titulo:           String,
  resumo:           String,
  autor:            [{ nome: String, lattes: String }],
  data_publicacao:  { type: Date },
  pdf:              String
});

module.exports = mongoose.model('Monografia', MonografiaSchema);
