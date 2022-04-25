const PasswordException = require('../exceptions/PasswordException.js');

module.exports = {
    
    isCamposObrigInformados(listaCampos){
        camposInformados = true;
        listaCampos.forEach(umCampo => {
            if(umCampo == null){
                camposInformados = false;
            }
        });
        return camposInformados;
    },

    async validaProcessoExecutado(paramsValidacao, camposObrigInfo, operacao){
        try {
            if(camposObrigInfo){
                return await operacao(paramsValidacao);
            }
            return {mensagemErro: "Conteúdo do corpo incorreto!"}
        }catch(err){
            return trataErroInesperado(err);
        }
    },

}

function trataErroInesperado(err){
    if(err.name == 'SequelizeForeignKeyConstraintError'){
        return null;
    }else if (err.name == 'SequelizeUniqueConstraintError'){
        return {mensagemErro: 'Item já cadastrado no sistema'};
    }else if(err instanceof PasswordException){
        return {mensagemErro: err.message};
    }
    return {error: 'INTERNAL SERVER ERROR'}
}