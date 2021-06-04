
const express = require('express');
const router = express.Router();
const Animal = require("../models/animals.model")
const auth = require("../auth-middleware")


// get all animals
router.get('/animals', async function(request, response, next){

    try {
        let result = await Animal.find();

        response.json(result);

    } catch (error) {
       return next(error);
    }
})

//get single animal by ID
router.get('/animals/:animalId', async function(request, response, next){
    try {
        let result = await Animal.findById(request.params.animalId);

        //return 404 if no result is found 
        if (result == null) {
            return next(new Error('cannot find requested resource'))
        }

        response.status(200)
        response.json(result)

    } catch (error) {
       return next(error);
    }
})


router.post('/animals', auth, function(request, response, next){

    try {
        let animal = new Animal({
            type: request.fields.type,
            breed: request.fields.breed,
            name: request.fields.name,
            age: request.fields.age,
            sex: request.fields.sex,
            colors: request.fields.colors
        });
        animal.save();

        response.status(201);
        response.json(animal);
        
    } catch (error) {
       return next(error);
    }
})


router.patch('/animals/:animalId', auth, async function(request, response, next){

    let { type, breed, age, name, sex, colors } = request.fields
    let updateObject = {}

    if(type) updateObject.type = type;
    if(breed) updateObject.breed = breed;
    if(name) updateObject.name = name;
    if(age) updateObject.age = age;
    if(sex) updateObject.sex = sex;
    if(colors) updateObject.colors = colors;

   let animal = await Animal.findByIdAndUpdate(request.params.animalId, updateObject, {new:true})
    //let animal = animal.findById()

    response.json(animal)
})


router.delete('/animals/:animalId', auth, async function(request, response, next){

    try {
        await Animal.findByIdAndDelete(request.params.animalId)
        response.status(200)
        response.end()
    } catch (error) {
        return next(error)
    }
})


module.exports = router;