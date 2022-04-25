const Categoria = require('../models/Categoria.js');

module.exports = {
    
    async cadastrarCategoria(categoria){
        const novaCategoria = await Categoria.create({
            CAT_NOME: categoria.nome,
            CAT_USUID: categoria.usuarioId
        });
        return novaCategoria;
    },

    async atualizarCategoria(categoria) {
        const novaCategoria = await Categoria.update({
            CAT_NOME: categoria.nome,
            CAT_USUID: categoria.usuarioId
        },
        { where : {
            CAT_ID: categoria.id
        }});
        return novaCategoria;
    },

    async deletarCategoria(nomeCategoria, usuarioId) {
        return await Categoria.destroy({
            where:{
                CAT_NOME: nomeCategoria,
                CAT_USUID: usuarioId
            }
        });
    },

    async listarCategoriasUsuario(usuarioId) {
        const categorias = await Categoria.findAll({
            where:{
                CAT_USUID: usuarioId
            }
        });
        return categorias;
    },

    async buscarCategoriaPorNome(nomeCategoria) {
        const categoria = await Categoria.findOne({
            where:{
                CAT_NOME: nomeCategoria
            }
        });
        return categoria;
    }

}

