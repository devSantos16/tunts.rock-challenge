import fetch from 'node-fetch';

class Country {
    constructor(name, capital, area, currencies) {
        this.name = name;
        this.capital = capital;
        this.area = area;
        this.currencies = currencies;
    }

}

async function Program(listCountry) {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();


    const verifyUndefined = (str) => {
        if (str === undefined) {
            return '-'
        }
        return str.toString();
    }

    const verifyCurrency = (currency) => {
        // Perccorre no objeto de currencies e concatena todos os Currency
        let currencies = '';

        for (let value in currency) {
            currencies += `${value},`
        }

        // Se currency não for vazio ele formata a string removendo a ultima virgula, caso não, apenas bota um traço
        if (currencies) {
            currencies = currencies.substring(0, currencies.length - 1);
            return currencies;
        }

        return "-";

    }


    for (let i = 0; i < data.length; i++) {

        const name = verifyUndefined(data[i].name.common);
        const capital = verifyUndefined(data[i].capital);
        const area = data[i].area;
        const currency = await verifyCurrency(data[i].currencies);

        const country = new Country(name, capital, area, currency);


    }

}

async function run() {
    let listCountry = [];
    await Program(listCountry);
}


run();






