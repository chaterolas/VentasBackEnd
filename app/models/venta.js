
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var VentaSchema   = new Schema({
    producto: String,
    tamano: String,
    cantidad: Number,
    tienda: String,
    precio: Number
});

module.exports = mongoose.model('Venta', VentaSchema);