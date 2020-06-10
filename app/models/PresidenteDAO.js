class PresidenteDAO {
  constructor(connection) {
    this._conexao = connection();
  }

  objectId = require("mongodb").ObjectId;
  nome;
  email;

  setNome(nome) {
    this.nome = nome;
  }

  cadastrarPresidente(equipeId, presidente) {
    this._conexao.open(function (erro, mongoclient) {
      mongoclient
        .collection("presidentes")
        .insertOne({
          nome: presidente.presidente,
          rg_presidente: presidente.rg_presidente,
          id_equipe: equipeId,
        })
        .then((result) => {
          
        });
      mongoclient.close();
    });
  }

  atualizarPresidente(equipeId, atletaId) {}

  removerPresidente(equipeId, atletaId) {}
}

module.exports = () => {
  return PresidenteDAO;
};
