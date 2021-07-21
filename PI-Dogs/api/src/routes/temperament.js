const {Router} = require('express');
require("dotenv").config();
const router = Router();
const axios = require("axios");
const { BASE_URL } = require("../../../constants")
const { API_KEY } = process.env;
const { Temperament } = require("../db.js");
const { v4: uuidv4 } = require('uuid');
const temperament = require('../models/temperament');

router.get('/', async (req, res, next) => {

    let temps = []
    let finalT = []

    try {
        await axios.get(`${BASE_URL}?api_key=${API_KEY}`)
            .then(resp => temps = resp.data)
            .catch((error) => next(error))
        let tempsPerros = temps.map(e => e.temperament)
        let splitTemps = tempsPerros.map(e => e && e.split(','))
        let conc = splitTemps.flat()
        
        conc.map(e => {
            if (e != undefined) {
                if (finalT.length === 0 || !finalT.includes(e.trim())) {
                    let espacios = e.trim()
                    finalT.push(espacios)     
                }
            }
        })
            finalT.sort()
            for await (var temp of finalT) {
                Temperament.create({name: temp})
            }
            const db = await Temperament.findAll()
            res.json(db)
            
    }
    catch (error) {
        next(error)
    }
}) 
    

module.exports = router;