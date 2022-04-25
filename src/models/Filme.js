const sequelize = require('sequelize');
const conexao = require('./Conection.js');
const Categoria = require('./Categoria.js');
const FilmeCategoria = require('../models/FilmeCategoria.js');

const Filme = conexao.define('TB_FILME', {
  FIL_ID: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  FIL_NOME: {
    type: sequelize.STRING(100),
    allowNull: false
  },
  FIL_CAPAURL: sequelize.TEXT,
  FIL_SINOPSE: sequelize.TEXT,
  FIL_CAMINHO: {
    type: sequelize.TEXT,
    allowNull: false
  },
  FIL_TRAILERURL: sequelize.TEXT
}, 
{
  timestamps: false,
  freezeTableName: true
});

Categoria.belongsToMany(Filme, { 
    through: 'TB_FILME_CATEGORIA',
    foreignKey: {
        name: 'FCA_CATID',
        allowNull: false,
    },
    timestamps: false,
    onDelete: 'cascade',
});

Filme.belongsToMany(Categoria, { 
    through: 'TB_FILME_CATEGORIA',
    foreignKey: {
        name: 'FCA_FILID',
        allowNull: false,
    },
    timestamps: false,
    onDelete: 'cascade'
});

module.exports = Filme;