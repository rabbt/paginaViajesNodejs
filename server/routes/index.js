//importar express
const express = require('express');
const router = express.Router();

const Viaje = require('../models/Viajes');
const Testimonial = require('../models/Testimoniales');


module.exports = function(){
    router.get('/', (req, res) => {
        Viaje.findAll()
            .then(viajes => res.render('index', {
                pagina: 'Proximos viajes',
                clase:'home',
                viajes:viajes //propiedad y objeto object literal
            }))
            .catch(error => console.log(error))

        res.render('',{
            clase:'home'
        });
    });

    router.get('/nosotros',(req, res) => {
        res.render('nosotros',{
            pagina:'Sobre Nosotros'
        });
    });

    router.get('/viajes', (req,res) => {
        Viaje.findAll()
            .then(viajes => res.render('viajes', {
                pagina: 'Proximos viajes',
                viajes:viajes //propiedad y objeto object literal
            }))
            .catch(error => console.log(error))
        });

        router.get('/viajes/:id', (req,res) => {
            Viaje.findByPk(req.params.id)
                .then(viaje => res.render('viaje', {
                    viaje
                }))
                .catch(error => console.log(error));
        });

        router.get('/testimoniales',(req, res) => {
            // res.render('testimoniales',{
            //     pagina:'Testimoniales'
            // });
            Testimonial.findAll()
                .then(testimoniales => res.render('testimoniales',{
                    pagina:'Testimoniales',
                    testimoniales: testimoniales //testimoniales se va a invocar en el html
                }))
        });
        //cuando se llena el formulario
        router.post('/testimoniales', (req, res) => {
            //imprimir lo que hay en el formulario
            //console.log(req.body);

            //validar que todos campos esten llenos
            let {nombre, correo, mensaje} = req.body;

            let errores = [];
            if(!nombre) { 
                errores.push({'mensaje' : 'Agrega tu Nombre'}); 
            }
            if(!correo) {
                errores.push({'mensaje' : 'Agrega tu Correo'})
            }
            if(!mensaje) {
                errores.push({'mensaje' : 'Agrega tu Mensaje'})
            }

            //revisar por errores
            if(errores.length > 0) {
                //muestra la vista con errores
                res.render('testimoniales', {
                    errores,
                    nombre,
                    correo,
                    mensaje
                })
            }else {
                //almacenarlo en la BD
                Testimonial.create({
                    nombre,
                    correo,
                    mensaje
                })
                .then(testimonial => res.redirect('/testimoniales'))
                .catch(error => console.log(error));
            }
        })

    return router;
}  