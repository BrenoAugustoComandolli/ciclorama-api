class SecurityConsts {
    static get TAMANHO_MIN_SENHA() {
        return 5;
    }
    static get TAMANHO_MAX_SENHA() {
        return 32;
    }
    static get CARACTERES_MIN_NUMERICOS() {
        return 2;
    }
    static get CARACTERES_MIN_MAIUSCULA() {
        return 1;
    }
    static get CARACTERES_MIN_MINUSCULA() {
        return 1;
    }
    static get CARACTERES_MIN_SIMBOLOS() {
        return 1;
    }
    static get SECRET() {
        return 'QDGVHRBS3745635';
    }
    static get EXPIRACAO_TOKEN() {
        return 3600;
    }
}

module.exports = SecurityConsts;