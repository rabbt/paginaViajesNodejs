//importar express
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes');

const configs = require('./config');

const db = require('./config/database');

db.authenticate()
    .then(() => console.log('DB CONECTADA'))
    .catch(error => console.log(error))

//configurar express
const app = express();

//habilitar pug
app.set('view engine', 'pug');

//añadir las vistas
app.set('views', path.join(__dirname, './views'))

// app.use('/', (req, res) => {
//     res.send('hola mundo en NodeJS');
// });

//cargar una carpeta estatica llamada public
app.use(express.static('public'));

//validar si estamos en desarrollo o en produccion
const config = configs[app.get('env')];

//creamos la variable para el sitio web
app.locals.titulo = config.nombresitio;

//muestra el año actual
app.use((req, res, next) => {
    //crear una nueva fecha
    const fecha = new Date();
    res.locals.fechaActual = fecha.getFullYear();
    return next();
})
//ejecutamos el bodyparser
app.use(bodyParser.urlencoded({extended: true}));

//cargar las rutas
app.use('/', routes());
 
console.log('Aplicacion corriendo en puerto 3000');

app.listen(3000);