const filmeRepository = require('../repositorys/FilmeRepository.js');
const validacaoRequisicaoUtil = require("../utils/ValidacaoRequisicaoUtil.js");
const filmeDTO = require('../dtos/FilmeDTO.js');

module.exports = {

    async cadastrarFilme(filme){
        paramsValidacao = {filme}
        camposObrigInfo = filme != null && validacaoRequisicaoUtil.isCamposObrigInformados([
            filme.nome && filme.caminho && filme.usuarioId
        ]);
        return validacaoRequisicaoUtil.validaProcessoExecutado(paramsValidacao, camposObrigInfo, async (paramsValidacao) => {
            const novoFilme = await filmeRepository.cadastrarFilme(paramsValidacao.filme);
            if(novoFilme != null){
                return filmeDTO.filmeToDTO(novoFilme);
            }
        });
    }, 

    async atualizarFilme(filme) {
        paramsValidacao = {filme}
        camposObrigInfo = filme != null && validacaoRequisicaoUtil.isCamposObrigInformados([
            filme.nome && filme.caminho && filme.usuarioId && filme.id
        ]);
        return validacaoRequisicaoUtil.validaProcessoExecutado(paramsValidacao, camposObrigInfo, async (paramsValidacao) => {
            return await filmeRepository.atualizarFilme(paramsValidacao.filme);
        });      
    },

    async deletarFilme(filmeId, usuarioId) {
        paramsValidacao = {filmeId, usuarioId}
        camposObrigInfo = validacaoRequisicaoUtil.isCamposObrigInformados([
            filmeId, usuarioId
        ]);
        return validacaoRequisicaoUtil.validaProcessoExecutado(paramsValidacao, camposObrigInfo, async (paramsValidacao) => {
            return await filmeRepository.deletarFilme(paramsValidacao.filmeId, paramsValidacao.usuarioId);
        });
    },

    async listarFilmesUsuario(usuarioId) {
        paramsValidacao = {usuarioId};
        camposObrigInfo = validacaoRequisicaoUtil.isCamposObrigInformados([usuarioId]);
        return validacaoRequisicaoUtil.validaProcessoExecutado(paramsValidacao, camposObrigInfo, async (paramsValidacao) => {
            const filmes = await filmeRepository.listarFilmesUsuario(paramsValidacao.usuarioId);
            if(filmes != null){
                const filmesDTO = [];
                filmes.forEach(umFilme => {
                    filmesDTO.push(filmeDTO.filmeToDTOcomId(umFilme));
                });
                return filmesDTO;
            }
            return filmes;
        });
    }, 

    async buscarFilmePorId(filmeId) {
        paramsValidacao = {filmeId};
        camposObrigInfo = validacaoRequisicaoUtil.isCamposObrigInformados([filmeId]);
        return validacaoRequisicaoUtil.validaProcessoExecutado(paramsValidacao, camposObrigInfo, async (paramsValidacao) => {
            const filme = await filmeRepository.buscarFilmePorId(paramsValidacao.filmeId);
            if(filme != null){
                return filmeDTO.filmeToDTOcomId(filme);
            }
            return filme;
        });    
    },

    async buscarFilmesPorNome(nomeFilme, usuarioId) {
        paramsValidacao = {nomeFilme, usuarioId};
        camposObrigInfo = validacaoRequisicaoUtil.isCamposObrigInformados([nomeFilme, usuarioId]);
        return validacaoRequisicaoUtil.validaProcessoExecutado(paramsValidacao, camposObrigInfo, async (paramsValidacao) => {
            const filmes = await filmeRepository.buscarFilmesPorNome(paramsValidacao.nomeFilme, paramsValidacao.usuarioId);
            if(filmes != null){
                const filmesDTO = [];
                filmes.forEach(umFilme => {
                    filmesDTO.push(filmeDTO.filmeToDTOcomId(umFilme));
                });
                return filmesDTO;
            }
            return filmes;
        });
    },

    async buscarFilmesPorListaCategoria(categorias, nomeFilme, usuarioId) {
        paramsValidacao = {categorias, nomeFilme, usuarioId};
        camposObrigInfo = validacaoRequisicaoUtil.isCamposObrigInformados([nomeFilme, usuarioId]);
        return validacaoRequisicaoUtil.validaProcessoExecutado(paramsValidacao, camposObrigInfo, async (paramsValidacao) => {
            var filmes;
            if(categorias){
                filmes = await filmeRepository.buscarFilmesPorListaCategoria(paramsValidacao.categorias, paramsValidacao.nomeFilme, paramsValidacao.usuarioId);
            }else{
                filmes = await filmeRepository.buscarFilmesPorNome(paramsValidacao.nomeFilme, paramsValidacao.usuarioId);
            }
            if(filmes != null){
                const filmesDTO = [];
                filmes.forEach(umFilme => {
                    filmesDTO.push(filmeDTO.filmeToDTOcomId(umFilme));
                });
                return filmesDTO;
            }
            return filmes;
        });    
    }
    
}


