const filmeService = require('../services/FilmeService.js');
const respostaRequisicaoUtil = require("../utils/RespostaRequisicaoUtil.js");

module.exports = {

    async cadastrarFilme(filme, res) {
        const resp = await filmeService.cadastrarFilme(filme);
        return respostaRequisicaoUtil.respostaStatusCriacao(resp, res)
    },
    
    async atualizarFilme(filme, res) {
        const resp = await filmeService.atualizarFilme(filme);
        return respostaRequisicaoUtil.respostaStatusAtualiza(resp, res)
    },

    async deletarFilme(filmeId, usuarioId, res) {
        const resp = await filmeService.deletarFilme(filmeId, usuarioId);
        return respostaRequisicaoUtil.respostaStatusAtualiza(resp, res)
    },

    async listarFilmesUsuario(usuarioId, res) {
        const resp = await filmeService.listarFilmesUsuario(usuarioId);
        return respostaRequisicaoUtil.respostaStatusConsulta(resp, res)
    },

    async buscarFilmePorId(filmeId, res) {
        const resp = await filmeService.buscarFilmePorId(filmeId);
        return respostaRequisicaoUtil.respostaStatusConsulta(resp, res)
    },

    async buscarFilmesPorNome(nomeFilme, usuarioId, res) {
        const resp = await filmeService.buscarFilmesPorNome(nomeFilme, usuarioId);
        return respostaRequisicaoUtil.respostaStatusConsulta(resp, res)
    },
    
    async buscarFilmesPorListaCategoria(categorias, nomeFilme, usuarioId, res) {
        const resp = await filmeService.buscarFilmesPorListaCategoria(categorias, nomeFilme, usuarioId);
        return respostaRequisicaoUtil.respostaStatusConsulta(resp, res)
    },
    
}