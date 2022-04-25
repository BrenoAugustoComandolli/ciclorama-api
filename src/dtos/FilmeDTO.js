module.exports = {

    filmeToDTO(filme){
        return {
            nome: filme.FIL_NOME,
            capaUrl: filme.FIL_CAPAURL,
            sinopse: filme.FIL_SINOPSE,
            caminho: filme.FIL_CAMINHO,
            trailerUrl: filme.FIL_TRAILERURL,
            usuarioId: filme.FIL_USUID
        }
    },

    filmeToDTOcomId(filme){
        return {
            id: filme.FIL_ID,
            nome: filme.FIL_NOME,
            capaUrl: filme.FIL_CAPAURL,
            sinopse: filme.FIL_SINOPSE,
            caminho: filme.FIL_CAMINHO,
            trailerUrl: filme.FIL_TRAILERURL,
            usuarioId: filme.FIL_USUID
        }
    },
    
}