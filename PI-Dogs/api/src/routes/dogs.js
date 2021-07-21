require("dotenv").config();
const { Router } = require("express");
const axios = require("axios");
const router = Router();
const {BASE_URL, BREED_URL} = require("../../../constants")
const { API_KEY } = process.env;
const { Sequelize, Op } = require("sequelize");
const { Dog, Temperament } = require("../db.js");
const dogs = require("../models/dogs");
const temperament = require("../models/temperament");


router.get('/', async (req, res, next) => {
    const {name} = req.query
    
        if(!name) {
            try {
            let database = await Dog.findAll({
                include: {
                model: Temperament,
                  attributes: {
                    include: ['name'], 
                    exclude:['createdAt', 'updatedAt']
                  },
                  through: {
                    attributes:[]
                  }  
              }
            });
            let api = await axios.get(`${BASE_URL}`);

            Promise.all([database, api])
            .then((results) => {
                const [resDB, resAPI] = results;
                const response = resDB.concat(resAPI.data);
                res.send(response);
            })}
            catch (err) { 
                next(err);
            }
        } else {
            try {
                let database = await Dog.findAll({
                    include: {
                        model: Temperament,
                          attributes: {
                            include: ['name'], 
                            exclude:['createdAt', 'updatedAt']
                          },
                          through: {
                            attributes:[]
                          }  
                      }
                    });
                let api = await axios.get(`${BREED_URL}${name}&api_key=${API_KEY}`);

                Promise.all([database, api])
                .then((results) => {
                    const [resDB, resAPI] = results;
                    const response = resDB.concat(resAPI.data);
                    res.send(response);
                })
        }
        catch  { 
            resp.send([]);
        };
    }
});

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
     if (id.length > 0) {
        try{
            let resultado = await axios.get(`${BASE_URL}/${id}&${API_KEY}`)
            if (resultado) {
                res.json(resultado.data);
            } else {
                dogs.findOne({ where: { id: id } })
                    .then((resp) => res.send(resp))
                    .catch((e) => next(e));
            }
        }
        catch (err) {
            next (err);
        }
    }
})

module.exports = router;