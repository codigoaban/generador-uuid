const express = require('express');
const http = require('http');
const helmet = require('helmet');
var compression = require('compression');

require('dotenv').config();

const {v4: uuidv4} = require('uuid');
const cors = require('cors');


const app = express();

//para  la seguridad
app.use(helmet()); //agregar cabeceras http para mejroar la seguridad
app.use(compression()); // para comprimir la apliacion cuando se envía al cliente
app.use(cors()); //para quue se pueda llamar a la api desde cualquier url

//creamos el servidor
const serverHttp = http.createServer(app);
serverHttp.listen(process.env.HTTP_PORT, process.env.IP);
//console.log(process.env.HTTP_PORT);

//indica a express la carpeta con contenido estático
app.use(express.static('./public'));


app.get('/tmp', function(req, res){
    const options= {
      host: 'google.com',
      path: '/'
    };
  
    const request = http.request(options, function(r){
        let data = '';
        r.on('data', function(chunk){
            data += chunk;
        });

        r.on('end', function(){
            throw new Error();
        });

    });

    request.on('error', function(e){
        res.send('err');
    });

    request.end();

});


app.get('/api/get-uuid/', function(req, res){
    res.send(uuidv4());
})
