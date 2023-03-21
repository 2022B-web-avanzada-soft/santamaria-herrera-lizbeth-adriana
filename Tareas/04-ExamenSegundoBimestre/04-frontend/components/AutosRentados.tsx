import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {useRouter} from "next/router";
import axios from "axios";
import {RentaInterface} from "../interfaces/rentaInterface";

const URLAutoRentado = 'http://localhost:2708/auto'

export default function AutosRentados(autoProps: RentaInterface) {
    const router = useRouter()
    const titulo = autoProps.auto.auto_marca+"-"+autoProps.auto.auto_modelo;
    const descripcion=autoProps.numeroDiasAlquiler+' dias de renta - $'+autoProps.auto.auto_precio_dia+' x Dia\nTotal A Pagar: '+autoProps.totalPagar;

    const handleDetalles = () => {
        router.push({
            pathname: 'http://localhost:3000/1_usuario/3_detalles_auto_rentado',
            query:{
                autoRentadoId: autoProps.id
            }
        }).then().catch(
            (error) => {
                console.log(error)
            }
        );
    }


    return (
        <Grid item xs={12} md={6}>
            <Card sx={{display: 'flex'}}>
                <CardMedia
                    component="img"
                    sx={{width: 160, height: 200, display: {xs: 'none', sm: 'block'}}}
                    image={autoProps.auto.auto_imagen}
                    alt={titulo}
                />
                <CardContent sx={{flex: 1}}>
                    <Typography component="h2" variant="h5">
                        {titulo}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        {'Fecha_inicio_renta: '+ autoProps.fecha_inicio_renta}
                    </Typography>
                    {descripcion.split('\n').map(str => <Typography variant="subtitle1" paragraph
                                                                    sx={{margin: 0}}>{str}</Typography>)}
                    <Box
                        display="flex"
                        justifyContent="flex-end"
                        alignItems="flex-end"
                    >
                        <Button variant="contained" color="primary" sx={{height: 40}} onClick={handleDetalles}>
                            VER DETALLES
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    );
}