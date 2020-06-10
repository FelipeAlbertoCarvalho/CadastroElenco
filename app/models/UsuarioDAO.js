function UsuarioDAO(connection) {
  this._conexao = connection();
}

UsuarioDAO.prototype.inserirUsuario = function(dadosUsuario) {
  this._conexao.open(function(erro, mongoclient){
    mongoclient.collection("usuarios", function(erro, collection){
  
      collection.insert(dadosUsuario);
      mongoclient.close();

    });
  });
}

UsuarioDAO.prototype.autenticar = function(dadosLogin, req, res) {
/* eu abro a conexao -> mongoclient parece ser uma funcao padrao, chama a
 * propriedade collection("passandoAcollection", callback para executar a 
 * funcao dentro da collection.algumaFuncao(aLogica).toArray(erro, resultado))
*/
  this._conexao.open(function(erro, mongoclient) {
    mongoclient.collection("usuarios", function(erro, collection) {
      collection.find({
        email: {
                $eq: dadosLogin.email
                }, 
        senha: dadosLogin.senha
        }).toArray(function(erro, result){
            if(result[0]){   //aqui eu posso criar varias variaveis
              
              
              req.session.autorizado = true;
              req.session.nome = result[0].nome;
              req.session.email = result[0].email;
              
              if(dadosLogin.email == 'admin@admin'){ //vai para adm
                mongoclient.close();
                res.redirect("admin");
              } else {
                res.redirect("elencoCadastro");
              }

            }
            // if(req.session.autorizado){   
            //   //mas caso ja tenho algono banco de daos ja tenho que entregar renderizado
            //   //se aqui eu redireciono eu tenho qeu dar um render na hors que eu carreguei a view atrazes do router e dai do controller
              
            //   res.redirect("elencoCadastro");     //posso passar alguma parametro? n�o
             else {
              res.render("index", {validacao: {}});
            }
          });
        
        mongoclient.close();
      });
   });
}

module.exports = function(){    //esta eportando para o consign a função criada , todos devem fazer isso qeu esta no consign
  return UsuarioDAO;
}
