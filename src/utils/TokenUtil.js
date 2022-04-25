const securityConsts = require('../constants/securityConsts.js');
const jwt = require("jsonwebtoken");

module.exports = {

    gerarToken(usuarioId){
        return jwt.sign({usuarioId: usuarioId}, 
                         securityConsts.SECRET, 
                        {expiresIn: securityConsts.EXPIRACAO_TOKEN}
        );
    },

    verificarToken(token){
        return jwt.verify(token, securityConsts.SECRET, (err) => {
            if(err){
                return {err: err};
            }else{
                return;
            }
        });
    }

}