const leerEscribirArchivos = require("./01-leerEscribirArchivos.js")
const autosDisponibles = require("./03-auto_CRUD.js")
const funcionesCRUD = require("./02-funcionesCreateRead.js")
let _ = require('underscore');

let archivoAutosRentados = "detallesRentaAutos.txt";
const nombreDelEncargadoDelServicioPorDefect = "Lizbeth Santamaria";
const unidadMonetaria = " dolares";

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
    this.nombreDelEncargadoDelServicio = nombreDelEncargadoDelServicioPorDefect;
    this.nombreDelRentador = nombreDelRentadorParametro;
    this.pagoEnEfectivo = pagoEnEfectivoParametro;
    this.autoSeleccionado = JSON.parse(autoParametro);
    this.totalAPagar = (this.autoSeleccionado.precioDeLaRentaPorDia * this.numeroDiasDeAlquiler).toString() + unidadMonetaria;
}

//CREAR
async function guardarEnArchivoDatosRentaAuto(numeroDiasDeAlquilerParametro, nombreDelRentadorParametro, pagoEnEfectivoParametro, autoSeleccionado) {
    let detalleAutoRentado = new RentaAuto(numeroDiasDeAlquilerParametro, nombreDelRentadorParametro, pagoEnEfectivoParametro, autoSeleccionado);
    await funcionesCRUD.crearAutos_DetalleRenta(archivoAutosRentados,detalleAutoRentado);

    await autosDisponibles.eliminarAuto(autoSeleccionado);
}

//ACTUALIZAR
async function actualizarDetallesRentaAuto(numeroDiasDeAlquilerParametro, nombreDelEncargadoDelServicioParametro, nombreDelRentadorParametro, detallesAutoRentadoSeleccionado) {
    await leerEscribirArchivos.leerArchivo(archivoAutosRentados)
        .then( // return
            async (detalleRentaAuto) => {
                detalleRentaAuto = JSON.parse(detalleRentaAuto);
                await detalleRentaAuto
                    .map(
                        (valorActual) => {
                            if (_.isEqual(valorActual.autoSeleccionado, detallesAutoRentadoSeleccionado.autoSeleccionado)) {
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
                                leerEscribirArchivos.guardarDatos(archivoAutosRentados, listaDeAutosRentadosActualizadaJson);
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
async function entregarAuto(detalleAutoAEntregar) {
    await leerEscribirArchivos.leerArchivo(archivoAutosRentados)
        .then( // return
            async (detallesAutosRentados) => {
                detallesAutosRentados = JSON.parse(detallesAutosRentados);
                const indiceAutoAEliminar = await detallesAutosRentados
                    .findIndex(
                        (valorActual) => {
                            return (_.isEqual(valorActual.autoSeleccionado, detalleAutoAEntregar.autoSeleccionado));
                        }
                    );

                let autoEntregado = detallesAutosRentados[indiceAutoAEliminar].autoSeleccionado;
                autoEntregado.ultimaFechaServicio = fechaConFormato();
                await autosDisponibles.guardarEnArchivoDatosAutoDisponibles(autoEntregado.marca, autoEntregado.modelo, autoEntregado.numeroDePuertas, autoEntregado.precioDeLaRentaPorDia, autoEntregado.ultimaFechaServicio)

                detallesAutosRentados.splice(indiceAutoAEliminar,1)
                let listaDeAutosRentadosActualizadaJson = JSON.stringify(detallesAutosRentados, null, '\t');
                leerEscribirArchivos.guardarDatos(archivoAutosRentados, listaDeAutosRentadosActualizadaJson);
            }
        ).catch( // throw
            (error) => {
                console.error('Error: ', error);
            }
        );

}

module.exports = {
    "guardarEnArchivoDatosRentaAuto": guardarEnArchivoDatosRentaAuto,
    "entregarAuto":entregarAuto,
    "actualizarDetallesRentaAuto":actualizarDetallesRentaAuto
}