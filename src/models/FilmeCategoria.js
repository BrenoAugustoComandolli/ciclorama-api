const sequelize = require('sequelize');
const conexao = require('./Conection.js');

const FilmeCategoria = conexao.define('TB_FILME_CATEGORIA', {
    FCA_ID: {
      type: sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    }
}, 
{
    timestamps: false,
    freezeTableName: true
});

module.exports = FilmeCategoria;