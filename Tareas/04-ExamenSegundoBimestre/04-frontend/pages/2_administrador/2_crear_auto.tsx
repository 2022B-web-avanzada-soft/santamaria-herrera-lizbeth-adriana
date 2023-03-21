import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import axios from "axios";
import {AutoInterface} from "../../interfaces/autoInterface";
import {useRouter} from "next/router";

const theme = createTheme();
const URL = 'http://localhost:2708/auto/'

export default function CrearAuto() {
    const router = useRouter()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const autoNuevo: AutoInterface = {
            auto_marca: data.get('marca').toString(),
            auto_modelo: data.get('modelo').toString(),
            auto_num_puertas: parseInt(data.get('numeroDePuertas').toString()),
            auto_ultima_fecha_servicio: '',
            auto_precio_dia: parseFloat(data.get('precioDeLaRentaPorDia').toString()),
            esta_rentado: false,
            auto_imagen: data.get('enlaceImagenAuto').toString()
        }
        axios.post(URL, autoNuevo).then(() => {
            router.push({
                pathname: 'http://localhost:3000/3_listar_autos_disponibles'
            }).then().catch(
                (error) => {
                    console.log(error)
                }
            );
        }).catch(e => {
            console.log(e)
        })
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="md">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        <strong>Añadir Auto</strong>
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="marca"
                                    label="Marca"
                                    name="marca"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="modelo"
                                    required
                                    fullWidth
                                    id="modelo"
                                    label="Modelo"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="numeroDePuertas"
                                    label="Numero de puertas"
                                    name="numeroDePuertas"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="precioDeLaRentaPorDia"
                                    label="Precio de la renta por dia"
                                    name="precioDeLaRentaPorDia"
                                />
                            </Grid>
                            <Grid item xs={12} sm={16}>
                                <TextField
                                    required
                                    fullWidth
                                    id="enlaceImagenAuto"
                                    label="Enlace de la imagen del auto"
                                    name="enlaceImagenAuto"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            GUARDAR
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}