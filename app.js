const argv = require('./config/yargs').argv;
const colors = require('colors');
let comando = argv._[0];


switch (comando) {
    case 'mostrar':
        let consulta = tareas.imprimir(argv.archivo, argv.anio, argv.pais);
        break;
    case 'guardar':
        let guardar = tareas.guardar(argv.archivo, argv.anio, argv.pais);
        break;
    default:
        console.log('Comando no reconocido');
}