const axios = require('axios')

async function getApiInfo() {
    const apiUrl = await axios.get('https://restcountries.com/v3/all')
    const apiInfo = await apiUrl.data.map((c) => {
        return {
            id: c.cca3,
            name: c.name.common,
            flag: c.flags[0],
            continent: c.continents[0],
            capital: c.capital,
            subregion: c.subregion,
            area: c.area,
            population: c.population
        }
    })
}
     console.log(apiInfo)
     