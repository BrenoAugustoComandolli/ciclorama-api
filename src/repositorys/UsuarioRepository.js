const Usuario = require('../models/Usuario.js');

module.exports = {
    async cadastrarUsuario(usuario){
        const novoUsuario = await Usuario.create({
            USU_NOME: usuario.nome,
            USU_EMAIL: usuario.email,
            USU_SENHA: usuario.senha,
            USU_IMAGEMURL: usuario.imagemUrl
        });
        return novoUsuario;
    },

    async atualizarUsuario(usuario) {
        const novoUsuario = await Usuario.update({
            USU_NOME: usuario.nome,
            USU_EMAIL: usuario.email,
            USU_SENHA: usuario.senha,
            USU_IMAGEMURL: usuario.imagemUrl
        },
        { where : {
            USU_ID: usuario.id
        }});
        return novoUsuario;
    },

    async deletarUsuario(usuarioId) {
        return await Usuario.destroy({
            where:{
                USU_ID: usuarioId
            }
        });
    },

    async buscarUsuarioPorEmail(email){
        const usuario = await Usuario.findOne({
            where:{
                USU_EMAIL: email
            }
        });
        return usuario;
    },

    async buscarUsuarioPorId(id){
        const usuario = await Usuario.findOne({
            where:{
                USU_ID: id
            }
        });
        return usuario;
    },

    async grvarTokenAcesso(usuarioId, token){
        const novoUsuario = await Usuario.update({
            USU_TOKEN: token
        },
        { where : {
            USU_ID: usuarioId
        }});
        return novoUsuario;
    },

    async removerTokenAcesso(usuarioId){
        const novoUsuario = await Usuario.update({
            USU_TOKEN: null
        },
        { where : {
            USU_ID: usuarioId
        }});
        return novoUsuario;
    }

}

