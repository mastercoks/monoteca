/**
 * Arquivo: usuario.model.js
 * Descrição: Arquivo onde trataremos o modelo do projeto.
 * Definição dos esquemas para serem utilizadas na Base de Dados (MongoDb)
 * Author: Matheus Coqueiro Andrade
 * Data de Criação: 07/10/2017
 * Ultima Modificação: 19/11/2017
 */

const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  nome: {
    type:     String,
    required: true
  },
  email: {
    type:     String,
    required: true
  },
  cpf: {
    type:     String,
    required: true
  },
  instituicao: {
    type:     String,
    required: true
  },
  curso: {
    type:     String,
    required: true
  },
  senha: {
    type:     String,
    required: true
  },
  data_cadastro: {
    type:     Date,
    default:  Date.now
  }
});

mongoose.model('Usuario', UsuarioSchema);
