class ElencoDAO {
  objectId = require("mongodb").ObjectId;

  constructor(connection) {
    this._conexao = connection();
  }

  elencoCadastrar(dados) {
    //auqi nos dados estao todos os dados como percorrer eles todos?
    //forEach
    //agora tenho que pegar quem esta suspenso, como pego ? e onde guardar eles?
    // no elenco mesmo ? ou pego em controller e dai passo aqui os suspensos ?
    // pego no controller os suspensos e passao pra ca

    delete dados._id;

    this._conexao.open(function (erro, mongoclient) {
      mongoclient.collection("elenco", function (erro, collection) {
        collection.insert(dados);
        //tem qeu ver como esta retornando se posso guardar tudo assim memso sme precisar modificar
        mongoclient.close();
      });
    });
  }

  renderizarPagina(emailUsuario, nome, res, req) {
    var atualizar = 1; //assumo que ele vai atualizar
    var elencoResultado;
    var elencoSuspenso;
    //chamar o get aqui, e passar uma variavel e dai ele povoa ela e re

    this._conexao.open(function (erro, mongoclient) {
      mongoclient.collection("elenco", function (err, collection) {
        collection
          .find({
            email: emailUsuario,
          })
          .toArray(function (erro, result) {
            if (result.length < 1) {
              //quer dizer que ela vai cadastrar
              elencoResultado = [{}, {}]; //porque é matriz
              atualizar = 0;
            } else {
              elencoResultado = result;
            }
          });
      });

      mongoclient.collection("suspensos", function (err, collection) {
        collection.find().toArray(function (erro, result) {
          if (result.length < 1) {
            //quer dizer que ela vai cadastrar
            elencoSuspenso = [{}, {}]; //porque é matriz
            atualizar = 0;
          }
          elencoSuspenso = result;
          res.render("elencoCadastro", {
            validacao: {},
            dadosForm: elencoResultado,
            suspenso: elencoSuspenso,
            nome: nome,
            atualizar: atualizar,
            email: email
          });
        });
        mongoclient.close();
      });
    });
  }

  getSuspensos(colocaDados) {
    this._conexao.open(function (erro, mongoclient) {
      mongoclient.collection("suspensos", function (erro, collection) {
        collection.find().toArray(function (erro, result) {
          if (result.length < 1) {
            //nao tem nenhum resultado
            console.log("result" + result);
            result = [{}, {}];
            colocaDados = result;
          } //tem resultado
          //eu tenho que renderizar ou so retornar o result?
          //so retornar o result eu acho, mas como eu retorno?
          //eu posso parar para um req.session.suspensos? e dai passo um aray ?
          return result;
        });
        mongoclient.close();
      });
    });
  }

  elencoAtualizar(dadosAtualizar) {
    /*eu tenho que recceber aqui quem foi as propriedade atualizadas no parametro
     * da funcao e dai pegar esses valores modificado[0][0] = vai ter a propriedadde
     * modificado[0][1] = vai ter o novo valor
     * dai pra atualizar eu tenho que passar como string na propriedade
     * mas qual seria a comparacao? tenho que usar o que ? o email certo?
     * ou o nome do time, se for email, da pra eu jogar na view, ou pela req.session
     */

    var _id = this.objectId(dadosAtualizar._id);
    delete dadosAtualizar._id;

    console.log(typeof _id);
    console.log(dadosAtualizar);
    console.log("nao pode viraqui");

    this._conexao.open(function (erro, mongoclient) {
      mongoclient.collection("elenco", function (erro, collection) {
        collection.update(
          { _id: _id },
          {
            $set: {
              equipe: dadosAtualizar.equipe,
              responsavel: dadosAtualizar.responsavel,
              rg_responsavel: dadosAtualizar.rg_responsavel,
              presidente: dadosAtualizar.presidente,
              rg_presidente: dadosAtualizar.rg_presidente,
              tecnico: dadosAtualizar.tecnico,
              rg_tecnico: dadosAtualizar.rg_tecnico,
              auxiliar: dadosAtualizar.auxiliar,
              rg_auxiliar: dadosAtualizar.rg_auxiliar,

              atleta1: dadosAtualizar.atleta1,
              rg_atleta1: dadosAtualizar.rg_atleta1,
              goleiro1: dadosAtualizar.goleiro1,

              atleta2: dadosAtualizar.atleta2,
              rg_atleta2: dadosAtualizar.rg_atleta2,
              goleiro2: dadosAtualizar.goleiro2,

              atleta3: dadosAtualizar.atleta3,
              rg_atleta3: dadosAtualizar.rg_atleta3,
              goleiro3: dadosAtualizar.goleiro3,

              atleta4: dadosAtualizar.atleta4,
              rg_atleta4: dadosAtualizar.rg_atleta4,
              goleiro4: dadosAtualizar.goleiro4,

              atleta5: dadosAtualizar.atleta5,
              rg_atleta5: dadosAtualizar.rg_atleta5,
              goleiro5: dadosAtualizar.goleiro5,

              atleta6: dadosAtualizar.atleta6,
              rg_atleta6: dadosAtualizar.rg_atleta6,
              goleiro6: dadosAtualizar.goleiro6,

              atleta7: dadosAtualizar.atleta7,
              rg_atleta7: dadosAtualizar.rg_atleta7,
              goleiro7: dadosAtualizar.goleiro7,

              atleta8: dadosAtualizar.atleta8,
              rg_atleta8: dadosAtualizar.rg_atleta8,
              goleiro8: dadosAtualizar.goleiro8,

              atleta9: dadosAtualizar.atleta9,
              rg_atleta9: dadosAtualizar.rg_atleta9,
              goleiro9: dadosAtualizar.goleiro9,

              atleta10: dadosAtualizar.atleta10,
              rg_atleta10: dadosAtualizar.rg_atleta10,
              goleiro10: dadosAtualizar.goleiro10,

              atleta11: dadosAtualizar.atleta11,
              rg_atleta11: dadosAtualizar.rg_atleta11,
              goleiro11: dadosAtualizar.goleiro11,

              atleta12: dadosAtualizar.atleta12,
              rg_atleta12: dadosAtualizar.rg_atleta12,
              goleiro12: dadosAtualizar.goleiro12,

              atleta13: dadosAtualizar.atleta13,
              rg_atleta13: dadosAtualizar.rg_atleta13,
              goleiro13: dadosAtualizar.goleiro13,

              atleta14: dadosAtualizar.atleta14,
              rg_atleta14: dadosAtualizar.rg_atleta14,
              goleiro14: dadosAtualizar.goleiro14,

              atleta15: dadosAtualizar.atleta15,
              rg_atleta15: dadosAtualizar.rg_atleta15,
              goleiro15: dadosAtualizar.goleiro15,

              atleta16: dadosAtualizar.atleta16,
              rg_atleta16: dadosAtualizar.rg_atleta16,
              goleiro16: dadosAtualizar.goleiro16,

              atleta17: dadosAtualizar.atleta17,
              rg_atleta17: dadosAtualizar.rg_atleta17,
              goleiro17: dadosAtualizar.goleiro17,

              atleta18: dadosAtualizar.atleta18,
              rg_atleta18: dadosAtualizar.rg_atleta18,
              goleiro18: dadosAtualizar.goleiro18,

              atleta19: dadosAtualizar.atleta19,
              rg_atleta19: dadosAtualizar.rg_atleta19,
              goleiro19: dadosAtualizar.goleiro19,

              atleta20: dadosAtualizar.atleta20,
              rg_atleta20: dadosAtualizar.rg_atleta20,
              goleiro20: dadosAtualizar.goleiro20,
            },
          },
          { upsert: true }
        ); //tem qeu ver como esta retornando se posso guardar tudo assim memso sme precisar modificar

        mongoclient.close();
      });
    });
  }
}

module.exports = function () {
  return ElencoDAO;
};

// function ElencoDAO(connection){
//     this._conexao = connection();
// }

// ElencoDAO.prototype.elencoCadastrar = function(dados){
//     //auqi nos dados estao todos os dados como percorrer eles todos?
//     //forEach
//     //agora tenho que pegar quem esta suspenso, como pego ? e onde guardar eles?
//     // no elenco mesmo ? ou pego em controller e dai passo aqui os suspensos ?
//     // pego no controller os suspensos e passao pra ca

//     this._conexao.open( function (erro, mongoclient){
//         mongoclient.collection("elenco", function(erro, collection){
//             collection.insert(dados);             //tem qeu ver como esta retornando se posso guardar tudo assim memso sme precisar modificar
//             mongoclient.close();
//         });
//     });
// }

// ElencoDAO.prototype.renderizarPagina = function(emailUsuario, nome, res, req){
//     var atualizar = 1;      //assumo que ele vai atualizar
//     var elencoResultado;
//     var elencoSuspenso;
//     //chamar o get aqui, e passar uma variavel e dai ele povoa ela e re

//     this._conexao.open(function(erro, mongoclient){

//         mongoclient.collection("elenco", function(err, collection){
//             collection.find({
//                 email: emailUsuario
//             }).toArray(function(erro, result){
//                 if(result.length < 1 ) {    //quer dizer que ela vai cadastrar
//                     elencoResultado = [{},{}]; //porque é matriz
//                     atualizar = 0;
//                 }
//                 elencoResultado = result;
//                 });
//         });

//         mongoclient.collection("suspensos", function(err, collection){
//             collection.find().toArray(function(erro, result){
//                 if(result.length < 1 ) {    //quer dizer que ela vai cadastrar
//                     elencoSuspenso = [{},{}]; //porque é matriz
//                     atualizar = 0;
//                 }
//                 elencoSuspenso = result;
//                 console.log(elencoSuspenso);
//                 res.render('elencoCadastro', { validacao: {}, dadosForm: elencoResultado, suspenso: elencoSuspenso ,nome: nome, atualizar: atualizar});
//             });
//             mongoclient.close();
//         });
//     });
// }

// ElencoDAO.prototype.getSuspensos = function(colocaDados){
// console.log("nem entra aqui");
//     this._conexao.open(function(erro, mongoclient){
//         mongoclient.collection("suspensos", function(erro, collection){
//             collection.find().toArray(function(erro, result){
//                 if(result.length < 1){  //nao tem nenhum resultado
//                     console.log("result"+result);
//                     result = [{},{}];
//                     colocaDados = result;
//                 }   //tem resultado
//                 //eu tenho que renderizar ou so retornar o result?
//                 //so retornar o result eu acho, mas como eu retorno?
//                 //eu posso parar para um req.session.suspensos? e dai passo um aray ?
//                 return result;
//                 console.log("resultColocadoDados"+colocaDados);
//             });
//             mongoclient.close();
//         });
//     });
// }

// ElencoDAO.prototype.elencoAtualizar = function(){
//     /*eu tenho que recceber aqui quem foi as propriedade atualizadas no parametro
//     * da funcao e dai pegar esses valores modificado[0][0] = vai ter a propriedadde
//     * modificado[0][1] = vai ter o novo valor
//     * dai pra atualizar eu tenho que passar como string na propriedade
//     * mas qual seria a comparacao? tenho que usar o que ? o email certo?
//     * ou o nome do time, se for email, da pra eu jogar na view, ou pela req.session
//     */
// }

// module.exports = function (){
//     return ElencoDAO;
// }
