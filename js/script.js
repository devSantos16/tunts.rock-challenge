import fetch from 'node-fetch';




class Country {
    constructor(name, capital, area, currencies) {
        this.name = name;
        this.capital = capital;
        this.area = area;
        this.currencies = currencies;
    }

}

async function setCountryAPI(listCountry) {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();

    for (let i = 0; i < data.length; i++) {
        listCountry.push(new Country(data[i].name.common, data[i].capital, data[i].area, data[i].currencies));
    }

    return listCountry;
}

async function run() {
    let listCountry = [];
    await setCountryAPI(listCountry);
    console.log(listCountry)
}


run();






