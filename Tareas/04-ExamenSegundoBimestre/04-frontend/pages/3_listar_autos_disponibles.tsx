import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import AutosDisponiblesFormato from "../components/AutosDisponiblesFormato";
import {Box, Button, Typography} from '@mui/material';
import {useEffect, useState} from "react";
import {AutoInterface} from '../interfaces/autoInterface';
import {useRouter} from "next/router";
import axios from "axios";
import {RentaInterface} from "../interfaces/rentaInterface";

const theme = createTheme();
const URL = 'http://localhost:2708/auto/'
const URLRenta = 'http://localhost:2708/renta/'

export default function ListarAutosDisponibles() {
    const [listaAutosDisponibles, setListaAutosDisponibles] = useState([] as AutoInterface[]);
    const [listaRentaAutos, setlistaRentaAutos] = useState([] as RentaInterface[]);
    const router = useRouter()
    const {usuarioLoginId, usuarioIdRenta, autoId} = router.query;

    useEffect(
        () => {
            axios.get(URL)
                .then((response) => {
                    response.data = response.data.filter((valorActual) => {
                      return valorActual.esta_rentado === false;
                    });
                    setListaAutosDisponibles(response.data)
                })
                .catch((error) => console.log("Algo Fallo" + error))
        },
        [],
    );

    useEffect(
        () => {
            axios.get(URLRenta)
                .then((response) => setlistaRentaAutos(response.data))
                .catch((error) => console.log("Algo Fallo" + error))
        },
        [],
    );

    if (usuarioIdRenta != undefined && listaRentaAutos.length > 0) {
        // Usuario y auto relacionados a la renta
        const asignarAutoUsuario = {
            usuario: parseInt(`${usuarioIdRenta}`),
            auto: parseInt(`${autoId}`)
        }
        const cambiarEstadoAuto = {
            esta_rentado: true
        }
        const rentaEncontrada: RentaInterface = listaRentaAutos.at(listaRentaAutos.length - 1)
        axios.put(`${URL}${autoId}`, cambiarEstadoAuto).then().catch(e => {
            console.log(e)
        })
        axios.put(`${URLRenta}${rentaEncontrada.id}`, asignarAutoUsuario).then().catch(e => {
            console.log(e)
        })

    }


    const handleCrearAuto = () => {
        router.push({
            pathname: 'http://localhost:3000/2_administrador/2_crear_auto',
        }).then().catch(
            (error) => {
                console.log(error)
            }
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-end"
                margin={4}
            >
                <Button variant="contained" color="success" sx={{height: 40}} onClick={handleCrearAuto}>
                    AÑADIR AUTO
                </Button>
            </Box>
            <Container maxWidth="lg">
                <Typography
                    component="h2"
                    variant="h5"
                    color="inherit"
                    align="center"
                    noWrap
                    sx={{flex: 1, margin: 4}}
                >
                    <strong>
                        AUTOS DISPONIBLES
                    </strong>
                </Typography>
                <main>
                    <Grid container spacing={4}>
                        {listaAutosDisponibles.map((auto, indice, arregloCompleto) =>
                            <AutosDisponiblesFormato key={auto.id}
                                                     id={auto.id}
                                                     auto_marca={auto.auto_marca}
                                                     auto_modelo={auto.auto_modelo}
                                                     auto_num_puertas={auto.auto_num_puertas}
                                                     auto_ultima_fecha_servicio={auto.auto_ultima_fecha_servicio}
                                                     auto_precio_dia={auto.auto_precio_dia}
                                                     esta_rentado={auto.esta_rentado}
                                                     auto_imagen={auto.auto_imagen}
                                                     usuarioLoginId={`${usuarioLoginId}`}
                            />
                        )}
                    </Grid>
                </main>
            </Container>
        </ThemeProvider>
    );
}