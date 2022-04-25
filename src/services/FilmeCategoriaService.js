const filmeCategoriaRepository = require('../repositorys/FilmeCategoriaRepository.js');
const categoriaRepository = require('../repositorys/CategoriaRepository.js');
const validacaoRequisicaoUtil = require("../utils/ValidacaoRequisicaoUtil.js");
const categoriaFilmeDTO = require('../dtos/CategoriaFilmeDTO.js');

module.exports = {

    async definirCategoriaFilme(filmeId, nomeCategoria) {
        paramsValidacao = {filmeId, nomeCategoria}
        camposObrigInfo = validacaoRequisicaoUtil.isCamposObrigInformados([
            filmeId, nomeCategoria
        ]);
        return validacaoRequisicaoUtil.validaProcessoExecutado(paramsValidacao, camposObrigInfo, async (paramsValidacao) => {
            const categoria = await categoriaRepository.buscarCategoriaPorNome(paramsValidacao.nomeCategoria);
            if(categoria != null){
                const novoFilmeCategoria = await filmeCategoriaRepository.definirCategoriaFilme(paramsValidacao.filmeId, categoria.CAT_ID);
                if(novoFilmeCategoria != null){
                    return categoriaFilmeDTO.filmeCategoriaToDTOComId(novoFilmeCategoria);
                }
            }else{
                return { mensagemErro: "Categoria não existe"};
            }
        });
    },

    async removerCategoriaFilme(filmeId, nomeCategoria) {
        paramsValidacao = {filmeId, nomeCategoria};
        camposObrigInfo = validacaoRequisicaoUtil.isCamposObrigInformados([
            filmeId, nomeCategoria
        ]);
        return validacaoRequisicaoUtil.validaProcessoExecutado(paramsValidacao, camposObrigInfo, async (paramsValidacao) => {
            const categoria = await categoriaRepository.buscarCategoriaPorNome(paramsValidacao.nomeCategoria);
            if(categoria != null){
                return await filmeCategoriaRepository.removerCategoriaFilme(paramsValidacao.filmeId, categoria.CAT_ID);
            }else{
                return { mensagemErro: "Categoria não existe"};
            }
        });     
    }

}