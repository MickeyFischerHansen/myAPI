const express = require('express');
const router = express.Router();
const Food = require("../models/foods.model")
const auth = require("../auth-middleware")


// get all food
router.get('/food', async function(request, response, next){

    try {
        let result = await Food.find();

        response.json(result);

    } catch (error) {
       return next(error);
    }
})



router.post('/food', auth, function(request, response, next){

    try {
        let food = new Food({
            brand: request.fields.brand,
            name: request.fields.name,
            price: request.fields.price,
            weight: request.fields.weight,
            animal: request.fields.animal
        });
        food.save();

        response.status(201);
        response.json(food);
        
    } catch (error) {
       return next(error);
    }
})


module.exports = router;