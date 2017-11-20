/**
 * Arquivo: monografia.model.js
 * Descrição: Arquivo onde trataremos o modelo do projeto.
 * Definição dos esquemas para serem utilizadas na Base de Dados (MongoDb)
 * Author: Matheus Coqueiro Andrade
 * Data de Criação: 18/10/2017
 * Ultima Modificação: 19/11/2017
 */

var mongoose = require('mongoose');

var MonografiaSchema = new mongoose.Schema({
  titulo: {
    type:     String,
    required: true
  },
  resumo: {
    type:     String,
    required: true
  },
  autor: {
    nome: {
      type:     String,
      required: true
    },
    lattes: String
  },
  arquivo: {
    type:     String,
    required: true
  },
  data_postagem: {
    type:     Date,
    default:  Date.now
  },
  id_usuario: String
});

mongoose.model('Monografia', MonografiaSchema);
