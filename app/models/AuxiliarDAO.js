class AuxiliarDAO {
  objectId = require("mongodb").ObjectId;

  constructor(connection) {
    this._conexao = connection();
  }

  cadastrarAuxiliar(equipeId, auxiliar) {
    var id_inserido;
    // this._conexao.open(function (erro, mongoclient) {
    //     mongoclient.collection("atleta", function (erro, collection) {
    //       collection.insertOne(atleta, (err, result) => {

    //       });
    //       mongoclient.close();
    //     });
    //   });

    this._conexao.open(function (erro, mongoclient) {
      mongoclient
        .collection("auxiliares")
        .insertOne({
          nome: auxiliar.auxiliar,
          rg_auxiliar: auxiliar.rg_auxiliar,
          id_equipe: equipeId,
        })
        .then((result) => {
          
        });
      mongoclient.close();
    });

    return id_inserido;
  }

  atualizarAuxiliar(equipeId, atletaId) {}

  removerAuxiliar(equipeId, atletaId) {}
}

module.exports = () => {
  return AuxiliarDAO;
};
