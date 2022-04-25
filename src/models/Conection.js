const sequelize = require('sequelize');

const Conexao = new sequelize('cicloramabd', 'breno', 'breno', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

Conexao.authenticate()
.then(() => {
    console.log('Conexão com o banco de dados realizada com sucesso!');
}).catch(function (e) {
    console.log('Erro: Conexão com o banco de dados não realizada com sucesso! '+ e);
})

module.exports = Conexao;