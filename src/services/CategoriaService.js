const categoriaRepository = require('../repositorys/CategoriaRepository.js');
const validacaoRequisicaoUtil = require("../utils/ValidacaoRequisicaoUtil.js");
const categoriaDTO = require('../dtos/CategoriaDTO.js');

module.exports = {

    async cadastrarCategoria(categoria) {
        paramsValidacao = {categoria}
        camposObrigInfo = categoria != null && validacaoRequisicaoUtil.isCamposObrigInformados([
            categoria.nome, categoria.usuarioId
        ]);
        return validacaoRequisicaoUtil.validaProcessoExecutado(paramsValidacao, camposObrigInfo, async (paramsValidacao) => {
            const novaCategoria = await categoriaRepository.cadastrarCategoria(paramsValidacao.categoria);
            if(novaCategoria != null){
                return categoriaDTO.categoriaToDTO(novaCategoria);
            }
        });
    },

    async atualizarCategoria(categoria) {
        paramsValidacao = {categoria};
        camposObrigInfo = categoria != null && validacaoRequisicaoUtil.isCamposObrigInformados([categoria.id]);
        return validacaoRequisicaoUtil.validaProcessoExecutado(paramsValidacao, camposObrigInfo, async (paramsValidacao) => {
            return await categoriaRepository.atualizarCategoria(paramsValidacao.categoria);
        });     
    },

    async deletarCategoria(nomeCategoria, usuarioId) {
        paramsValidacao = {nomeCategoria, usuarioId};
        camposObrigInfo = validacaoRequisicaoUtil.isCamposObrigInformados([
            nomeCategoria, usuarioId
        ]);
        return validacaoRequisicaoUtil.validaProcessoExecutado(paramsValidacao, camposObrigInfo, async (paramsValidacao) => {
            const resp = await categoriaRepository.deletarCategoria(paramsValidacao.nomeCategoria, paramsValidacao.usuarioId);
            if(resp == 0){
                return {mensagemErro: "Item não existe!"};
            }
            return resp;
        });
    },

    async listarCategoriasUsuario(usuarioId) {
        paramsValidacao = {usuarioId};
        camposObrigInfo = validacaoRequisicaoUtil.isCamposObrigInformados([usuarioId]);
        return validacaoRequisicaoUtil.validaProcessoExecutado(paramsValidacao, camposObrigInfo, async (paramsValidacao) => {
            const categorias = await categoriaRepository.listarCategoriasUsuario(usuarioId);
            if(categorias != null){
                const categoriasDTO = [];
                categorias.forEach(umaCategoria => {
                    categoriasDTO.push(categoriaDTO.categoriaToDTOComId(umaCategoria));
                });
                return categoriasDTO;
            }
            return categorias;
        });
    }

}