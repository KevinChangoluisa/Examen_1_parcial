/*IMPORTANTE INSTALAR
npm i yargs colors--save
npm i csvtojson--save

IMPORTANTE NO ELIMINAR ISO - 3166 - ALPHA - 3. json DE LA CARPETA BUSCADOR
CONTIENE LOS CODIGOS DE PAISES NORMA ISO - 3166 - ALPHA - 3 ACTUALES
*/

const argv = require('./config/yargs').argv;
const tareas = require('./buscador/buscar');
const colors = require('colors');
let comando = argv._[0];



switch (comando) {
    case 'mostrar':
        let consulta = tareas.consulta(argv.archivo, argv.anio, argv.pais);
        break;
    case 'guardar':
        let guardar = tareas.guardar(argv.archivo, argv.anio, argv.pais);
        break;
    default:
        console.log('Comando no reconocido');
}