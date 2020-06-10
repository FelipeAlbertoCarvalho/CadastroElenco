class ElencoDAO {
  objectId = require("mongodb").ObjectId;

  constructor(connection) {
    this._conexao = connection();
  }

  cadastrarEquipe(dados) {
    return new Promise((resolve, reject) => {
      var id_inserido;

      this._conexao.open(function (erro, mongoclient) {
        mongoclient
          .collection("equipes")
          .insertOne({
            nome: dados.equipe,
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

  atualizarEquipe(equipeId, atletaId) {}

  removerEquipe(equipeId, atletaId) {}
}

module.exports = () => {
  return ElencoDAO;
};
