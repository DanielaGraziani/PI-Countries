const {Router}  = require("express");
const router = Router();
const { Country, Activity } = require("../db");
const axios = require("axios");
const { Op } = require("sequelize");

//*  En una primera instancia deberán traer todos los países desde restcountries y guardarlos en su propia base de datos y luego ya utilizarlos desde allí (Debe almacenar solo los datos necesarios para la ruta principal) Obtener un listado de los paises. */

router.get("/", async (req, res) => {
  // buscar en la base de datos si tienen la info, sino traernos de la api la info y guardarlo en la bd.

  try {
    //1. aca guardo en una variable el modelo de la base de datos para ir a buscar
    let countries = await Country.findAll();
    // 2. si no hay info en la base de datos busco en la api externa y mapeo la info que necesito
    if (countries.length === 0) {
      const allApiData = await axios.get("https://restcountries.com/v3/all");
      const resultMap = await allApiData.data.map((c) => {
        return {
          id: c.cca3,
          name: c.name.common,
          flag: c.flags[1],
          continent: c.continents[0],
          capital: c.capital ? c.capital[0] : 'Undefined',
          subregion: c.subregion || 'Undefined',
          area: c.area,
          population: c.population,
        };
      });

      // 3. Inserto la data que me llega de la api en la base de datos
      await Country.bulkCreate(resultMap);
      //   countries = resultMap;
    }
    //* Buscar el nombre por query

    const { name } = req.query;
    //4. si ingresan un name, hacer la busqueda en la base de datos con los que matchee, si no lo encuentra enviar un mensaje
    if (name) {
      let countriesName = await Country.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
      });

      //5. si el pais coincide con lo que se encuentra en la db, mostrarlo, sino enviar mensaje
      res.json(
        countriesName.length
          ? countriesName
          : `The country is not found: ${name}`
      );

      //6. sino mostrar la db por defecto, incluyendo la tabla de actividades
    } else {
      let Allcountries = await Country.findAll({
        include: Activity,
      });
      res.send(Allcountries);

    }
  } catch (error) {
    console.log(error);
  }
});

//* Busco por ID

router.get("/:id", async (req, res) => {
  //1. Capturo el id a traves de params
  const id = req.params.id.toUpperCase();

  //2. Busco en la base de datos el id que coincida con el pasado por parametro e incluir las actividades
  try {
    let countryID = await Country.findByPk(id, {
      include: Activity,
    });
    
    // 3. retorno la coincidencia
    countryID
      ? res.status(200).send(countryID)
      : res.status(404).send("The country is not found");
  } catch (error) {
    console.log(error);
  }
});



module.exports = router;
