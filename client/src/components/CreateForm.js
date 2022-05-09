import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { postActivities, getAllCountries } from "../actions";
import { useEffect, useState } from "react";
import s from '../styled/CreateForm.module.css'



const validate = (createAct) => {
  let errors = {};
  let letters = /^[A-Za-z]+$/

  if (!createAct.name.trim()) {
    errors.name = "name is required";
  } else if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/.test(createAct.name)) {
    errors.name = "name must be only letters ";
  } 

  if (!createAct.difficulty) errors.difficulty = "difficulty is required";
  if (!createAct.duration) errors.duration = "duration is required";
  if (parseInt(createAct.duration) < 1 || parseInt(createAct.duration) > 30)
    errors.duration = "duration must be greater than 0 and less than 30";
  if (!createAct.season) errors.season = "season is required";
  if (!createAct.countryId.length === 0)
    errors.countryId = "country is required";

    console.log(errors)
  return errors;
};


export default function CreateForm () {
  const dispatch = useDispatch();
  const history = useHistory();
  const countriesMap = useSelector((state) => state.countries);
  // const allActivities= useSelector((state)=> state.activities)
  const [errorForm, setErrorForm] = useState({});

  const [createAct, setCreateAct] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countryId: [],
  });

  console.log(createAct);
  // const arrActivities = allActivities.map((x) => x.name);

    // const [errorButton, setErrorButton] = useState(
    //    Object.keys(errorForm).length < 1 ? false : true
    //  );

  
  const handleChange = (e) => {
    setCreateAct({
      ...createAct,
      [e.target.name]: e.target.value,
    });
    setErrorForm(validate({
      ...createAct,
      [e.target.name] : e.target.value
  }));
  };

  const handleSelectCountries = (e) => {
    setCreateAct({
      ...createAct,
      countryId: [...new Set([...createAct.countryId, e.target.value])], //evito que se dupliquen
    });
    setErrorForm(validate({
      ...createAct,
      [e.target.name] : e.target.value
  }));
  };

  function handleSubmit(e) {
    if (
      !createAct.name ||
      !createAct.difficulty ||
      !createAct.duration ||
      !createAct.season ||
      !createAct.countryId
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
        countryId: [],
      });
    }
  }

  const handleDelete = (c) => {
    setCreateAct({
      ...createAct,
      countryId: createAct.countryId.filter((el) => el !== c),
    });
  };

  useEffect(() => {
    // dispatch(getActivities());
    dispatch(getAllCountries());
  }, [dispatch]);

  return (
   
  <div className={s.form}>
    <form onSubmit={handleSubmit}>

      <div className={s.container}>
        <p className={s.title}>Activity</p>
        <div>
          {/* <p>Countries</p> */}
          <select className={s.sForm}onChange={handleSelectCountries}>
            <option>Select Countries</option>
            {countriesMap.map((c, index) => (
              <option key={index} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <div className={s.selectCountry}>
            {createAct.countryId.map((country, index) => (
              <div>
                <input
                className={s.selectX}
                  key={index}
                  type="button"
                  value="X"
                  onClick={() => handleDelete(country)}
                />
                <p>{country}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div>
            <p className={s.pTitle}>Activity</p>
            <input
            className={s.input}
              type="text"
              name="name"
              value={createAct.name}
              autoComplete="off"
              placeholder="Write Activity"
              onChange={handleChange}
            />
            {errorForm.name && <p className={s.error}>{errorForm.name}</p>}
          </div>
        </div>

        <div>
          <div>
            <p className={s.pTitle}>Duration (days)</p>
            <input
              className={s.input}
              type="number"
              name="duration"
              value={createAct.duration}
              autoComplete="off"
              placeholder="Duration"
              onChange={handleChange}
            />

            {errorForm.duration && <p className={s.error}>{errorForm.duration}</p>}
          </div>
        </div>

      
        <div>
          <label className={s.label}>Difficulty (between 1 and 5)</label>
          <input
          className={s.inputD}
            name="difficulty"
            type="number"
            placeholder="enter difficulty"
            value={createAct.difficulty}
            onChange={(e) => handleChange(e)}
            min="1"
            max="5"
          />
          {errorForm.difficulty ? <p className={s.error}>{errorForm.difficulty} </p> : false}
        </div>

       
        <div>
          <label className={s.label}>Season</label>
          <select
          className={s.sForm}
            name="season"
            value={createAct.season}
            onChange={(e) => handleChange(e)}
          >
            <option>Select Season</option>
            <option value="Winter">Winter</option>
            <option value="Summer">Summer</option>
            <option value="Spring">Spring</option>
            <option value="Autumn">Autumn</option>
          </select>
          {errorForm.season ? <p className={s.error}> {errorForm.season} </p> : false}
        </div>

        <div>
          <button className={s.button} type="submit" /* disabled={errorButton} */>Send</button>
        </div>
      </div>
    </form>
    </div>
  );
}
