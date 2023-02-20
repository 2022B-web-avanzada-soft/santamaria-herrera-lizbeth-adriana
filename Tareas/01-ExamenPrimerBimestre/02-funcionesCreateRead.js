const leerEscribirArchivos = require("./01-leerEscribirArchivos");

async function listarAutos_DetalleRenta(path) {
    let autos_DetalleRenta = [];
    await leerEscribirArchivos.leerArchivo(path)
        .then(
            async (autosDetalleRenta) => {
                autosDetalleRenta = JSON.parse(autosDetalleRenta);
                autosDetalleRenta.forEach(
                    function (autoDetalleRentaActual) {
                        autos_DetalleRenta.push(JSON.stringify(autoDetalleRentaActual));
                    }
                );
            }
        ).catch( // throw
            (error) => {
                console.error('Error: ', error);
            }
        );
    return (autos_DetalleRenta);
}

async function crearAutos_DetalleRenta(path, detalleAutoORenta) {
    let listaDeAutosODetallesRentaActualizada = [];
    await leerEscribirArchivos.leerArchivo(path)
        .then( // return
            async (AutosODetallesRenta) => {
                AutosODetallesRenta = JSON.parse(AutosODetallesRenta);
                listaDeAutosODetallesRentaActualizada = [...AutosODetallesRenta];
                listaDeAutosODetallesRentaActualizada.push(detalleAutoORenta);
            }
        ).catch( // throw
            (error) => {
                console.error('Error: ', error);
            }
        );

    let listaDeAutosODetallesRentaActualizadaJson = JSON.stringify(listaDeAutosODetallesRentaActualizada, null, '\t');
    leerEscribirArchivos.guardarDatos(path, listaDeAutosODetallesRentaActualizadaJson);
}


module.exports = {
    "listarAutos_DetalleRenta": listarAutos_DetalleRenta,
    "crearAutos_DetalleRenta": crearAutos_DetalleRenta
}