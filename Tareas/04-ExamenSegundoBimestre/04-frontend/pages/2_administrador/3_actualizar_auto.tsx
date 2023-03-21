import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import {AutoInterface} from "../../interfaces/autoInterface";

const theme = createTheme();
const URLAuto = 'http://localhost:2708/auto'
let auto_marcaT:string;
let auto_modeloT:string;
let auto_num_puertasT:number;
let auto_precio_diaT:number;
let auto_imagenT:string;

export default function ActualizarAuto() {
    const router = useRouter()
    const {autoId, usuarioLoginId} = router.query;
    const [autoActualizar, setAutoActualizar] = useState([] as AutoInterface[]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const nuevoAuto: AutoInterface = {
            auto_marca: data.get('marca').toString(),
            auto_modelo: data.get('modelo').toString(),
            auto_num_puertas: parseInt(data.get('numeroDePuertas').toString()),
            auto_precio_dia: parseFloat(data.get('precioDeLaRentaPorDia').toString()),
            auto_imagen: data.get('enlaceImagenAuto').toString()
        }
        axios.put(`${URLAuto}/${autoId}`, nuevoAuto).then(() => {
            router.push({
                pathname: 'http://localhost:3000/3_listar_autos_disponibles',
                query:{
                    usuarioLoginId:usuarioLoginId
                }
            }).then().catch(
                (error) => {
                    console.log(error)
                }
            );
        }).catch(e => {
            console.log(e)
        })
    };

    useEffect(
        () => {
            axios.get(`${URLAuto}/${autoId}`)
                .then((response) => setAutoActualizar([response.data]))
                .catch((error) => console.log("Algo Fallo" + error))
        },
        [],
    );

    if(autoActualizar.length > 0){
        auto_marcaT = autoActualizar.at(0).auto_marca;
        auto_modeloT= autoActualizar.at(0).auto_modelo;
        auto_num_puertasT =autoActualizar.at(0).auto_num_puertas;
        auto_precio_diaT=autoActualizar.at(0).auto_precio_dia;
        auto_imagenT=autoActualizar.at(0).auto_imagen;
    };

    const handleCancelar = () =>{
        router.push({
            pathname: 'http://localhost:3000/3_listar_autos_disponibles',
            query:{
                usuarioLoginId:usuarioLoginId
            }
        }).then().catch(
            (error) => {
                console.log(error)
            }
        );
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
                        <strong>Actualizar datos auto</strong>
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            {autoActualizar.map((auto, indice, arregloCompleto) => (
                                <Grid item xs={12} md={12} sx={{align: 'center'}}>
                                    <Card sx={{display: 'flex'}}>
                                        <CardMedia
                                            component="img"
                                            sx={{width: 160, height: 156, display: {xs: 'none', sm: 'block'}}}
                                            image={auto.auto_imagen}
                                            alt={auto.auto_marca + "-" + auto.auto_modelo}
                                        />
                                        <CardContent sx={{flex: 1}}>
                                            <Typography component="h2" variant="h5">
                                                {auto.auto_marca + "-" + auto.auto_modelo}
                                            </Typography>
                                            <Typography variant="subtitle1" color="text.secondary">
                                                {'$' + auto.auto_precio_dia + ' x Dia'}
                                            </Typography>
                                            {(auto.auto_num_puertas + ' puertas\nUltima fecha de servicio:' + auto.auto_ultima_fecha_servicio).split('\n').map(str =>
                                                <Typography variant="subtitle1"
                                                            paragraph
                                                            sx={{margin: 0}}>{str}</Typography>)}
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="marca"
                                    label="Marca"
                                    name="marca"
                                    defaultValue={auto_marcaT}
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
                                    defaultValue={auto_modeloT}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="numeroDePuertas"
                                    label="Numero de puertas"
                                    name="numeroDePuertas"
                                    defaultValue={auto_num_puertasT}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="precioDeLaRentaPorDia"
                                    label="Precio de la renta por dia"
                                    name="precioDeLaRentaPorDia"
                                    defaultValue={auto_precio_diaT}
                                />
                            </Grid>
                            <Grid item xs={12} sm={16}>
                                <TextField
                                    required
                                    fullWidth
                                    id="enlaceImagenAuto"
                                    label="Enlace de la imagen del auto"
                                    name="enlaceImagenAuto"
                                    defaultValue={auto_imagenT}
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
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{mt: 2, mb: 2}}
                        color={'error'}
                        onClick={handleCancelar}
                    >
                        CANCELAR
                    </Button>
                </Box>
            </Container>
        </ThemeProvider>
    );
}