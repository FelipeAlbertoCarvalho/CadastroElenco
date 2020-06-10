// class ControllerElenco {
//     elencoCadastro(application, req, res) {
  
//       if (req.session.autorizado !== true) {
//         res.send("usuario precisa fazer login");
//       } else {
  
//         var connection = application.config.dbConnection;
//         var elencoDAO = new application.app.models.ElencoDAO(connection);
//         var chave = req.session.email;
  
//         var nome = req.session.nome;
       
//         res.render("elencoCadastro", {
//           validacao: {},
//           dadosForm: [{},{}],
//           suspenso: [{},{}],
//           nome: nome,
//           atualizar: 0,
//           email: chave
//         });
//         //elencoDAO.renderizarPagina(chave, nome, res, req);
  
//         //tenho qeu pegar algum dados do usuario para linkar e buscar os dados no banco de dados
//       }
//     }
  
//     elencoCadastrar(application, req, res) {
//       //efetua o cadastro, chamaando algum model
//       //chamando o elenco DAO onde vai inserir todos os dados do body
//       if (req.session.autorizado !== true) {
//         res.send("usuario precisa fazer login");
//       } else {
  
//         var connection = application.config.dbConnection;
  
//         var equipeDao = new application.app.models.EquipeDAO(connection);
//         var atletaDao = new application.app.models.AtletaDAO(connection);
//         var presidenteDao = new application.app.models.PresidenteDAO(connection);
//         var auxiliarDao = new application.app.models.AuxiliarDAO(connection);
//         var tecnicoDao = new application.app.models.TecnicoDAO(connection);
//         var equipeDao = new application.app.models.EquipeDAO(connection);
  
//         //eu tenho que passar um json
  
//         var idEquipeInserido;
//         var idTecnicoInserido;
//         var idAtletaInserido;
//         var idPresidenteInserido;
//         var idAuxiliarInserido;
        
  
//         var dadosForm = req.body;
//         var keys = Object.keys(dadosForm);
  
//         idEquipeInserido = equipeDao.cadastrarEquipe(dadosForm)
//           .then(response => {
            
//             idEquipeInserido = response;
//             idPresidenteInserido = presidenteDao.cadastrarPresidente(idEquipeInserido, dadosForm);
//             idTecnicoInserido = tecnicoDao.cadastrarTecnico(idEquipeInserido, dadosForm);
//             idAuxiliarInserido = auxiliarDao.cadastrarAuxiliar(idEquipeInserido, dadosForm);
            
//             for(var i=11; i<keys.length; i=i+3 ){
            
//               if(dadosForm[keys[i]] != ""){
//                 atletaDao.cadastrarAtleta(idEquipeInserido, dadosForm, i)
//                 .then(() => {
//                   atletaDao.cadastrarAtleta(idEquipeInserido, dadosForm, i)
//                 })
//                 .catch(err => {
//                   console.log("deu erro no atletas");
//                 })
//               } else {
  
//               }
//             }
//           })
//           .catch(err => {
//             console.log(err.msg);
//           })
        
        
  
//         setTimeout(() => {
//           res.redirect("elencoCadastro");
//         }, 2000);
//       }
  
//     }
  
//     sair(req, res) {
//       req.session.destroy(function (erro) {
//         res.redirect("/");
//       });
//     }
  
//     elencoAtualizar(application, req, res) {
     
//       var dadosForm = req.body;
  
//       var connection = application.config.dbConnection;
//       var elencoDAO = new application.app.models.ElencoDAO(connection);
  
//       elencoDAO.elencoAtualizar(dadosForm);
  
//       setTimeout(function () {
//         res.redirect("elencoCadastro");
//       }, 2000);
//     }
//   }
  
//   module.exports = new ControllerElenco();
  


//   cadastrarAtleta(equipeId, atletas, posicao){
//     return new Promise((resolve, reject) => {
    
//         var id_inserido;
//         var keys = Object.keys(atletas);
//         console.log("atletas[keys[posicao]] = "+atletas[keys[posicao]]);
        
//         this._conexao.open(function (erro, mongoclient) {
//             mongoclient.collection("atletas")
//             .insertOne({
//                 nome: atletas[keys[posicao]],
//                 rg: atletas[keys[posicao+1]],
//                 goleiro: atletas[keys[posicao+2]],
//                 id_equipe: equipeId
//             })
//             .then(result => {
//                 if(result != undefined) {
//                     id_inserido = result.insertedId;    //ver se nao esta retornando um object
//                     mongoclient.close();
//                     console.log("insertedId equipe", id_inserido);
//                     resolve(id_inserido);
//                 } else {
//                     mongoclient.close();
//                     reject("deu erro");
//                 }
//             });
//         });

//     });
// }