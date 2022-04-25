const tokenUtil = require('./src/utils/TokenUtil.js');
const express = require('express');
const cors = require('cors');
const server = express();

server.use(cors());
server.use(express.json());
const listaTokensInvalidos = [];

const usuarioController = require('./src/controllers/UsuarioController.js');
server.post('/cadastrarUsuario', async (req, res) =>{
    const { usuario } = req.body;
    res.json(await usuarioController.cadastrarUsuario(usuario, res));
});
server.put('/atualizarUsuario', verificarToken, async (req, res) =>{
    const { usuario } = req.body;
    if(!usuario.senha){
        listaTokensInvalidos.push(req.headers['x-access-token']);
    }
    res.json(await usuarioController.atualizarUsuario(usuario, res));
});
server.delete('/deletarUsuario', verificarToken, async (req, res) =>{
    const { usuarioId } = req.query;
    res.json(await usuarioController.deletarUsuario(usuarioId, res));
});
server.get('/buscarUsuarioPorEmail', verificarToken, async (req, res) =>{
    const email = req.query.email;
    res.json(await usuarioController.buscarUsuarioPorEmail(email, res));
});
server.get('/buscarUsuarioPorId', verificarToken, async (req, res) =>{
    const id = req.query.id;
    res.json(await usuarioController.buscarUsuarioPorId(id, res));
});
server.post('/logar', async (req, res) =>{
    const { email } = req.body;
    const { senha } = req.body;
    res.json(await usuarioController.logar(email, senha, res));
});
server.post('/deslogar', async (req, res) =>{
    listaTokensInvalidos.push(req.headers['x-access-token']);
    res.end();
});


const filmeController = require('./src/controllers/FilmeController.js');
server.post('/cadastrarFilme', verificarToken, async (req, res) =>{
    const { filme } = req.body;
    res.json(await filmeController.cadastrarFilme(filme, res));
});
server.put('/atualizarFilme', verificarToken, async (req, res) =>{
    const { filme } = req.body;
    res.json(await filmeController.atualizarFilme(filme, res));
});
server.delete('/deletarFilme', verificarToken, async (req, res) =>{
    const filmeId = req.query.filmeId;
    const usuarioId = req.query.usuarioId;
    res.json(await filmeController.deletarFilme(filmeId, usuarioId, res));
});
server.get('/listarFilmesUsuario', verificarToken, async (req, res) =>{
    const usuarioId = req.query.usuarioId;
    res.json(await filmeController.listarFilmesUsuario(usuarioId, res));
});
server.get('/buscarFilmePorId', verificarToken, async (req, res) =>{
    const filmeId = req.query.filmeId;
    res.json(await filmeController.buscarFilmePorId(filmeId, res));
});
server.get('/buscarFilmesPorNome', verificarToken, async (req, res) =>{
    const nomeFilme = req.query.nomeFilme;
    const usuarioId = req.query.usuarioId;
    res.json(await filmeController.buscarFilmesPorNome(nomeFilme, usuarioId, res));
});
server.get('/buscarFilmesPorListaCategoria', verificarToken, async (req, res) =>{
    const categorias = req.query.categorias;
    const nomeFilme = req.query.nomeFilme;
    const usuarioId = req.query.usuarioId;
    res.json(await filmeController.buscarFilmesPorListaCategoria(categorias, nomeFilme, usuarioId, res));
});


const categoriaController = require('./src/controllers/CategoriaController.js');
server.post('/cadastrarCategoria', verificarToken, async (req, res) =>{
    const { categoria } = req.body;
    res.json(await categoriaController.cadastrarCategoria(categoria, res));
});
server.delete('/deletarCategoria', verificarToken, async (req, res) =>{
    const nomeCategoria = req.query.nomeCategoria;
    const usuarioId = req.query.usuarioId;
    res.json(await categoriaController.deletarCategoria(nomeCategoria, usuarioId, res));
});
server.get('/listarCategoriasUsuario', verificarToken, async (req, res) =>{
    const usuarioId = req.query.usuarioId;
    res.json(await categoriaController.listarCategoriasUsuario(usuarioId, res));
});


const filmeCategoriaController = require('./src/controllers/FilmeCategoriaController.js');
server.post('/definirCategoriaFilme', verificarToken, async (req, res) =>{
    const { filmeId } = req.body;
    const { nomeCategoria } = req.body;
    res.json(await filmeCategoriaController.definirCategoriaFilme(filmeId, nomeCategoria, res));
});
server.delete('/removerCategoriaFilme', verificarToken, async (req, res) =>{
    const filmeId = req.query.filmeId;
    const nomeCategoria = req.query.nomeCategoria;
    res.json(await filmeCategoriaController.removerCategoriaFilme(filmeId, nomeCategoria, res));
});


server.listen(3001, () =>{
    console.log("Servidor Iniciado...");
})


function verificarToken(req, res, next) {
    const token = req.headers['x-access-token'];
    const resp = tokenUtil.verificarToken(token, listaTokensInvalidos);

    if(resp != null && resp.err != null){
        return res.status(401).end();
    }else{
        const index = listaTokensInvalidos.findIndex(item => item === token);
        if(index !== -1){
            return res.status(401).end();
        }
    }
    next();
}