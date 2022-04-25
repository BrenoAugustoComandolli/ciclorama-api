const securityConsts = require('../constants/securityConsts.js');
const PasswordException = require('../exceptions/PasswordException.js');
const bcrypt = require('bcrypt');

module.exports = {
    
    validarForcaSenha(senha){
        validaTamanhoSenha(senha);
        verificarForcaSenhaSemHash(senha);
    },

    async criptogravarSenha(senha){
        return await bcrypt.hash(senha, 8);
    },

    async compararSenha(senha, hash){
        return await bcrypt.compare(senha, hash);
    }

}

function validaTamanhoSenha(senha){
    if(senha == ""){
        throw new PasswordException("Senha não informada!");
    }else if(senha.length < securityConsts.TAMANHO_MIN_SENHA || senha.length > securityConsts.TAMANHO_MAX_SENHA) {
        throw new PasswordException("Senha com comprimento inválido! (MAX: "+
        securityConsts.TAMANHO_MAX_SENHA+", MIN: "+securityConsts.TAMANHO_MIN_SENHA+")");
    }
}

function verificarForcaSenhaSemHash(senha) {
    var numericos = 0;    
    var maiusculas = 0;   
    var minusculas = 0;
    var simbolos = 0;
    
    Array.from(senha).forEach(umCarecter => {
        if (umCarecter >= '0' && umCarecter <= '9') {
            numericos++;
        }else if (umCarecter >= 'A' && umCarecter <= 'Z') {
            maiusculas++;
        }else if (umCarecter >= 'a' && umCarecter <= 'z') {
            minusculas++;
        }else {
            simbolos++;
        }
    });
    verificarQtdMinimaPadraoSenha(numericos, maiusculas, minusculas, simbolos);
}

function verificarQtdMinimaPadraoSenha(numericos, maiusculas, minusculas, simbolos) {
    if(numericos < securityConsts.CARACTERES_MIN_NUMERICOS) {
        throw new PasswordException("Quantidade mínima de numéricos na senha: "+securityConsts.CARACTERES_MIN_NUMERICOS);
    }
    if(maiusculas < securityConsts.CARACTERES_MIN_MAIUSCULA) {
        throw new PasswordException("Quantidade mínima de maiúsculas na senha: "+securityConsts.CARACTERES_MIN_MAIUSCULA);
    }
    if(minusculas < securityConsts.CARACTERES_MIN_MINUSCULA) {
        throw new PasswordException("Quantidade mínima de minúsculas na senha: "+securityConsts.CARACTERES_MIN_MINUSCULA);
    }
    if(simbolos < securityConsts.CARACTERES_MIN_SIMBOLOS) {
        throw new PasswordException("Quantidade mínima de símbolos na senha: "+securityConsts.CARACTERES_MIN_SIMBOLOS);
    }
}