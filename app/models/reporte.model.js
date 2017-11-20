/**
 * Arquivo: reporte.model.js
 * Descrição: Arquivo onde trataremos o modelo do projeto.
 * Definição dos esquemas para serem utilizadas na Base de Dados (MongoDb)
 * Author: Matheus Coqueiro Andrade
 * Data de Criação: 19/11/2017
 * Ultima Modificação: 19/11/2017
 */

var mongoose = require('mongoose');

var ReporteSchema = new mongoose.Schema({
  descricao: {
    type:     String,
    required: true
  },
  retorno: {
    type:     String
  },
  id_monografia: {
    type:     String,
    required: true
  },
  id_usuario: {
    type:     String,
    required: true
  },
  data_retorno: {
    type:     String
  },
  data_reporte: {
    type:     Date,
    default:  Date.now
  }
});

mongoose.model('Reporte', ReporteSchema);
