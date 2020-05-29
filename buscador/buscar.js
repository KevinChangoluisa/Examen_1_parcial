const csv = require("csvtojson");
const colors = require('colors');
const fs = require('fs')

async function getData(archivo) {
    try {
        const datos = await csv().fromFile(archivo, 'utf8');
        let data = []
        var codes = JSON.parse(fs.readFileSync('./buscador/ISO-3166-ALPHA-3.json', 'utf8'));
        for (let dat of datos) {
            dat = Object.values(dat);
            for (let cod of codes) {
                if (dat[1] == cod.countryCode) {
                    data.push(dat);
                }
            }
        }
        return data;
    } catch (error) {
        error = "Error 200"
        return error;
    }
}
async function getCountry(pais, cod) {
    for (var i = 0; i < pais.length; i++) {
        let va = Object.values(pais[i]);
        if (va[1] == cod) {
            return true;
        }
    }
}

async function getSuscrip(pais, cod, anio) {
    for (var i = 0; i < pais.length; i++) {
        let va = Object.values(pais[i]);
        if (va[1] == cod) {
            suscrip = va[anio - 1956]
            return suscrip
        }
    }
}

async function getIndicadorName(pais, cod) {
    for (var i = 0; i < pais.length; i++) {
        let va = Object.values(pais[i]);
        if (va[1] == cod) {
            indi_name = va[2]
            return indi_name
        }
    }
}

async function getPais(pais, cod) {
    for (var i = 0; i < pais.length; i++) {
        let va = Object.values(pais[i]);
        if (va[1] == cod) {
            namePais = va[0]
            return namePais
        }
    }
}

async function consulta(archivo, anio, cod) {
    let datos = await getData(archivo);
    if (datos != "Error 200") {
        let Country = await getCountry(datos, cod);
        if (Country == true) {
            let pais = await getPais(datos, cod);
            let iname = await getIndicadorName(datos, cod);
            if (anio >= 1960 && anio <= 2019) {
                getSuscrip(datos, cod, anio)
                    .then((suscriPais) => {
                        console.log("============================================================================".bgMagenta);
                        console.log();
                        console.log("   Datos:".blue + `        ${iname}`.yellow);
                        console.log("   País:".blue + `         ${pais}`.yellow);
                        console.log("   Codigo país:".blue + `  ${cod}`.yellow);
                        console.log("   Año:".blue + `          ${anio}`.yellow);
                        console.log("   Valor:".blue + `        ${suscriPais}`.yellow);
                        console.log();
                        console.log("============================================================================".bgMagenta);
                    })
            } else {
                console.log('\n     ' + `Al momento no existe registros para el año: ${anio} `.bgRed);
            }
        } else {
            console.log('\n     ' + `No existe el codigo de pais: ${cod} en la base de datos. `.bgRed);
        }

    } else {
        console.log(`\n `, `::::No existe el archivo ${archivo} !::::`.bgRed)
    }
}

async function guardar(archivo, anio, cod) {
    let datos = await getData(archivo);
    if (datos != "Error 200") {
        let Country = await getCountry(datos, cod);
        if (Country == true) {
            let pais = await getPais(datos, cod);
            let iname = await getIndicadorName(datos, cod);
            if (anio >= 1960 && anio <= 2019) {
                getSuscrip(datos, cod, anio)
                    .then((suscriPais) => {
                        fs.writeFileSync(`./resultados/${cod}-${anio}.txt`, `Datos: ${iname}\nPais: ${pais}\nCod: ${cod}\nAnio: ${anio}\nValor: ${Number(suscriPais)}`);
                        console.log(`Archivo guardado exitósamente: /resultados/${cod}-${anio}.txt`.bgGreen);
                    })
            } else {
                console.log('\n     ' + `Al momento no existe registros para el año: ${anio} `.bgRed);
            }
        } else {
            console.log('\n     ' + `No existe el codigo de pais: ${cod} en la base de datos. `.bgRed);
        }

    } else {
        console.log(`\n `, `::::No existe el archivo ${archivo} !::::`.bgRed)
    }
}

module.exports = {
    consulta,
    guardar
}