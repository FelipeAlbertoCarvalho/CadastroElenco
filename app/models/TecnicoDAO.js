class TecnicoDAO {
  objectId = require("mongodb").ObjectId;

  constructor(connection) {
    this._conexao = connection();
  }

  cadastrarTecnico(equipeId, tecnico) {
    this._conexao.open(function (erro, mongoclient) {
      mongoclient
        .collection("tecnicos")
        .insertOne({
          nome: tecnico.tecnico,
          rg_tecnico: tecnico.rg_tecnico,
          id_equipe: equipeId,
        })
        .then((result) => {
          
        });
      mongoclient.close();
    });

    return id_inserido;
  }

  atualizarTecnico(equipeId, tecnico) {}

  removerTecnico(equipeId, tecnico) {}
}

module.exports = () => {
  return TecnicoDAO;
};
