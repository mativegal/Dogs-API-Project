const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const DogRoutes = require('./dog');
const DogsRoutes = require('./dogs');
const TemperamentRoutes = require('./temperament');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dog', DogRoutes);
router.use('/dogs', DogsRoutes);
router.use('/temperament', TemperamentRoutes);


module.exports = router;
