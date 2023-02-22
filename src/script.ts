import { readFileSync } from 'fs';

interface stateObject {
    state: string,
    population: number,
    deaths: number,
    mortalityRate?: number,
}

const data: stateObject[] = readFileSync('time_series_covid19_deaths_US.csv', {
    encoding: 'utf-8'
})
.split('\r')
.map((row) => {
    return row.split(/\,(?=(?:[^"]|"[^"]*")*$)/);
})
.slice(1)
.map((row) => {
    let stateObject: stateObject = {
        state: row[6],
        population: parseInt(row[11]),
        deaths: parseInt(row[row.length - 1]),
    }
    return stateObject;
});

const dataGrouped: stateObject[] = data.slice(1)
.reduce((group, stateObject) => {
    let lastIndex: number = group.length - 1;
    let currentState: string = group[lastIndex]['state'];
    let { state, population, deaths } = stateObject;
    if ( currentState == state ) {
        group[lastIndex]['population'] += population;
        group[lastIndex]['deaths'] += deaths;
    } else {
        group.push(stateObject);
    }
    return group;
}, [data[0]])
.map((item) => {
    let deathsRate: number = 0;
    if (item['population'] > item['deaths'] && item['population'] > 0) {
        deathsRate = 1000 * item['deaths'] / item['population'];
    }
    item.mortalityRate = Math.round(deathsRate * 100) / 100;;
    return item;
});

let mortalityRateVsPopulation: string = "";
dataGrouped.forEach((item) => mortalityRateVsPopulation += `${item['state']} | ${item['mortalityRate']} | ${item['population']}\n`);
const answer3: string = `3. El porcentaje de muertes (Tasa de mortalidad) vs el total de población por estado es el siguiente:\n\n${mortalityRateVsPopulation}`;

const dataByDeaths: stateObject[] = dataGrouped.sort((a, b) => {
    return b['deaths'] - a['deaths'];
});
const answer1: string = `1. El estado con mayor acumulado a la fecha es ${dataByDeaths[0]['state']} con un total de muertes de ${dataByDeaths[0]['deaths']}`;
const answer2: string = `2. El estado con menor acumulado a la fecha es ${dataByDeaths[dataByDeaths.length - 1]['state']} con un total de muertes de ${dataByDeaths[dataByDeaths.length - 1]['deaths']}`;

const MaxMortalityRate: stateObject = dataGrouped.sort((a, b) => {
    return b['mortalityRate'] && a['mortalityRate']? b['mortalityRate']- a['mortalityRate']: 0;
})[0];
const answer4: string = `4. El estado más afectado fue ${MaxMortalityRate['state']}, pues su tasa de mortalidad fue de ${MaxMortalityRate['mortalityRate']}%, la más alta de USA`;

console.log(`${answer1}\n\n${answer2}\n\n${answer3}\n${answer4}`);
