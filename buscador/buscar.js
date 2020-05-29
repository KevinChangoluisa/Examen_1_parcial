const csv = require("csvtojson");
const colors = require('colors');
const fs = require('fs')

async function getData(archivo) {
    try {
        const datos = await csv().fromFile(archivo);
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
    let informacion = [];
    let datos = await getData(archivo);
    if (datos != "Error 200") {
        let Country = await getCountry(datos, cod);
        if (Country == true) {
            let pais = await getPais(datos, cod);
            if (anio >= 1964 && anio <= 2019) {
                getSuscrip(datos, cod, anio)
                    .then((suscriPais) => {
                        console.log("============================================================================".bgMagenta);
                        console.log();
                        console.log("   Datos:".blue + "        Personas que usan Internet( % de la población)".yellow);
                        console.log("   Pais:".blue + `         ${pais}`.yellow);
                        console.log("   Codigo pais:".blue + `  ${cod}`.yellow);
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
    return await informacion;
}

module.exports = {
    consulta
}