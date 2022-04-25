const usuarioService = require('../services/UsuarioService.js');
const respostaRequisicaoUtil = require("../utils/RespostaRequisicaoUtil.js");

module.exports = {

    async cadastrarUsuario(usuario, res) {
        const resp = await usuarioService.cadastrarUsuario(usuario);
        return respostaRequisicaoUtil.respostaStatusCriacao(resp, res);
    },

    async atualizarUsuario(usuario, res) {
        const resp = await usuarioService.atualizarUsuario(usuario);
        return respostaRequisicaoUtil.respostaStatusAtualiza(resp, res);
    },

    async deletarUsuario(usuarioId, res) {
        const resp = await usuarioService.deletarUsuario(usuarioId);
        return respostaRequisicaoUtil.respostaStatusAtualiza(resp, res);
    },

    async buscarUsuarioPorEmail(email, res) {
        const resp = await usuarioService.buscarUsuarioPorEmail(email);
        return respostaRequisicaoUtil.respostaStatusConsulta(resp, res);
    }, 

    async buscarUsuarioPorId(id, res) {
        const resp = await usuarioService.buscarUsuarioPorId(id);
        return respostaRequisicaoUtil.respostaStatusConsulta(resp, res);
    }, 

    async alterarRepositorio(usuarioId, repositorioUrl, res) {
        const resp = await usuarioService.alterarRepositorio(usuarioId, repositorioUrl);
        return respostaRequisicaoUtil.respostaStatusAtualiza(resp, res);
    },

    async logar(email, senha, res) {
        const resp = await usuarioService.logar(email, senha);
        return respostaRequisicaoUtil.respostaStatusConsulta(resp, res);
    }
    
}