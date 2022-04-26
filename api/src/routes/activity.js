const { Router } = require("express");
const router = Router();
const { Activity, Country } = require("../db.js");

/* Recibe los datos recolectados desde el formulario controlado de la ruta de creación de actividad turística por body
  - Crea una actividad turística en la base de datos */

router.get("/", async (req, res) => {
  //traer los datos que se encuentran almacenados con activity.findAll por medio del form
  const formActivities = await Activity.findAll();
  res.status(200).send(formActivities);
});


router.post("/", async (req, res) => {
 
  //creo las actividades segun lo pedido en el modelo, agregando el countryId de la tabla
  //intermedia la cual llegara por body 

    try {
        const { name, difficulty, duration, season, countryId } = req.body;
      
        const activitiesCreate = await Activity.create({
          name,
          difficulty,
          duration,
          season,
          countryId,
        });
      
    //busco en el modelo de countries todas las id que coincidan con countryId (tabla intermedia)
        const countries = await Country.findAll({
          where: {
            id: countryId,
          },
        });
        

    //aca hago la relacion de las dos tablas. Muchos a muchos
        activitiesCreate.addCountry(countries);
          res.status(200).send({ msg: "Activity created successfully" });
        
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;
