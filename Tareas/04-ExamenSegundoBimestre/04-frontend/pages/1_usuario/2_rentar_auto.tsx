import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import {InputLabel, MenuItem, Select, SelectChangeEvent} from '@mui/material';
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";
import {AutoInterface} from "../../interfaces/autoInterface";
import moment from "moment";
import {RentaInterface} from "../../interfaces/rentaInterface";
import {UsuarioInterface} from "../../interfaces/usuarioInterface";

const theme = createTheme();
const URLAuto = 'http://localhost:2708/auto'
const URLRenta = 'http://localhost:2708/renta'
const URLUsuario= 'http://localhost:2708/usuario'
let nombreUsuario:string;

export default function RentarAuto() {
    const router = useRouter()
    const {autoId, usuarioLoginId} = router.query;
    const [usuario, setUsuario] = useState([] as UsuarioInterface[]);
    const [autoARentar, setAutoARentar] = useState([] as AutoInterface[]);
    const [renta, setRenta] = useState([] as RentaInterface[]);
    const [rentaNueva, setrentaNueva] = useState([] as RentaInterface[]);
    const [metodoPago, setMetodoPago] = React.useState('');
    const [fecha, setFecha] = React.useState('');
    const modifiedValue = moment(moment(fecha, "DD-MM-YYYY"), "MM-DD-YYYY");
    const _ = require('lodash');

    useEffect(
        () => {
            axios.get(`${URLAuto}/${autoId}`)
                .then((response) => setAutoARentar([response.data]))
                .catch((error) => console.log("Algo Fallo" + error))

            axios.get(`${URLUsuario}/${usuarioLoginId}`)
                .then((response) => setUsuario([response.data]))
                .catch((error) => console.log("Algo Fallo" + error))
        },
        [],
    );

    if(usuario.length > 0){
        nombreUsuario = usuario.at(0).nombre_usuario
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        //Crear Renta
        const rentaNueva: RentaInterface = {
            numeroDiasAlquiler: parseInt(data.get('numeroDias').toString()),
            encargadoDelServicio: 'Lizbeth Santamaria',
            nombreDelRentador: nombreUsuario,
            fecha_inicio_renta: fecha,
            metodoPago: fecha,
            totalPagar: parseInt(data.get('numeroDias').toString()) * autoARentar.at(0).auto_precio_dia,
        }
        setrentaNueva([rentaNueva])

        //Creo la nueva renta
        await axios.post(URLRenta, rentaNueva).then(() => {
            router.push({
                pathname: 'http://localhost:3000/3_listar_autos_disponibles',
                query:{
                    usuarioIdRenta:usuarioLoginId,
                    autoId: autoId
                }
            }).then().catch(
                (error) => {
                    console.log(error)
                }
            );
        }).catch(e => {
            console.log(e)
        });
    };

    const handleChange = (event: SelectChangeEvent) => {
        setMetodoPago(event.target.value as string);
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
                        <strong>Formulario Renta</strong>
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                        <Grid container spacing={4} sx={{marginBottom: 4}}>
                            {autoARentar.map((auto, indice, arregloCompleto) => (
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
                            <Grid item xs={12} md={6} sx={{align: 'center', verticalAlign: 'center'}}>
                                <Box sx={{
                                    border: 2,
                                    borderColor: 'grey.400',
                                    borderRadius: '5px',
                                    height: 55,
                                    paddingLeft: 2,
                                    bgcolor: '#e0e0e0',
                                }}>
                                    <Typography sx={{marginTop: 2}}><strong>Total a pagar:</strong></Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={6} sx={{align: 'center', verticalAlign: 'center'}}>
                                <TextField
                                    required
                                    fullWidth
                                    id="numeroDias"
                                    label="Numero de dias de renta"
                                    name="numeroDias"
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} sx={{align: 'center', verticalAlign: 'center'}}>
                                <Box sx={{
                                    border: 2,
                                    borderColor: 'grey.400',
                                    borderRadius: '5px',
                                    height: 55,
                                    paddingLeft: 2
                                }}>
                                    <Typography sx={{marginTop: 2}}>Nombre del rentador: {nombreUsuario}</Typography>
                                </Box>
                            </Grid>

                            <Grid item xs={12} sm={6} sx={{marginTop: 2.9}}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label={'Fecha de inicio de la rentaAuto'}
                                        sx={{width: '100%'}}
                                        value={modifiedValue}
                                        onChange={(nuevaFecha) => {
                                            setFecha(nuevaFecha.format("DD-MM-YYYY"))
                                        }}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputLabel id="demo-simple-select-filled-label">Metodo de pago</InputLabel>
                                <Select
                                    labelId="demo-simple-select-filled-label"
                                    id="metodoPago"
                                    value={metodoPago}
                                    label="Metodo de pago"
                                    onChange={handleChange}
                                    sx={{width: '100%'}}
                                >
                                    <MenuItem value={1}>Efectivo</MenuItem>
                                    <MenuItem value={2}>Tarjeta</MenuItem>
                                </Select>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            FINALIZAR RENTA
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}