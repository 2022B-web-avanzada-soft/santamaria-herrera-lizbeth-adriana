import * as React from 'react';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {createTheme, styled, ThemeProvider} from '@mui/material/styles';
import CardMedia from "@mui/material/CardMedia";
import {Button, List, ListItem, ListItemAvatar, ListItemText} from "@mui/material";

const theme = createTheme();

const images = [
    {
        url: 'https://img.remediosdigitales.com/85e147/nombres-de-autos-traducidos/1366_2000.jpg',
        title: 'AUTOS DISPONIBLES',
        width: '40%',
    },
    {
        url: 'https://media.kasperskydaily.com/wp-content/uploads/sites/87/2015/05/05201736/rentacar-featured.jpg',
        title: 'AUTOS RENTADOS',
        width: '30%',
    }
];

const ImageButton = styled(ButtonBase)(({theme}) => ({
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('sm')]: {
        width: '100% !important', // Overrides inline-style
        height: 100,
    },
    '&:hover, &.Mui-focusVisible': {
        zIndex: 1,
        '& .MuiImageBackdrop-root': {
            opacity: 0.15,
        },
        '& .MuiImageMarked-root': {
            opacity: 0,
        },
        '& .MuiTypography-root': {
            border: '4px solid currentColor',
        },
    },
}));
const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
});

const Image = styled('span')(({theme}) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({theme}) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({theme}) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
}));

const backgroundImage = 'https://static5.depositphotos.com/1014528/531/v/450/depositphotos_5313114-stock-illustration-abstract-gold-background.jpg';

function getGridBackground() {
    return <Grid
        item
        xs={false}
        sm={4}
        md={3}
        sx={{
            backgroundImage: 'url(' + backgroundImage + ')',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}
    />;
}

export default function SignInSide() {
    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{height: '100vh'}}>
                <CssBaseline/>
                {getGridBackground()}
                <Grid container item xs={12} sm={8} md={6} component={Paper} square>
                    <Grid item xs={12} sm={8} md={12} component={Paper} square>

                        <Box
                            display="flex"
                            justifyContent="flex-end"
                            alignItems="flex-end"
                            marginTop={4}
                            marginRight={4}

                        >
                            <Button variant="contained" color="primary" sx={{height: 40}}>
                                DEVOLVER AUTO
                            </Button>
                        </Box>
                        <Box
                            sx={{
                                my: 4,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}
                        >
                            <Typography component="h1" variant="h5"><strong>
                                Chevrolet - Aveo
                            </strong>
                            </Typography>
                            <CardMedia
                                component="img"
                                sx={{width: 335, height: 200, display: {xs: 'none', sm: 'block'}, marginTop: 3}}
                                image={'https://www.chevrolet.com.ec/content/dam/chevrolet/south-america/ecuador/espanol/index/pickups-and-trucks/2020-dmax-premier/home/05-images/dmax-premier-ajustes/2022-poder-d-max-premier-03.jpg?imwidth=960'}
                                alt={'Image Text'}
                            />
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={8} md={6} component={Paper} square>
                        <Box sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            width: '100%',
                            justifyContent: 'left',
                            marginLeft: 10
                        }}>
                            <List>
                                <Typography><strong>DATOS DEL AUTO</strong></Typography>
                                <ListItem>
                                    <ListItemText primary="Marca:" secondary="Chevrolet"/>
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Modelo:" secondary="Aveo"/>
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Numero de puertas:" secondary="4"/>
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Ultima fecha de servicio:" secondary="14/06/2020"/>
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Precio de la renta por dia:" secondary="45"/>
                                </ListItem>
                            </List>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={8} md={6} component={Paper} square>
                        <Box sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            width: '100%',
                            justifyContent: 'left',
                            marginLeft: 10
                        }}>
                            <List>
                                <Typography><strong>DATOS DE LA RENTA</strong></Typography>
                                <ListItem>
                                    <ListItemText primary="Numero de dias de alquiler:" secondary="10"/>
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Fecha inicial de la renta:" secondary="18/20/23"/>
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Encargado del servicio:" secondary="Lizbeth Santamaria"/>
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Nombre del rentador:" secondary="Joselyn Santamaria"/>
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Metodo de pago:" secondary="Efectivo"/>
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Total a pagar:" secondary="450"/>
                                </ListItem>
                            </List>
                        </Box>
                    </Grid>
                </Grid>
                {getGridBackground()}
            </Grid>
        </ThemeProvider>
    );
}