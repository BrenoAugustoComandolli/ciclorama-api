module.exports = {

    usuarioToDTO(usuario){
        return {
            nome: usuario.USU_NOME,
            email: usuario.USU_EMAIL,
            imagemUrl: usuario.USU_IMAGEMURL
        }
    },

    usuarioToDTOcomId(usuario){
        return {
            id: usuario.USU_ID,
            nome: usuario.USU_NOME,
            email: usuario.USU_EMAIL,
            imagemUrl: usuario.USU_IMAGEMURL
        }
    },

    usuarioToDTOComSenhaAndId(usuario){
        return {
            id: usuario.USU_ID,
            nome: usuario.USU_NOME,
            senha: usuario.USU_SENHA,
            email: usuario.USU_EMAIL,
            imagemUrl: usuario.USU_IMAGEMURL
        }
    }
    
}
