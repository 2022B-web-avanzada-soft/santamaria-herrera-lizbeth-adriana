const inquirer = require('inquirer');
const autoRentaFunciones = require("./renta_auto_CRUD.js")
const autosDisponibles = require("./auto_CRUD.js")

async function main() {
    try {
        console.log("Bienvenido al sistema de renta de autos")
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
                                        let arregloAutosDisponibles = await autosDisponibles.listarAutosDisponibles();
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
                                                    message: 'Ingrese el numero de puertas'
                                                },
                                                {
                                                    type: 'input',
                                                    name: 'precioDeLaRentaPorDia',
                                                    message: 'Ingrese el precio de la renta por dia'
                                                },
                                            ]);
                                        await autosDisponibles.guardarEnArchivoDatosAutoDisponibles(autoNuevo.marca, autoNuevo.modelo, autoNuevo.numeroDePuertas, autoNuevo.precioDeLaRentaPorDia, "");
                                    }
                                    else if (answersAutosDisponibles.autosDisponibles === "Actualizar precio de renta") {
                                        let arregloAutosDisponibles = await autosDisponibles.listarAutosDisponibles();
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
                                                                message: 'Ingrese el nuevo precio por dia de renta del auto'
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
                                        let arregloAutosDisponibles = await autosDisponibles.listarAutosDisponibles();
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
                                                    let autoAEliminar = JSON.parse(answerAutoEliminar.listaAutosDisponibles);
                                                    await autosDisponibles.eliminarAuto(autoAEliminar);
                                                });
                                    } else {
                                        console.log("Gracias por usar nuestro sistema");
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
                                        let arregloAutosRentados = await autoRentaFunciones.listarAutosRentados();
                                        let numAutoRentado = 1;
                                        arregloAutosRentados.forEach(
                                            (valorAutoRentadoActual) => {
                                                console.log("Auto Rentado " + numAutoRentado + ": ")
                                                console.log(valorAutoRentadoActual);
                                                numAutoRentado++
                                            });
                                    }
                                    else if (answersRentaAuto.rentaAutoOpciones === "Rentar Auto") {
                                        let arregloAutosDisponibles = await autosDisponibles.listarAutosDisponibles();
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
                                                                message: 'Ingrese el numero de dias que alquilara el auto'
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
                                    }
                                    else if (answersRentaAuto.rentaAutoOpciones === "Actualizar informacion renta") {
                                        let arregloAutosRentados = await autoRentaFunciones.listarAutosRentados();
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
                                                                message: 'Selecciona los datos que desea actualizar',
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
                                                                await autoRentaFunciones.actualizarPrecioAuto(numeroDiasDeAlquiler, nombreDelEncargadoDelServicio, nombreDelRentador, detallesAutoRentadoSeleccionado);
                                                            }
                                                        )
                                                }
                                            );
                                    }
                                    else if (answersRentaAuto.rentaAutoOpciones === "Entregar auto") {
                                        let arregloAutosRentados = await autoRentaFunciones.listarAutosRentados();
                                        await inquirer
                                            .prompt([
                                                {
                                                    type: 'list',
                                                    name: 'listaAutosRentados',
                                                    message: 'Selecciona el auto que deseas entregar',
                                                    choices: arregloAutosRentados,
                                                }
                                            ]).then(
                                                async answerAutoEliminar => {
                                                    let autoAEntregar = JSON.parse(answerAutoEliminar.listaAutosRentados);
                                                    await autoRentaFunciones.entregarAuto(autoAEntregar);
                                                });
                                    }
                                    else {
                                        console.log("Gracias por usar nuestro sistema");
                                    }
                                })

                    } else {
                        console.log("Gracias por usar nuestro sistema");
                    }
                }
            )

    } catch
        (e) {
        console.error(e);
    }
}

main();


