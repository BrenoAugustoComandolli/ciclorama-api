const usuarioRepository = require('../repositorys/UsuarioRepository.js');
const validacaoRequisicaoUtil = require("../utils/ValidacaoRequisicaoUtil.js");
const validacaoSenhaUtil = require("../utils/ValidacaoSenhaUtil.js");
const tokenUtil = require("../utils/TokenUtil.js");
const usuarioDTO = require('../dtos/UsuarioDTO.js');

module.exports = {

    async cadastrarUsuario(usuario) {
        paramsValidacao = {usuario}
        camposObrigInfo = usuario != null && validacaoRequisicaoUtil.isCamposObrigInformados([
            usuario.nome, usuario.email, usuario.senha
        ]);
        return validacaoRequisicaoUtil.validaProcessoExecutado(paramsValidacao, camposObrigInfo, async (paramsValidacao) => {
            validacaoSenhaUtil.validarForcaSenha(paramsValidacao.usuario.senha);
            paramsValidacao.usuario.senha = await validacaoSenhaUtil.criptogravarSenha(paramsValidacao.usuario.senha);
            const novoUsuario = await usuarioRepository.cadastrarUsuario(paramsValidacao.usuario);
            if(novoUsuario != null){
                return usuarioDTO.usuarioToDTO(novoUsuario);
            }
        });
    },

    async atualizarUsuario(usuario) {
        paramsValidacao = {usuario}
        camposObrigInfo = usuario != null && validacaoRequisicaoUtil.isCamposObrigInformados([
            usuario.id, usuario.nome, usuario.email
        ]);
        return validacaoRequisicaoUtil.validaProcessoExecutado(paramsValidacao, camposObrigInfo, async (paramsValidacao) => {
            if(usuario.senha){
                validacaoSenhaUtil.validarForcaSenha(paramsValidacao.usuario.senha);
                paramsValidacao.usuario.senha = await validacaoSenhaUtil.criptogravarSenha(paramsValidacao.usuario.senha);
            }else{
                usuarioAntes = await usuarioRepository.buscarUsuarioPorId(usuario.id);
                paramsValidacao.usuario.senha = usuarioAntes.USU_SENHA;
            }
            return await usuarioRepository.atualizarUsuario(paramsValidacao.usuario);
        });
    },

    async deletarUsuario(usuarioId) {
        paramsValidacao = {usuarioId}
        camposObrigInfo = validacaoRequisicaoUtil.isCamposObrigInformados([usuarioId]);
        return validacaoRequisicaoUtil.validaProcessoExecutado(paramsValidacao, camposObrigInfo, async (paramsValidacao) => {
            return await usuarioRepository.deletarUsuario(paramsValidacao.usuarioId);
        });
    },

    async buscarUsuarioPorEmail(email){
        paramsValidacao = {email}
        camposObrigInfo = validacaoRequisicaoUtil.isCamposObrigInformados([email]);
        return validacaoRequisicaoUtil.validaProcessoExecutado(paramsValidacao, camposObrigInfo, async (paramsValidacao) => {
            const usuario = await usuarioRepository.buscarUsuarioPorEmail(paramsValidacao.email);
            if(usuario != null){
                return usuarioDTO.usuarioToDTOcomId(usuario);
            }
            return {};
        });
    },

    async buscarUsuarioPorId(id){
        paramsValidacao = {id}
        camposObrigInfo = validacaoRequisicaoUtil.isCamposObrigInformados([id]);
        return validacaoRequisicaoUtil.validaProcessoExecutado(paramsValidacao, camposObrigInfo, async (paramsValidacao) => {
            const usuario = await usuarioRepository.buscarUsuarioPorId(paramsValidacao.id);
            if(usuario != null){
                return usuarioDTO.usuarioToDTOcomId(usuario);
            }
            return {};
        });
    },

    async logar(email, senha) {
        paramsValidacao = {email, senha}
        camposObrigInfo = validacaoRequisicaoUtil.isCamposObrigInformados([
            email, senha
        ]);
        return validacaoRequisicaoUtil.validaProcessoExecutado(paramsValidacao, camposObrigInfo, async (paramsValidacao) => {
            const usuario = await usuarioRepository.buscarUsuarioPorEmail(paramsValidacao.email);
            if(usuario != null){
                const usuarioDto = usuarioDTO.usuarioToDTOComSenhaAndId(usuario);
                if(await validacaoSenhaUtil.compararSenha(paramsValidacao.senha, usuarioDto.senha)){
                    return {token: tokenUtil.gerarToken(usuarioDto.id)};
                }else{
                    return {authentication: 'Unauthorized'};
                }
            }else{
                return {authentication: 'Unauthorized'};
            }
        });
    }

}