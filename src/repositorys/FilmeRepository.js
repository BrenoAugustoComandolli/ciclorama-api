const Filme = require('../models/Filme.js');
const Categoria = require('../models/Categoria.js');
const sequelize = require('sequelize');

module.exports = {
    
    async cadastrarFilme(filme){
        const novoFilme = await Filme.create({
            FIL_NOME: filme.nome,
            FIL_CAPAURL: filme.capaUrl,
            FIL_SINOPSE: filme.sinopse,
            FIL_CAMINHO: filme.caminho,
            FIL_TRAILERURL: filme.trailerUrl,
            FIL_USUID: filme.usuarioId
        });
        return novoFilme;
    },

    async atualizarFilme(filme) {
        const novaFilme = await Filme.update({
            FIL_NOME: filme.nome,
            FIL_CAPAURL: filme.capaUrl,
            FIL_SINOPSE: filme.sinopse,
            FIL_CAMINHO: filme.caminho,
            FIL_TRAILERURL: filme.trailerUrl,
            FIL_USUID: filme.usuarioId
        },
        { where : {
            FIL_ID: filme.id
        }});
        return novaFilme;
    },

    async deletarFilme(filmeId, usuarioId) {
        return await Filme.destroy({
            where:{
                FIL_ID: filmeId, 
                FIL_USUID: usuarioId
            }
        });
    },

    async listarFilmesUsuario(usuarioId) {
        const filmes = await Filme.findAll({
            where:{
                FIL_USUID: usuarioId
            }
        });
        return filmes;
    },

    async buscarFilmePorId(filmeId) {
        const filme = await Filme.findOne({
            where:{
                FIL_ID: filmeId
            }
        });
        return filme;
    },

    async buscarFilmesPorNome(nomeFilme, usuarioId) {
        const Op = sequelize.Op; 
        const filmes = await Filme.findAll({
            where:{
                FIL_NOME: {[Op.like]: nomeFilme},
                FIL_USUID: usuarioId
            }
        });
        return filmes;
    },

    async buscarFilmesPorListaCategoria(categorias, nomeFilme, usuarioId) {
        const Op = sequelize.Op; 
        const filmes = await Filme.findAll({
            where: {
                FIL_NOME: {[Op.like]: nomeFilme},
                FIL_USUID: usuarioId
            },
            include: [{
                model: Categoria,
                required: true,
                where:{
                    CAT_ID: categorias
                }
            }]
        });
        return filmes;
    }

}

