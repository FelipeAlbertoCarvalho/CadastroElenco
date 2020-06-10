class ControllerAdmin{

    admin(application, req, res){
        res.render('admin');
    }
    
}

module.exports = new ControllerAdmin();