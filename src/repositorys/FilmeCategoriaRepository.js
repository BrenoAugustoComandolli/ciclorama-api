const FilmeCategoria = require('../models/FilmeCategoria.js');

module.exports = {
    
    async definirCategoriaFilme(filmeId, categoriaId){
        const novoFilmeCategoria = await FilmeCategoria.create({
            FCA_FILID: filmeId,
            FCA_CATID: categoriaId
        })
        return novoFilmeCategoria;
    },

    async removerCategoriaFilme(filmeId, categoriaId){
        return await FilmeCategoria.destroy({
            where:{
                FCA_FILID: filmeId,
                FCA_CATID: categoriaId
            }
        })
    }

}