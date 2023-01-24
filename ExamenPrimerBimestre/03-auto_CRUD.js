const leerEscribirArchivos = require("./01-leerEscribirArchivos.js")
const funcionesCRUD = require("./02-funcionesCreateRead.js")
let _ = require('underscore');

let archivoAutosDisponibles = "autosDisponibles.txt";

function Auto(marcaParametro, modeloParametro, numeroDePuertasParametro, precioDeLaRentaPorDiaParametro, ultimaFechaServicioParametro) {
    this.marca = marcaParametro;
    this.modelo = modeloParametro;
    this.numeroDePuertas = numeroDePuertasParametro;
    this.ultimaFechaServicio = ultimaFechaServicioParametro;
    this.precioDeLaRentaPorDia = precioDeLaRentaPorDiaParametro;
}

//CREAR
async function guardarEnArchivoDatosAutoDisponibles(marcaParametro, modeloParametro, numeroDePuertasParametro, precioDeLaRentaPorDiaParametro, ultimaFechaServicioParametro) {
    let detallesAutoNuevo = new Auto(marcaParametro, modeloParametro, numeroDePuertasParametro, precioDeLaRentaPorDiaParametro, ultimaFechaServicioParametro)

    await funcionesCRUD.crearAutos_DetalleRenta(archivoAutosDisponibles, detallesAutoNuevo);
}

//ACTUALIZAR
async function actualizarPrecioAuto(precioParametro, autoSeleccionado) {
    await leerEscribirArchivos.leerArchivo(archivoAutosDisponibles)
        .then( // return
            async (autosDisponibles) => {
                autosDisponibles = JSON.parse(autosDisponibles);
                await autosDisponibles
                    .map(
                        (valorActual) => {
                            if (_.isEqual(valorActual, autoSeleccionado)) {
                                valorActual.precioDeLaRentaPorDia = Number(precioParametro);

                                let listaDeAutosActualizadaJson = JSON.stringify(autosDisponibles, null, '\t');
                                leerEscribirArchivos.guardarDatos(archivoAutosDisponibles, listaDeAutosActualizadaJson);
                                console.log("DATOS ACTUALIZADOS")
                                console.log(valorActual);
                            }
                        }
                    );
            }
        ).catch( // throw
            (error) => {
                console.error('Error: ', error);
            }
        );
}

//ELIMINAR
async function eliminarAuto(autoAEliminar) {
    await leerEscribirArchivos.leerArchivo(archivoAutosDisponibles)
        .then( // return
            async (autosDisponibles) => {
                autosDisponibles = JSON.parse(autosDisponibles);
                const indiceAutoAEliminar = await autosDisponibles
                    .findIndex(
                        (valorActual) => {
                            return (_.isEqual(valorActual, autoAEliminar));
                        }
                    );

                autosDisponibles.splice(indiceAutoAEliminar, 1)
                let listaDeAutosActualizadaJson = JSON.stringify(autosDisponibles, null, '\t');
                leerEscribirArchivos.guardarDatos(archivoAutosDisponibles, listaDeAutosActualizadaJson);
            }
        ).catch( // throw
            (error) => {
                console.error('Error: ', error);
            }
        );

}



module.exports = {
    "guardarEnArchivoDatosAutoDisponibles": guardarEnArchivoDatosAutoDisponibles,
    "actualizarPrecioAuto": actualizarPrecioAuto,
    "eliminarAuto": eliminarAuto,
    "Auto":Auto
}