/*importar as configurações do servidor
 *que estarão dentro do diretorio e do arquivo server.js
 *e tambem parametrizar para qeue ele passe a escutar uma porta
 */
var app = require('./config/server') // posso ocultar a extensao

/* parametrizar a portar que ira escutar */
app.listen(3000, function() {   //escutar a porta 80
    console.log('servidor online');
})