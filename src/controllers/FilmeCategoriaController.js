const filmeCategoriaService = require('../services/FilmeCategoriaService.js');
const respostaRequisicaoUtil = require("../utils/RespostaRequisicaoUtil.js");

module.exports = {

    async definirCategoriaFilme(filmeId, nomeCategoria, res) {
        const resp = await filmeCategoriaService.definirCategoriaFilme(filmeId, nomeCategoria);
        return respostaRequisicaoUtil.respostaStatusCriacao(resp, res)
    },

    async removerCategoriaFilme(filmeId, nomeCategoria, res) {
        const resp = await filmeCategoriaService.removerCategoriaFilme(filmeId, nomeCategoria);
        return respostaRequisicaoUtil.respostaStatusAtualiza(resp, res)
    }

}