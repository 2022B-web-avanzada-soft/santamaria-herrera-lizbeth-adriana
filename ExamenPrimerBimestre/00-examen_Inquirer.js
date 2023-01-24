const inquirer = require('inquirer');
const autoRentaFunciones = require("./04-renta_auto_CRUD.js")
const autosDisponibles = require("./03-auto_CRUD.js")
const funcionesCRUD = require("./02-funcionesCreateRead.js")

let archivoAutosDisponibles = "autosDisponibles.txt";
let archivoAutosRentados = "detallesRentaAutos.txt";

async function main() {
    try {
        console.log("********** BIENVENIDO AL SISTEMA DE RENTA DE AUTOS **********")

        await inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'OpcionesMenu',
                    message: 'Selecciona una opcion para comenzar',
                    choices: ['Autos Disponibles', 'Renta de autos', 'Salir'],
                }
            ]).then(
                async answersMenu => {
                    if (answersMenu.OpcionesMenu === "Autos Disponibles") {
                        await inquirer
                            .prompt([
                                {
                                    type: 'list',
                                    name: 'autosDisponibles',
                                    message: 'Selecciona una opcion',
                                    choices: ['Listar todos los autos disponibles', 'Añadir un Auto', 'Actualizar precio de renta', 'Eliminar Auto', 'Salir'],
                                }
                            ])
                            .then(
                                async answersAutosDisponibles => {
                                    if (answersAutosDisponibles.autosDisponibles === "Listar todos los autos disponibles") {
                                        let arregloAutosDisponibles = await funcionesCRUD.listarAutos_DetalleRenta(archivoAutosDisponibles);
                                        console.log(arregloAutosDisponibles);
                                    }
                                    else if (answersAutosDisponibles.autosDisponibles === "Añadir un Auto") {
                                        const autoNuevo = await inquirer
                                            .prompt([
                                                {
                                                    type: 'input',
                                                    name: 'marca',
                                                    message: 'Ingrese la marca del auto'
                                                },
                                                {
                                                    type: 'input',
                                                    name: 'modelo',
                                                    message: 'Ingrese el modelo del auto'
                                                },
                                                {
                                                    type: 'input',
                                                    name: 'numeroDePuertas',
                                                    message: 'Ingrese el numero de puertas',
                                                    validate:(answer) => {
                                                        if (isNaN(answer)) {
                                                            return "Debe ingresar un numero";
                                                        }
                                                        return true;
                                                    },
                                                },
                                                {
                                                    type: 'input',
                                                    name: 'precioDeLaRentaPorDia',
                                                    message: 'Ingrese el precio de la renta por dia',
                                                    validate:(answer) => {
                                                        if (isNaN(answer)) {
                                                            return "Debe ingresar un numero";
                                                        }
                                                        return true;
                                                    },
                                                },
                                            ]);
                                        await autosDisponibles.guardarEnArchivoDatosAutoDisponibles(autoNuevo.marca, autoNuevo.modelo, autoNuevo.numeroDePuertas, autoNuevo.precioDeLaRentaPorDia, "");
                                        console.log("AUTO INGRESADO EXITOSAMENTE")
                                    }
                                    else if (answersAutosDisponibles.autosDisponibles === "Actualizar precio de renta") {
                                        let arregloAutosDisponibles = await funcionesCRUD.listarAutos_DetalleRenta(archivoAutosDisponibles);
                                        await inquirer
                                            .prompt([
                                                {
                                                    type: 'list',
                                                    name: 'listaAutosDisponibles',
                                                    message: 'Selecciona el auto que desea actualizar',
                                                    choices: arregloAutosDisponibles,
                                                }
                                            ]).then(
                                                async answerVariablesActualizar => {
                                                    await inquirer
                                                        .prompt([
                                                            {
                                                                type: 'input',
                                                                name: 'precioRentaAuto',
                                                                message: 'Ingrese el nuevo precio por dia de renta del auto',
                                                                validate:(answer) => {
                                                                    if (isNaN(answer)) {
                                                                        return "Debe ingresar un numero";
                                                                    }
                                                                    return true;
                                                                },
                                                            },
                                                        ]).then(
                                                            async answerPrecio => {
                                                                let autoActualizado = JSON.parse(answerVariablesActualizar.listaAutosDisponibles);
                                                                await autosDisponibles.actualizarPrecioAuto(answerPrecio.precioRentaAuto, autoActualizado);
                                                            }
                                                        )
                                                }
                                            );
                                    }
                                    else if (answersAutosDisponibles.autosDisponibles === "Eliminar Auto") {
                                        let arregloAutosDisponibles = await funcionesCRUD.listarAutos_DetalleRenta(archivoAutosDisponibles);
                                        await inquirer
                                            .prompt([
                                                {
                                                    type: 'list',
                                                    name: 'listaAutosDisponibles',
                                                    message: 'Selecciona el auto que deseas eliminar',
                                                    choices: arregloAutosDisponibles,
                                                }
                                            ]).then(
                                                async answerAutoEliminar => {
                                                    await inquirer
                                                        .prompt([
                                                            {
                                                                type: 'list',
                                                                name: 'confirmarEliminacion',
                                                                message: 'Esta seguro que desea eliminar este auto?',
                                                                choices: ['SI','NO'],
                                                            }
                                                        ]).then(
                                                            async answerConfirmarEliminar => {
                                                                if (answerConfirmarEliminar.confirmarEliminacion === 'SI') {
                                                                    let autoAEliminar = JSON.parse(answerAutoEliminar.listaAutosDisponibles);
                                                                    await autosDisponibles.eliminarAuto(autoAEliminar)
                                                                    console.log("AUTO ELIMINADO EXITOSAMENTE")
                                                                }else{
                                                                    console.log("NO SE HA ELIMINADO LA INFORMACION DEL AUTO")
                                                                    console.log("GRACIAS POR USAR NUESTRO SISTEMA");
                                                                }
                                                            }
                                                        );
                                                });
                                    }
                                    else {
                                        console.log("GRACIAS POR USAR NUESTRO SISTEMA");
                                    }
                                }
                            );
                    }
                    else if (answersMenu.OpcionesMenu === "Renta de autos") {
                        await inquirer
                            .prompt([
                                {
                                    type: 'list',
                                    name: 'rentaAutoOpciones',
                                    message: 'Selecciona una opcion',
                                    choices: ['Listar autos rentados', 'Rentar Auto', 'Actualizar informacion renta', 'Entregar auto', 'Salir'],
                                }
                            ])
                            .then(
                                async answersRentaAuto => {
                                    if (answersRentaAuto.rentaAutoOpciones === "Listar autos rentados") {
                                        let arregloAutosRentados = await funcionesCRUD.listarAutos_DetalleRenta(archivoAutosRentados);
                                        let numAutoRentado = 1;
                                        arregloAutosRentados.forEach(
                                            (valorAutoRentadoActual) => {
                                                console.log("Auto Rentado " + numAutoRentado + ": ")
                                                console.log(valorAutoRentadoActual);
                                                numAutoRentado++
                                            });
                                    }
                                    else if (answersRentaAuto.rentaAutoOpciones === "Rentar Auto") {
                                        let arregloAutosDisponibles = await funcionesCRUD.listarAutos_DetalleRenta(archivoAutosDisponibles);
                                        await inquirer
                                            .prompt([
                                                {
                                                    type: 'list',
                                                    name: 'autosDisponibles',
                                                    message: 'Selecciona el auto que desees rentar',
                                                    choices: arregloAutosDisponibles,
                                                }
                                            ])
                                            .then(
                                                async answers => {
                                                    const detalleRenta = await inquirer
                                                        .prompt([
                                                            {
                                                                type: 'input',
                                                                name: 'numeroDiasDeAlquiler',
                                                                message: 'Ingrese el numero de dias que alquilara el auto',
                                                                validate:(answer) => {
                                                                    if (isNaN(answer)) {
                                                                        return "Debe ingresar un numero";
                                                                    }
                                                                    return true;
                                                                },
                                                            },
                                                            {
                                                                type: 'input',
                                                                name: 'nombreDelRentador',
                                                                message: 'Ingrese sus nombres completos'
                                                            },
                                                            {
                                                                type: 'list',
                                                                name: 'pagoEnEfectivo',
                                                                message: 'Realizara el pago en efectivo?',
                                                                choices: ['SI', 'NO'],
                                                            }
                                                        ]);
                                                    autoRentaFunciones.guardarEnArchivoDatosRentaAuto(detalleRenta.numeroDiasDeAlquiler,
                                                        detalleRenta.nombreDelRentador, detalleRenta.pagoEnEfectivo, answers.autosDisponibles);
                                                }
                                            );
                                        console.log("SE HAN INGRESADO LOS DATOS CORRECTAMENTE")
                                    }
                                    else if (answersRentaAuto.rentaAutoOpciones === "Actualizar informacion renta") {
                                        let arregloAutosRentados = await funcionesCRUD.listarAutos_DetalleRenta(archivoAutosRentados);
                                        await inquirer
                                            .prompt([
                                                {
                                                    type: 'list',
                                                    name: 'listaAutosRentados',
                                                    message: 'Selecciona el auto que desea actualizar',
                                                    choices: arregloAutosRentados,
                                                }
                                            ]).then(
                                                async answerAutoRentadoSeleccionado => {
                                                    await inquirer
                                                        .prompt([
                                                            {
                                                                type: 'checkbox',
                                                                name: 'listaVarialesAActualizar',
                                                                message: 'Para selecciona los datos que desea actualizar presione la tecla ESPACIO',
                                                                choices: ["Numero de dias de alquiler", "Nombre del encargado del servicio", "Nombre del rentador"],
                                                            },
                                                        ]).then(
                                                            async answerActualizarVariables => {
                                                                let numeroDiasDeAlquiler = 0;
                                                                let nombreDelEncargadoDelServicio = "";
                                                                let nombreDelRentador = "";
                                                                let detallesAutoRentadoSeleccionado = JSON.parse(answerAutoRentadoSeleccionado.listaAutosRentados);

                                                                for (const valorActual of answerActualizarVariables.listaVarialesAActualizar) {
                                                                    await inquirer
                                                                        .prompt([
                                                                            {
                                                                                type: 'input',
                                                                                name: "InputValores",
                                                                                message: 'Ingresa: ' + valorActual,
                                                                            }
                                                                        ]).then(
                                                                            answerInputValores => {
                                                                                if (valorActual === "Numero de dias de alquiler") {
                                                                                    numeroDiasDeAlquiler = answerInputValores.InputValores;
                                                                                } else if (valorActual === "Nombre del encargado del servicio") {
                                                                                    nombreDelEncargadoDelServicio = answerInputValores.InputValores;
                                                                                } else if (valorActual === "Nombre del rentador") {
                                                                                    nombreDelRentador = answerInputValores.InputValores;
                                                                                }
                                                                            }
                                                                        )
                                                                }
                                                                await autoRentaFunciones.actualizarDetallesRentaAuto(numeroDiasDeAlquiler, nombreDelEncargadoDelServicio, nombreDelRentador, detallesAutoRentadoSeleccionado);
                                                            }
                                                        )
                                                }
                                            );
                                        console.log("DATOS ACTUALIZADOS CORRECTAMENTE")
                                    }
                                    else if (answersRentaAuto.rentaAutoOpciones === "Entregar auto") {
                                        let arregloAutosRentados = await funcionesCRUD.listarAutos_DetalleRenta(archivoAutosRentados);
                                        await inquirer
                                            .prompt([
                                                {
                                                    type: 'list',
                                                    name: 'listaAutosRentados',
                                                    message: 'Selecciona el detalle de la renta con el auto que deseas entregar',
                                                    choices: arregloAutosRentados,
                                                }
                                            ]).then(
                                                async answerDetalleRentaAEliminar => {
                                                    let detalleAutoAEntregar = JSON.parse(answerDetalleRentaAEliminar.listaAutosRentados);
                                                    await autoRentaFunciones.entregarAuto(detalleAutoAEntregar);
                                                });
                                        console.log("AUTO ENTREGADO")
                                    }
                                    else {
                                        console.log("GRACIAS POR USAR NUESTRO SISTEMA");;
                                    }
                                })

                    }
                    else {
                        console.log("GRACIAS POR USAR NUESTRO SISTEMA");
                    }
                }
            )

    } catch
        (e) {
        console.error(e);
    }
}

main();


