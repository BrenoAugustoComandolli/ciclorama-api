module.exports = {

    respostaStatusConsulta(resp, res){
        if(resp == null){
            res.status(400);
            return;
        }else if(resp.error != null){
            res.status(500);
            return resp;
        }else if(resp.mensagemErro != null) {
            res.status(400);
            return resp;
        }else if(resp.authentication != null) {
            res.status(401);
            return;
        }else if(resp.token != null) {
            const token = resp.token;
            res.json({token});
            return;
        }else{
            return resp;
        }
    },

    respostaStatusAtualiza(resp, res){
        if(resp == null){
            res.status(400);
            return;
        }else if(resp.error != null){
            res.status(500);
            return resp;
        }else if(resp.mensagemErro != null) {
            res.status(400);
            return resp;
        }else if(resp.authentication != null) {
            res.status(401);
            return;
        }else if(resp != 1) {
            res.status(400);
            return;
        }else{
            return;
        }
    },

    respostaStatusCriacao(resp, res){
        if(resp == null){
            res.status(400);
            return;
        }else if(resp.error != null){
            res.status(500);
            return resp;
        }else if(resp.mensagemErro != null) {
            res.status(400);
            return resp;
        }else if(resp.authentication != null) {
            res.status(401);
            return;
        }else if(resp != null){
            res.status(201);
            return;
        }else{
            return resp;
        }
    }
    
}