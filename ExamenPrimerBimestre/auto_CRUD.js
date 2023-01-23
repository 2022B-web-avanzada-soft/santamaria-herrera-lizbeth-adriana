const leerEscribirArchivos = require("./leerEscribirArchivos.js")

function Auto(marcaParametro, modeloParametro, numeroDePuertasParametro, precioDeLaRentaPorDiaParametro,ultimaFechaServicioParametro) {
    this.marca = marcaParametro;
    this.modelo = modeloParametro;
    this.numeroDePuertas = numeroDePuertasParametro;
    this.ultimaFechaServicio = ultimaFechaServicioParametro;
    this.precioDeLaRentaPorDia = precioDeLaRentaPorDiaParametro;
}

//LEER
async function listarAutosDisponibles() {
    let arregloAutos = [];
    await leerEscribirArchivos.leerArchivo("autosDisponibles.txt")
        .then( // return
            async (autosDisponibles) => {
                autosDisponibles = JSON.parse(autosDisponibles);
                autosDisponibles.forEach(
                    function (autoActual) {
                        arregloAutos.push(JSON.stringify(autoActual));
                    }
                );
            }
        ).catch( // throw
            (error) => {
                console.error('Error: ', error);
            }
        );
    return (arregloAutos);
}

//CREAR
async function guardarEnArchivoDatosAutoDisponibles(marcaParametro, modeloParametro, numeroDePuertasParametro, precioDeLaRentaPorDiaParametro, ultimaFechaServicioParametro) {
    let detallesAutoNuevo = new Auto(marcaParametro, modeloParametro, numeroDePuertasParametro, precioDeLaRentaPorDiaParametro,ultimaFechaServicioParametro)
    let listaDeAutosActualizada = [];
    await leerEscribirArchivos.leerArchivo("autosDisponibles.txt")
        .then( // return
            async (autosDisponibles) => {
                autosDisponibles = JSON.parse(autosDisponibles);
                listaDeAutosActualizada = [...autosDisponibles];
                listaDeAutosActualizada.push(detallesAutoNuevo)
            }
        )

    let listaDeAutosActualizadaJson = JSON.stringify(listaDeAutosActualizada, null, '\t');
    leerEscribirArchivos.guardarDatos("autosDisponibles.txt", listaDeAutosActualizadaJson);
}

//ACTUALIZAR
async function actualizarPrecioAuto(precioParametro, autoSeleccionado) {
    await leerEscribirArchivos.leerArchivo("autosDisponibles.txt")
        .then( // return
            async (autosDisponibles) => {
                autosDisponibles = JSON.parse(autosDisponibles);
                await autosDisponibles
                    .map(
                        (valorActual) => {
                            if(valorActual.marca === autoSeleccionado.marca && valorActual.modelo === autoSeleccionado.modelo &&
                                valorActual.numeroDePuertas === autoSeleccionado.numeroDePuertas && valorActual.precioDeLaRentaPorDia === autoSeleccionado.precioDeLaRentaPorDia)
                                valorActual.precioDeLaRentaPorDia = Number(precioParametro);
                        }
                    );
                let listaDeAutosActualizadaJson = JSON.stringify(autosDisponibles, null, '\t');
                leerEscribirArchivos.guardarDatos("autosDisponibles.txt", listaDeAutosActualizadaJson);
            }
        );

}

//ELIMINAR
async function eliminarAuto(autoAEliminar) {
    await leerEscribirArchivos.leerArchivo("autosDisponibles.txt")
        .then( // return
            async (autosDisponibles) => {
                autosDisponibles = JSON.parse(autosDisponibles);
                const indiceAutoAEliminar = await autosDisponibles
                    .findIndex(
                        (valorActual) => {
                            return (valorActual.marca === autoAEliminar.marca && valorActual.modelo === autoAEliminar.modelo &&
                                valorActual.numeroDePuertas === autoAEliminar.numeroDePuertas && valorActual.precioDeLaRentaPorDia === autoAEliminar.precioDeLaRentaPorDia)
                        }
                    );

                autosDisponibles.splice(indiceAutoAEliminar,1)
                let listaDeAutosActualizadaJson = JSON.stringify(autosDisponibles, null, '\t');
                leerEscribirArchivos.guardarDatos("autosDisponibles.txt", listaDeAutosActualizadaJson);
            }
        );

}

/*function guardarEnArchivoDatosAuto() {
    let auto1, auto2, auto3, auto4, auto5;
    auto1 = new Auto("Chevrolet", "Aveo", 4, "", 45)
    auto2 = new Auto("Suzuki", "Suzuki SZ", 4, "", 80)
    auto3 = new Auto("KIA", "picanto", 4, "", 40)
    auto4 = new Auto("Hyundai", "I10", 4, "", 40)
    auto5 = new Auto("Chevrolet", "DMX 4X4", 4, "", 90)

    let autos = [];
    autos.push(auto1)
    autos.push(auto2)
    autos.push(auto3)
    autos.push(auto4)
    autos.push(auto5)
    let autosJson = JSON.stringify(autos, null, '\t');
    ///leer autosDisponibles
    guardarAutos("autosDisponibles.txt", autosJson);
}*/

module.exports = {
    "guardarEnArchivoDatosAutoDisponibles": guardarEnArchivoDatosAutoDisponibles,
    "listarAutosDisponibles": listarAutosDisponibles,
    "actualizarPrecioAuto":actualizarPrecioAuto,
    "eliminarAuto": eliminarAuto
}