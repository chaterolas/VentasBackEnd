// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3333;        // set our port

// MONGO
var mongoose   = require('mongoose');

mongoose.connect('mongodb://localhost/Ventas'); // connect to our database

// MODEL
var Venta = require("./app/models/venta");

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  // do logging
  console.log('Dispatching request.');

  next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(request, respose) {
    respose.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here
router.route('/ventas')
    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {
        var venta = new Venta();      // create a new instance of the Venta model
        venta.producto = req.body.producto;
        venta.tamano = req.body.tamano;
        venta.cantidad = req.body.cantidad;
        venta.tienda = req.body.tienda;
        venta.precio = req.body.precio;

        // save the bear and check for errors
        venta.save(function(err) {
            res.json({ 
              success: !err,
              message: !err ? 'Venta Creada!' : err 
            });
        });
    })

    // get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(function(req, res) {
        Venta.find(function(err, ventas) {
          res.json({ 
              success: !err,
              message: !err ? 'Ventas Encontradas!' : err,
              ventas: !err ? ventas : null
            });
        });
    });

// on routes that end in /bears/:bear_id
// ----------------------------------------------------
router.route('/ventas/:venta_id')
    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        Venta.findById(req.params.venta_id, function(err, venta) {
          res.json({ 
              success: !err,
              message: !err ? 'Venta Encontrada!' : err,
              venta: !err ? venta : null
            });
        });
    })
    // update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
    .put(function(req, res) {
        // use our bear model to find the bear we want
        Venta.findById(req.params.venta_id, function(err, venta) {
            if (err) {
              res.json({ 
                success: false,
                message: 'Venta no encontrada'
              });
            }

            venta.producto = req.body.producto;
            venta.tamano = req.body.tamano;
            venta.cantidad = req.body.cantidad;
            venta.tienda = req.body.tienda;
            venta.precio = req.body.precio;

            // save the bear
            venta.save(function(err) {
              res.json({ 
                success: !err,
                message: !err ? 'Venta actualizada Exitosamente!' : err 
              });
            });

        });
    })
    //
    .delete(function(req, res) {
        Venta.remove({
            _id: req.params.venta_id
        }, function(err, venta) {
            res.json({ 
              success: !err,
              message: !err ? 'Venta Borrada Exitosamente!' : err 
            });
        });
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);



// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);