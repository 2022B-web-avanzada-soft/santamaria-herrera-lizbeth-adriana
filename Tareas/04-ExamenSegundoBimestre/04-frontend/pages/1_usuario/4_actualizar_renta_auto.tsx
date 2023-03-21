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

const theme = createTheme();
const featuredPosts = [
    {
        title: 'KIA - Picanto',
        date: '$40 x Dia',
        description:
            '4 puertas\nUltima fecha de servicio: 14/06/20',
        image: 'https://source.unsplash.com/random',
        imageLabel: 'Image Text',
    },
]

export default function SignUp() {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    const [metodoPago, setMetodoPago] = React.useState('');

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
                        <strong>Actualizar Renta</strong>
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                        <Grid container spacing={4} sx={{marginBottom: 4}}>
                            {featuredPosts.map((post) => (
                                <Grid item xs={12} md={6} sx={{align: 'center'}}>
                                    <Card sx={{display: 'flex'}}>
                                        <CardMedia
                                            component="img"
                                            sx={{width: 160, height: 200, display: {xs: 'none', sm: 'block'}}}
                                            image={post.image}
                                            alt={post.imageLabel}
                                        />
                                        <CardContent sx={{flex: 1}}>
                                            <Typography component="h2" variant="h5">
                                                {post.title}
                                            </Typography>
                                            <Typography variant="subtitle1" color="text.secondary">
                                                {post.date}
                                            </Typography>
                                            {post.description.split('\n').map(str => <Typography variant="subtitle1"
                                                                                                 paragraph
                                                                                                 sx={{margin: 0}}>{str}</Typography>)}
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                            <Grid item xs={12} md={6} sx={{align: 'center', verticalAlign: 'center'}}>
                                <Typography sx={{ my:1}}>Total a pagar</Typography>
                                <Box sx={{
                                    border: 2,
                                    borderColor: 'grey.400',
                                    borderRadius: '5px',
                                    height: 55,
                                    paddingLeft: 3,
                                    bgcolor:'#e0e0e0'
                                }}>
                                    <Typography sx={{marginTop: 2}}><strong>350</strong></Typography>
                                </Box>
                                <TextField
                                    required
                                    fullWidth
                                    id="numeroDias"
                                    label="Numero de dias de renta"
                                    name="numeroDias"
                                    sx={{marginTop: 4}}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="nombre_usuario"
                                    required
                                    fullWidth
                                    id="nombre_usuario"
                                    label="Nombre usuario"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{marginTop:2.9}}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker disabled={true} label={'Fecha de inicio de la rentaAuto'} sx={{width: '100%'}}/>
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
                                    sx={{width:'100%'}}
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