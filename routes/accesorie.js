const express = require('express');
const router = express.Router();
const Accesorie = require("../models/Accesories.model")
const auth = require("../auth-middleware")


// get all food
router.get('/accesorie', async function(request, response, next){

    try {
        let result = await Accesorie.find();

        response.json(result);

    } catch (error) {
       return next(error);
    }
})



router.post('/accesorie', auth, function(request, response, next){

    try {
        let accesorie = new Accesorie({
            brand: request.fields.brand,
            name: request.fields.name,
            price: request.fields.price,
            product: request.fields.product
        });
        accesorie.save();

        response.status(201);
        response.json(accesorie);
        
    } catch (error) {
       return next(error);
    }
})


module.exports = router;