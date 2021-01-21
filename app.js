const express = require('express');
const http = require('http');
const helmet = require('helmet');
var compression = require('compression');

require('dotenv').config();

const {v4: uuidv4} = require('uuid');


const app = express();

//para  la seguridad
app.use(helmet()); //agregar cabeceras http para mejroar la seguridad
app.use(compression()); // para comprimir la apliacion cuando se envía al cliente

//creamos el servidor
const serverHttp = http.createServer(app);
serverHttp.listen(process.env.HTTP_PORT, process.env.IP);
//console.log(process.env.HTTP_PORT);

//indica a express la carpeta con contenido estático
app.use(express.static('./public'));

app.get('/api/get-uuid/', function(req, res){
    res.send(uuidv4());
})
