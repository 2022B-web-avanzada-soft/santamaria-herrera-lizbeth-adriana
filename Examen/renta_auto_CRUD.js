const leerEscribirArchivos = require("./leerEscribirArchivos.js")
const autosDisponibles = require("./auto_CRUD.js")

function fechaConFormato() {
    let today = new Date();
    let now = today.toLocaleString();
    return now;
}

function RentaAuto(
    numeroDiasDeAlquilerParametro, nombreDelRentadorParametro, pagoEnEfectivoParametro, autoParametro) {
    this.numeroDiasDeAlquiler instanceof Number;
    this.numeroDiasDeAlquiler = numeroDiasDeAlquilerParametro;
    this.fechaRenta = fechaConFormato();
    this.nombreDelEncargadoDelServicio = "Lizbeth Santamaria";
    this.nombreDelRentador = nombreDelRentadorParametro;
    this.pagoEnEfectivo = pagoEnEfectivoParametro;
    this.autoSeleccionado = JSON.parse(autoParametro);
    this.totalAPagar = (this.autoSeleccionado.precioDeLaRentaPorDia * this.numeroDiasDeAlquiler).toString() + " dolares";
}
//LEER
async function listarAutosRentados() {
    let arregloAutosRentados = [];
    await leerEscribirArchivos.leerArchivo("DetallesRentaAutos.txt")
        .then( // return
            async (autosRentados) => {
                autosRentados = JSON.parse(autosRentados);
                numAutoRentado = 0;
                autosRentados.forEach(
                    function (autoActual) {
                        arregloAutosRentados.push(JSON.stringify(autoActual));
                    }
                );
            }
        ).catch( // throw
            (error) => {
                console.error('Error: ', error);
            }
        );
    return (arregloAutosRentados);
}

//CREAR
async function guardarEnArchivoDatosRentaAuto(numeroDiasDeAlquilerParametro, nombreDelRentadorParametro, pagoEnEfectivoParametro, autoSeleccionado) {
    let detalleAutoRentado = new RentaAuto(numeroDiasDeAlquilerParametro, nombreDelRentadorParametro, pagoEnEfectivoParametro, autoSeleccionado)

    let listaDeAutosRentados = [];
    await leerEscribirArchivos.leerArchivo("DetallesRentaAutos.txt")
        .then( // return
            async (autosRentados) => {
                autosRentados = JSON.parse(autosRentados);
                listaDeAutosRentados = [...autosRentados];
                listaDeAutosRentados.push(detalleAutoRentado)
            }
        )

    let listaDeAutosRentadosActualizadaJson = JSON.stringify(listaDeAutosRentados, null, '\t');
    leerEscribirArchivos.guardarDatos("DetallesRentaAutos.txt", listaDeAutosRentadosActualizadaJson);
    await autosDisponibles.eliminarAuto(autoSeleccionado);
}

//ACTUALIZAR
async function actualizarPrecioAuto(numeroDiasDeAlquilerParametro, nombreDelEncargadoDelServicioParametro, nombreDelRentadorParametro, detallesAutoRentadoSeleccionado) {
    await leerEscribirArchivos.leerArchivo("DetallesRentaAutos.txt")
        .then( // return
            async (detalleRentaAuto) => {
                detalleRentaAuto = JSON.parse(detalleRentaAuto);
                await detalleRentaAuto
                    .map(
                        (valorActual) => {
                            if (valorActual.autoSeleccionado.marca === detallesAutoRentadoSeleccionado.autoSeleccionado.marca && valorActual.autoSeleccionado.modelo === detallesAutoRentadoSeleccionado.autoSeleccionado.modelo &&
                                valorActual.autoSeleccionado.numeroDePuertas === detallesAutoRentadoSeleccionado.autoSeleccionado.numeroDePuertas && valorActual.autoSeleccionado.precioDeLaRentaPorDia === detallesAutoRentadoSeleccionado.autoSeleccionado.precioDeLaRentaPorDia) {
                                if (numeroDiasDeAlquilerParametro !== 0) {
                                    valorActual.numeroDiasDeAlquiler = Number(numeroDiasDeAlquilerParametro);
                                    valorActual.totalAPagar = valorActual.autoSeleccionado.precioDeLaRentaPorDia * valorActual.numeroDiasDeAlquiler;
                                }
                                if (nombreDelEncargadoDelServicioParametro !== "") {
                                    valorActual.nombreDelEncargadoDelServicio = nombreDelEncargadoDelServicioParametro;
                                }
                                if (nombreDelRentadorParametro !== "") {
                                    valorActual.nombreDelRentador = nombreDelRentadorParametro;
                                }

                                let listaDeAutosRentadosActualizadaJson = JSON.stringify(detalleRentaAuto, null, '\t');
                                leerEscribirArchivos.guardarDatos("DetallesRentaAutos.txt", listaDeAutosRentadosActualizadaJson);
                                console.log("DATOS ACTUALIZADOS")
                                console.log(valorActual);
                            }
                        }
                    );

            }
        );
}

//ELIMINAR
async function entregarAuto(autoAEliminar) {
    await leerEscribirArchivos.leerArchivo("DetallesRentaAutos.txt")
        .then( // return
            async (detallesAutosRentados) => {
                detallesAutosRentados = JSON.parse(detallesAutosRentados);
                const indiceAutoAEliminar = await detallesAutosRentados
                    .findIndex(
                        (valorActual) => {
                            return (valorActual.autoSeleccionado.marca === autoAEliminar.autoSeleccionado.marca && valorActual.autoSeleccionado.modelo === autoAEliminar.autoSeleccionado.modelo &&
                                valorActual.autoSeleccionado.numeroDePuertas === autoAEliminar.autoSeleccionado.numeroDePuertas && valorActual.autoSeleccionado.precioDeLaRentaPorDia === autoAEliminar.autoSeleccionado.precioDeLaRentaPorDia)
                        }
                    );
                let autoEntregado = detallesAutosRentados[indiceAutoAEliminar].autoSeleccionado;
                autoEntregado.ultimaFechaServicio = fechaConFormato();
                await autosDisponibles.guardarEnArchivoDatosAutoDisponibles(autoEntregado.marca, autoEntregado.modelo, autoEntregado.numeroDePuertas, autoEntregado.precioDeLaRentaPorDia, autoEntregado.ultimaFechaServicio)
                detallesAutosRentados.splice(indiceAutoAEliminar,1)
                let listaDeAutosRentadosActualizadaJson = JSON.stringify(detallesAutosRentados, null, '\t');
                leerEscribirArchivos.guardarDatos("DetallesRentaAutos.txt", listaDeAutosRentadosActualizadaJson);
            }
        );

}

module.exports = {
    "guardarEnArchivoDatosRentaAuto": guardarEnArchivoDatosRentaAuto,
    "listarAutosRentados":listarAutosRentados,
    "entregarAuto":entregarAuto,
    "actualizarPrecioAuto":actualizarPrecioAuto
}