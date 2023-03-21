import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Typography } from '@mui/material';
import AutosRentados from "../components/AutosRentados";
import {useEffect, useState} from "react";
import {RentaInterface} from "../interfaces/rentaInterface";
import {useRouter} from "next/router";
import axios from "axios";

const theme = createTheme();
const URL = 'http://localhost:2708/renta/'

export default function ListaAutosRentados() {
    const [listaAutosRentados, setListaAutosRentados] = useState([] as RentaInterface[]);
    const router = useRouter()
    const {usuarioLoginId} = router.query;

    useEffect(
        () => {
            axios.get(URL)
                .then((response) => {
                    setListaAutosRentados(response.data)
                })
                .catch((error) => console.log("Algo Fallo" + error))
        },
        [],
    );
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Container maxWidth="lg">
                <Typography
                    component="h2"
                    variant="h5"
                    color="inherit"
                    align="center"
                    noWrap
                    sx={{flex: 1, margin: 3}}
                >
                    <strong>
                        AUTOS RENTADOS
                    </strong>
                </Typography>
                <main>
                    <Grid container spacing={4}>
                        {listaAutosRentados.map((autoRentado) => (
                            <AutosRentados key={autoRentado.id}
                                           id={autoRentado.id}
                                           numeroDiasAlquiler={autoRentado.numeroDiasAlquiler}
                                           encargadoDelServicio={autoRentado.encargadoDelServicio}
                                           nombreDelRentador={autoRentado.nombreDelRentador}
                                           fecha_inicio_renta={autoRentado.fecha_inicio_renta}
                                           metodoPago={autoRentado.metodoPago}
                                           totalPagar={autoRentado.totalPagar}
                                           autoId={autoRentado.auto.id}
                                           auto={autoRentado.auto}
                                           usuarioLoginId={`${usuarioLoginId}`}
                            />
                        ))}
                    </Grid>
                </main>
            </Container>
        </ThemeProvider>
    );
}