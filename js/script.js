import fetch from 'node-fetch';
import xl from 'excel4node';

class Country {
    constructor(name, capital, area, currencies) {
        this.name = name;
        this.capital = capital;
        this.area = area;
        this.currencies = currencies;
    }

}

async function Program() {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    const listCountry = [];


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

    const TOExcel = (listCountry) => {

        let wb = new xl.Workbook();
        let ws = wb.addWorksheet('Country List', option);
        
        ws.column(1).setWidth(60.2271);


        const styleTitle = wb.createStyle({
            font: {
                bold: true,
                size: 16,
                color: "#4F4F4F",
                vertAlign: 'center'

                // alignment: 'center'
            },
            alignment: {
                horizontal: 'center',
                vertical: 'center'
            },
        })

        const header = wb.createStyle(
            {
                font: {
                    bold: true,
                    size: 12,
                    color: "#808080"
                }
            })


        const style = wb.createStyle(
            {
                font: {
                    color: '#FF0800',
                    size: 12,
                },
                numberFormat: '$#,##0.00; ($#,##0.00); -',
            });


        try {

            ws.cell(1, 1, 1, 4, true)
                .string('Country List')
                .style(styleTitle);

            ws.cell(2, 1)
                .string('Name')
                .style(header);

            ws.cell(2, 2)
                .string('Capital')
                .style(header);

            ws.cell(2, 3)
                .string('Area')
                .style(header);

            ws.cell(2, 4)
                .string('Currencies')
                .style(header);

            for (let i = 0; i < listCountry.length; i++) {
                ws.cell(i + 3, 1)
                    .string(listCountry[i].name)
                    .style(style);
            }
        }

        catch (error) {
            console.log(error);
        }

        wb.write('Excel.xlsx');

    }


    for (let i = 0; i < data.length; i++) {

        const name = verifyUndefined(data[i].name.common);
        const capital = verifyUndefined(data[i].capital);
        const area = data[i].area;
        const currency = await verifyCurrency(data[i].currencies);

        const country = new Country(name, capital, area, currency);
        listCountry.push(country);
    }

    // console.log(listCountry);
    TOExcel(listCountry);

}

async function run() {
    await Program();
}


run();






