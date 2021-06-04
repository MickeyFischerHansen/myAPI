
const { Schema, model, SchemaTypes } = require("mongoose");

const FoodSchema = new Schema({
    brand: SchemaTypes.String,
    name: SchemaTypes.String,
    price: SchemaTypes.Decimal128,
    weight: SchemaTypes.Number,
    animal: SchemaTypes.String,
})

const Food = model("Food", FoodSchema);

module.exports = Food;