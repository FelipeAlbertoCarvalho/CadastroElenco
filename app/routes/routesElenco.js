module.exports = function (application) {
  //ninguem chama essa função, tipo, quem chama é o navegador
  application.get("/elencoCadastro", function (req, res) {
    application.app.controllers.controllerElenco.elencoCadastro(
      application,
      req,
      res
    );
  });
  //a pagina elencoCadastrar chama o elencoCadastrar
  application.post("/elencoCadastrar", async function (req, res) {
    application.app.controllers.controllerElenco.elencoCadastrar(
      application,
      req,
      res
    );
  });

  application.post("/elencoAtualizar", function (req, res) {
    application.app.controllers.controllerElenco.elencoAtualizar(
      application,
      req,
      res
    );
  });

  application.get("/sair", function (req, res) {
    application.app.controllers.controllerElenco.sair(req, res);
  });
};

// const {Router} = require("express");
// const controllerElenco = require("../controllers/controllerElenco");
// const router = Router();

// router.post("/elencoCadastrar", controllerElenco.elencoCadastrar);
// router.get();
