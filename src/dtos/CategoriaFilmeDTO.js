module.exports = {

    filmeCategoriaToDTOComId(filmeCategoria){
        return {
            id: filmeCategoria.FCA_ID,
            filme: filmeCategoria.FCA_FILID,
            categoria: filmeCategoria.FCA_CATID
        }
    }
    
}