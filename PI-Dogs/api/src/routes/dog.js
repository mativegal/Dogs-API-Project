const {Router} = require('express');

const router = Router();
const { v4: uuidv4 } = require('uuid');
const {Dog} = require("../db")


router.post('/', async (req, res, next) => {
    const {name, height, weight, life_span, temperaments} = req.body;
    const id = uuidv4();
    
    try {
        const createdDog = await Dog.create({id, name, height, weight, life_span})
        await createdDog.setTemperaments(temperaments)
    }
    catch (err) {
        next(err);
    }
});


module.exports = router;