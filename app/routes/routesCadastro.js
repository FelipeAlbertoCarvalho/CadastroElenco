module.exports = function(application) {
  
  application.get('/cadastro', function(req, res) {
    application.app.controllers.controllerCadastro.cadastro(application, req, res);
  });

  application.post('/cadastrar', function(req, res) {
    application.app.controllers.controllerCadastro.cadastrarPessoa(application, req, res);
  });
  
  
}