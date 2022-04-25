const categoriaService = require('../services/CategoriaService.js');
const respostaRequisicaoUtil = require("../utils/RespostaRequisicaoUtil.js");

module.exports = {

    async cadastrarCategoria(categoria, res) {
        const resp = await categoriaService.cadastrarCategoria(categoria);
        return respostaRequisicaoUtil.respostaStatusCriacao(resp, res)
    },

    async deletarCategoria(nomeCategoria, usuarioId, res) {
        const resp = await categoriaService.deletarCategoria(nomeCategoria, usuarioId);
        return respostaRequisicaoUtil.respostaStatusAtualiza(resp, res)
    },

    async listarCategoriasUsuario(usuarioId, res) {
        const resp = await categoriaService.listarCategoriasUsuario(usuarioId);
        return respostaRequisicaoUtil.respostaStatusConsulta(resp, res)
    }

}