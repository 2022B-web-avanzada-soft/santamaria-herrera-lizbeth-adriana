import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import axios from 'axios'
import {useEffect, useState} from "react";
import {UsuarioInterface} from "../interfaces/usuarioInterface";
import {useRouter} from 'next/router'


const URL = 'http://localhost:2708/usuario/'
const theme = createTheme();

export default function SignInSide() {
    const [listaUsuario, setListaUsuario] = useState([] as UsuarioInterface[]);
    const [mostrarMensajeError, setMostrarMensajeError] = useState(false)
    const router = useRouter()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const usuarioBD = data.get('nombre_usuario').toString();
        const contrasenaBD = data.get('contrasena').toString();

        const usuarioEncontrado = listaUsuario.some(function (UsuarioDB) {
            return UsuarioDB.nombre_usuario === usuarioBD && UsuarioDB.contrasena === contrasenaBD;
        });
        const usuarioEncontradoF: UsuarioInterface[] = listaUsuario.filter(function (UsuarioDB) {
            return UsuarioDB.nombre_usuario === usuarioBD && UsuarioDB.contrasena === contrasenaBD;
        });

        if (usuarioEncontrado === true) {
            setMostrarMensajeError(false)
            console.log("Listo")
            router.push({
                pathname: 'http://localhost:3000/2_menu_principal',
                query: {
                    usuarioLoginId: usuarioEncontradoF.at(0).id
                }
            }).then().catch(
                (error) => {
                    console.log(error)
                }
            );
        } else {
            setMostrarMensajeError(!mostrarMensajeError)
        }
    };

    useEffect(
        () => {
            axios.get(URL)
                .then((response) => setListaUsuario(response.data))
                .catch((error) => console.log("Algo Fallo" + error))
        },
        [],
    );
    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{height: '100vh'}}>
                <CssBaseline/>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={6}
                    sx={{
                        backgroundImage: 'url(https://wallpaperaccess.com/full/47456.jpg)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5"><strong>
                            RENTA DE AUTOS
                        </strong>
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{m: 1, bgcolor: 'warning.dark'}}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h2" variant="h5">
                            Login
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 1}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="nombre_usuario"
                                label="Nombre del usuario"
                                name="nombre_usuario"
                                autoComplete="Usuario"
                                autoFocus
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="contrasena"
                                label="Contraseña"
                                type="password"
                                id="contrasena"
                            />

                            {mostrarMensajeError &&
                                <Typography sx={{color: 'error.main'}}>Las credenciales son incorrectas</Typography>}
                            <Button
                                type='submit'
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                Login
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}