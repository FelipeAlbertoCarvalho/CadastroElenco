class ControllerCadastro {
  
  cadastro(application, req, res) {
    res.render('cadastro', {validacao: {}, dadosForm: {}});
  }

  cadastrarPessoa(application, req, res){
    
    var dadosUsuario = req.body;
  
    req.assert('nome','Nome é obrigatório').notEmpty();
    req.assert('cpf','CPF é obrigatório').notEmpty();
    req.assert('nascimento','Data de nascimento é obrigatório').notEmpty();
    req.assert('senha','Senha é obrigatório').notEmpty();
    req.assert('email','Email é obrigatório').notEmpty();
    
    var erros = req.validationErrors();
  
    if(erros){
        res.render('cadastro', { validacao: erros, dadosForm: dadosUsuario});
      return;
    } else {
      var connection = application.config.dbConnection;
      var usuariosDAO = new application.app.models.UsuarioDAO(connection);
  
      usuariosDAO.inserirUsuario(dadosUsuario);
      
      res.render("index", {validacao:{}});
  
  
    }
  }

  cadastrarElenco(application, req, res){
    res.render('elencoCadastro');
  }

}
module.exports = new ControllerCadastro();

/* module.exports.cadastro = function(application, req, res){
  //aqui eu tenho que fazer a lógica certo?
  //o que eu preciso fazer? resgatar o que ele digitou e joar no banoc de dados(DAO)
  //e retornar para o usuario alguma coisa 
  //*******primeiro so mostra a view
  res.render('cadastro', {validacao: {}, dadosForm: {}});
} */

/*module.exports.cadastrarPessoa = function(application, req, res){
  //aqui tenho que fazer a logica para cadastrar as pessoas
  //resgatar o que esta sendo digitado
  var dadosUsuario = req.body;

  //validacao de dados
  req.assert('nome','Nome é obrigatório').notEmpty();
  req.assert('cpf','CPF é obrigatório').notEmpty();
  req.assert('nascimento','Data de nascimento é obrigatório').notEmpty();
  req.assert('senha','Senha é obrigatório').notEmpty();
  req.assert('email','Email é obrigatório').notEmpty();
  
  //pegar os erros
  var erros = req.validationErrors();

  //tratar caso haja erros
  if(erros){
      res.render('cadastro', { validacao: erros, dadosForm: dadosUsuario});
    return;
  } else {    //caso noa haja continue
    //eu tenho que guardar no banco de dados certo?
    //eu devo passar o que aqui ?
    //os dados que foi digitado
    //fazer a conexao aqui e passar como parametro 
    
    var connection = application.config.dbConnection;
    var usuariosDAO = new application.app.models.UsuarioDAO(connection);

    usuariosDAO.inserirUsuario(dadosUsuario);
    
    res.render("index", {validacao:{}});


  }
} */

/* module.exports.cadastrarElenco = function(application, req, res){
  res.render('elencoCadastro');
} */