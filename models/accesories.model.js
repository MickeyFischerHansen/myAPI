
const { Schema, model, SchemaTypes } = require("mongoose");

const AccesorieSchema = new Schema({
    brand: SchemaTypes.String,
    name: SchemaTypes.String,
    price: SchemaTypes.Decimal128,
    product: SchemaTypes.String
    
})

const Accesorie = model("Accesorie", AccesorieSchema);

module.exports = Accesorie;