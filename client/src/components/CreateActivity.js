import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { postActivities, getAllCountries, getActivities } from "../actions";

export default function CreateActivity() {
  const dispatch = useDispatch();

  const history = useHistory();

  //   const countriesMap = useSelector((state) => state.countries);
  // //   const activities = useSelector((state) => state.activities);

  const { countriesMap, allActivity } = useSelector((state) => state);

  //   const activities = useSelector((state) => state.activities);

  useEffect(() => {
    dispatch(getActivities());
    dispatch(getAllCountries());
  }, [dispatch]);

  // manejo el objeto | input
  const [createAct, setCreateAct] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countryID: [],
  });

  //   Cuando esto este en true, va a deshabilitar el boton de submit
  //Cuando no haya nada dentro del errorForm no tiene nada adentro es decir no tiene propiedades sera false y se activa el boton
  const [errorForm, setErrorForm] = useState({});
  

  //   const [errorButton, setErrorButton] = useState(
  //     Object.keys(errorForm).length < 1 ? false : true
  //   );

  // funcion para validar los datos ingresados en los inputs

  //   let regexLetters = /[^a-zA-Z\s]/g;
  //   let regexNumbers = /^[0-9]+$/;

  //   const validate = (createAct) => {
  //     let errors = {};
  //     if (!createAct.name) {
  //       errors.name = "no puede estar vacio";
  //     } else if (createAct.name.length > 3) {
  //       errors.name = "debe ingresar mas de 3 caracteres";
  //     } else if (typeof createAct.name !== "undefined") {
  //       if (!createAct.name.match(regexLetters)) {
  //         errors.name = "solo puede ingresar letras";
  //       }
  //     } else if (!createAct.duration) {
  //       errors.duration = "tiene que ingresar una duracion";
  //     } else if (typeof createAct.duration !== "undefined") {
  //       if (!createAct.duration.match(regexNumbers)) {
  //         errors.duration = "tiene que ingresar una duracion";
  //       }
  //     } else if (!createAct.difficulty) {
  //       errors.difficulty = "tiene que ingresar una dificultad";
  //     } else if (createAct.season) {
  //       errors.season = "Debe ingresar una temporada";
  //     } else if (data.countryID) {
  //       errors.countryID = "Debe ingresar un pais";
  //     }
  //     return errors;
  //   };

  //   funcion para escribir, maneja los cambios por medio del input, validamos los errores aca
  // modifico el estado anterior, haciendo copia del mismo y capturando el value entregado

  const handleChange = (e) => {
    setCreateAct({
      ...createAct,
      [e.target.name]: e.target.value,
    });
  };
  // setErrorForm(validate(createAct)); //valido el obj (createAct) y lo guardo en un estado local para los errores del form
  // console.log(createAct);

  //   funcion para enviar, maneja las entregas a la base de datos, se envia sin errores
  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     dispatch(postActivities(createAct));
  //     alert("Actividad Creada");
  //     setCreateAct({
  //       name: "",
  //       duration: "",
  //       difficulty: "",
  //       season: "",
  //       countryID: [],
  //     });
  //     history.push("/home");
  //   };

  function handleSubmit(e) {
    if (
      !createAct.name ||
      !createAct.difficulty ||
      !createAct.duration ||
      !createAct.season ||
      !createAct.countryID
    ) {
      e.preventDefault();
      alert("Complete todos los campos para poder continuar");
    } else {
      e.preventDefault();
      dispatch(postActivities(createAct));
      alert("Tu actividad ha sido creada exitosamente");
      // Para volver a la pantalla principal
      history.push("/countries");
      // Reseteamos el createAct
      setCreateAct({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        countryID: [],
      });
    }
  }

  //   funcion para eliminar la actividad que seleccione la persona
  const handleDelete = (i) => {
    setCreateAct({
      ...createAct,
      countryID: createAct.countryID.filter((el) => el !== i),
    });
  };

  //   funcion para seleccionar los paises entre las opciones | no se pueden repetir los paises

  const handleSelectCountries = (e) => {
    setCreateAct({
      ...createAct,
      countryID: [...createAct.countryID, e.target.value],
    });
  };

  return (
    <main>
      <form onSubmit={(e) => handleSubmit(e)}>
        <span>Create Activities</span>
        <div>
          <label>Name</label>
          <input
            name="name"
            type="text"
            placeholder="enter activity"
            value={createAct.name}
            onChange={(e) => handleChange(e)}
          />
          {errorForm.name ? <h4>{errorForm.name} </h4> : false}
        </div>

        <div>
          <label>Difficulty</label>
          <input
            name="difficulty"
            type="range"
            placeholder="enter difficulty"
            value={createAct.difficulty}
            onChange={(e) => handleChange(e)}
            min="1"
            max="5"
          />
          {errorForm.difficulty ? <h4>{errorForm.difficulty} </h4> : false}
        </div>
        <div>
          <label>Duration</label>
          <input
            name="duration"
            type="text"
            placeholder="enter duration"
            value={createAct.duration}
            onChange={(e) => handleChange(e)}
          />
          {errorForm.duration ? <h4>{errorForm.duration} </h4> : false}
        </div>

        <div>
          <label>Season</label>
          <select
            name="season"
            value={createAct.season}
            onChange={(e) => handleChange(e)}
          >
            <option>Select</option>
            <option value="Winter">Winter</option>
            <option value="Summer">Summer</option>
            <option value="Spring">Spring</option>
            <option value="Autumn">Autumn</option>
          </select>
          {errorForm.season ? <h4>{errorForm.season} </h4> : false}
        </div>

        <div>
          <select onChange={(e) => handleSelectCountries(e)}>
             <option>Countries</option> 
            {countriesMap.map((c,i) => (
              <option key={i} value={c.id}>
                {c.name}
                {/* <img src={c.flag[0]} alt="" /> */}
              </option>
            ))}
          </select>
        </div>

        <div className="textArea">
          {createAct.countryID.map((country) => (
            <div>
              <input
                type="button"
                value="X"
                onClick={() => handleDelete(country)}
              />
              <p>{country}</p>
            </div>
          ))}
        </div>

        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </main>
  );
}
