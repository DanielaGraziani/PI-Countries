const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

const countryRouter = require('./country.js')
const activityRouter= require('./activity.js')
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/countries', countryRouter)
router.use('/activity', activityRouter)

module.exports = router;
