class ControllerIndex {
  index(application, req, res) {
    res.render("index", { validacao: {} });
  }

  autenticar(application, req, res) {
    //pegar o que foi digitado certo nos campos e ver se tem erros tambem
    var dadosLogin = req.body;

    req.assert("email", "Email é obrigatório").notEmpty();
    req.assert("senha", "senha é obrigatório").notEmpty();

    //pegar os erros
    var erros = req.validationErrors();

    //tratar caso haja erros
    if (erros) {
      res.render("index", { validacao: erros });
      return;
    } else {
      var connection = application.config.dbConnection;
      var usuariosDAO = new application.app.models.UsuarioDAO(connection);

      usuariosDAO.autenticar(dadosLogin, req, res);
    }
  }
}

module.exports = new ControllerIndex();

// module.exports.index = function(application, req, res){
//   res.render('index', {validacao: {}});
// }

// module.exports.autenticar = function(application, req, res){
//   //pegar o que foi digitado certo nos campos e ver se tem erros tambem
//   var dadosLogin = req.body;

//   req.assert('email','Email é obrigatório').notEmpty();
//   req.assert('senha','senha é obrigatório').notEmpty();

//   //pegar os erros
//   var erros = req.validationErrors();

//   //tratar caso haja erros
//   if(erros){
//       res.render('index', { validacao: erros});
//     return;
//   } else {
//     var connection = application.config.dbConnection;
//     var usuariosDAO = new application.app.models.UsuarioDAO(connection);

//     usuariosDAO.autenticar(dadosLogin, req, res);

//   }

// }
