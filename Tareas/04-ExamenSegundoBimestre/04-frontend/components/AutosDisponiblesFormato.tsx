import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {AutoInterface} from "../interfaces/autoInterface";
import {useRouter} from "next/router";
import axios from "axios";

const URLAuto = 'http://localhost:2708/auto'

export default function AutosDisponiblesFormato(autoProps: AutoInterface) {
    const router = useRouter()
    const titulo = autoProps.auto_marca+"-"+autoProps.auto_modelo;
    const descripcion=autoProps.auto_num_puertas+' puertas\nUltima fecha de servicio:'+autoProps.auto_ultima_fecha_servicio;
    const [abrirConfirmacionCancelar, setAbrirConfirmacionCancelar] = React.useState(false);

    const handleRentarAuto = () => {
        router.push({
            pathname: 'http://localhost:3000/1_usuario/2_rentar_auto',
            query:{
                autoId: autoProps.id,
                usuarioLoginId:autoProps.usuarioLoginId
            }
        }).then().catch(
            (error) => {
                console.log(error)
            }
        );
    }
    const handleActualizarAuto = () => {
        router.push({
            pathname: 'http://localhost:3000/2_administrador/3_actualizar_auto',
            query:{
                autoId: autoProps.id,
                usuarioLoginId:autoProps.usuarioLoginId
            }
        }).then().catch(
            (error) => {
                console.log(error)
            }
        );
    }
    const handleClickOpen = () => {
        setAbrirConfirmacionCancelar(true);
    };

    const handleClose = () => {
        setAbrirConfirmacionCancelar(false);
    };

    const handleEliminar = () => {
        setAbrirConfirmacionCancelar(false);
        axios.delete(`${URLAuto}/${autoProps.id}`).then(() => {
        }).catch(e => {
            console.log(e)
        })
    };

    return (
        <Grid item xs={12} md={6}>
            <Card sx={{display: 'flex'}}>
                <CardMedia
                    component="img"
                    sx={{width: 160, height: 200, display: {xs: 'none', sm: 'block'}}}
                    image={autoProps.auto_imagen}
                    alt={titulo}
                />
                <CardContent sx={{flex: 1}}>
                    <Typography component="h2" variant="h5">
                        {titulo}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        {'$'+autoProps.auto_precio_dia+' x Dia'}
                    </Typography>
                    {descripcion.split('\n').map(str => <Typography variant="subtitle1" paragraph
                                                                         sx={{margin: 0}}>{str}</Typography>)}
                    <Box
                        display="flex"
                        justifyContent="flex-end"
                        alignItems="flex-end"
                    >
                        <Button variant="contained" color="primary" sx={{height: 40}} onClick={handleRentarAuto}>
                            RENTAR
                        </Button>
                    </Box>
                    <Box
                        display="flex"
                        justifyContent="flex-end"
                        alignItems="flex-end"
                    >
                        <Button variant="contained" color="primary" sx={{height: 40}} onClick={handleActualizarAuto}>
                            ACTUALIZAR
                        </Button>
                        <Button variant="contained" color="error" sx={{height: 40, marginLeft:4, marginTop:2}} onClick={handleClickOpen}>
                            ELIMINAR
                        </Button>
                        <Dialog
                            open={abrirConfirmacionCancelar}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                                {"CONFIRMACION ELIMINACION"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Esta seguro que desea eliminar este auto?.
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>No</Button>
                                <Button onClick={handleEliminar} autoFocus>
                                    Si
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    );
}