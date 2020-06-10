class ControllerElenco {
  
  elencoCadastro(application, req, res) {
    
    if (req.session.autorizado !== true) {
      res.send("usuario precisa fazer login");
    } else {
      var connection = application.config.dbConnection;
      var elencoDAO = new application.app.models.ElencoDAO(connection);
      var chave = req.session.email;

      var nome = req.session.nome;

      res.render("elencoCadastro", {
        validacao: {},
        dadosForm: [{}, {}],
        suspenso: [{}, {}],
        nome: nome,
        atualizar: 0,
        email: chave,
      });
      //elencoDAO.renderizarPagina(chave, nome, res, req);
    }
  }

  async elencoCadastrar(application, req, res) {

    if (req.session.autorizado !== true) {
      res.send("usuario precisa fazer login");
    } else {
      var connection = application.config.dbConnection;

      var equipeDao = new application.app.models.EquipeDAO(connection);
      var atletaDao = new application.app.models.AtletaDAO(connection);
      var presidenteDao = new application.app.models.PresidenteDAO(connection);
      var auxiliarDao = new application.app.models.AuxiliarDAO(connection);
      var tecnicoDao = new application.app.models.TecnicoDAO(connection);
      var equipeDao = new application.app.models.EquipeDAO(connection);

      var idEquipeInserido;
      var idTecnicoInserido;
      var idAtletaInserido;
      var idPresidenteInserido;
      var idAuxiliarInserido;

      var dadosForm = req.body;
      var keys = Object.keys(dadosForm);

      try {
        idEquipeInserido = await equipeDao.cadastrarEquipe(dadosForm);
        idPresidenteInserido = presidenteDao.cadastrarPresidente(
          idEquipeInserido,
          dadosForm
        );
        idTecnicoInserido = tecnicoDao.cadastrarTecnico(
          idEquipeInserido,
          dadosForm
        );
        idAuxiliarInserido = auxiliarDao.cadastrarAuxiliar(
          idEquipeInserido,
          dadosForm
        );

        for (var i = 11; i < keys.length; i = i + 3) {
          if (dadosForm[keys[i]] != "") {
            await atletaDao.cadastrarAtleta(idEquipeInserido, dadosForm, i);
          } else {
          }
        }
      } catch (err) {
        console.log(err.msg);
      }
      setTimeout(() => {
        res.redirect("elencoCadastro");
      }, 2000);
    }
  }

  sair(req, res) {
    req.session.destroy(function (erro) {
      res.redirect("/");
    });
  }

  elencoAtualizar(application, req, res) {

    var dadosForm = req.body;

    var connection = application.config.dbConnection;
    var elencoDAO = new application.app.models.ElencoDAO(connection);

    elencoDAO.elencoAtualizar(dadosForm);

    setTimeout(function () {
      res.redirect("elencoCadastro");
    }, 2000);
  }
}

module.exports = new ControllerElenco();
