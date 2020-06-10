module.exports = function(application){
    
    application.get('/admin', function(req, res){
        application.app.controllers.controllerAdmin.admin(application, req, res);
    });
}
