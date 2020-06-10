class AtletaDAO {
  objectId = require("mongodb").ObjectId;

  constructor(connection) {
    this._conexao = connection();
  }

  cadastrarAtleta(equipeId, atletas, posicao) {
    return new Promise((resolve, reject) => {
      
      var id_inserido;
      var keys = Object.keys(atletas);

      this._conexao.open(function (erro, mongoclient) {
        mongoclient
          .collection("atletas")
          .insertOne({
            nome: atletas[keys[posicao]],
            rg: atletas[keys[posicao + 1]],
            goleiro: atletas[keys[posicao + 2]],
            id_equipe: equipeId,
          })
          .then((result) => {
            if (result != undefined) {
              id_inserido = result.insertedId; //ver se nao esta retornando um object
              mongoclient.close();
              resolve(id_inserido);
            } else {
              mongoclient.close();
              reject("deu erro");
            }
          });
      });
    });
  }

  atualizarAtleta(equipeId, atletaId) {}

  removerAtleta(equipeId, atletaId) {}
}

module.exports = () => {
  return AtletaDAO;
};
