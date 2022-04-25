module.exports = {

    categoriaToDTO(categoria){
        return {
            nome: categoria.CAT_NOME,
            cor: categoria.CAT_COR,
            iconeUrl: categoria.CAT_ICONEURL,
            usuarioId: categoria.CAT_USUID
        }
    },

    categoriaToDTOComId(categoria){
        return {
            id: categoria.CAT_ID,
            nome: categoria.CAT_NOME,
            cor: categoria.CAT_COR,
            iconeUrl: categoria.CAT_ICONEURL,
            usuarioId: categoria.CAT_USUID
        }
    }
    
}
