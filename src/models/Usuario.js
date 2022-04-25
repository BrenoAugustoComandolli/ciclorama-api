const sequelize = require('sequelize');
const conexao = require('./Conection.js');
const Filme = require('./Filme.js');
const Categoria = require('./Categoria.js');

const Usuario = conexao.define('TB_USUARIO', {
  USU_ID: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  USU_NOME: {
    type: sequelize.STRING(50),
    allowNull: false
  },
  USU_EMAIL: {
      type: sequelize.STRING(255),
      allowNull: false,
      unique: true
  },
  USU_SENHA: {
      type: sequelize.STRING(255),
      allowNull: false
  },
  USU_IMAGEMURL: sequelize.TEXT
}, 
{
  timestamps: false,
  freezeTableName: true
});

Usuario.hasMany(Filme, {
  foreignKey: {
    name: 'FIL_USUID',
    allowNull: false,
  },
  targetKey: 'USU_ID', 
  onDelete: 'cascade', 
});

Usuario.hasMany(Categoria, {
  foreignKey: {
    name: 'CAT_USUID',
    allowNull: false,
  },
  targetKey: 'USU_ID', 
  onDelete: 'cascade', 
});

module.exports = Usuario;