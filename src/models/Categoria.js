const sequelize = require('sequelize');
const conexao = require('./Conection.js');

const Categoria = conexao.define('TB_CATEGORIA', {
  CAT_ID: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  CAT_NOME: {
    type: sequelize.STRING(50),
    allowNull: false,
    unique: true
  }
}, 
{
  timestamps: false,
  freezeTableName: true
});

module.exports = Categoria;