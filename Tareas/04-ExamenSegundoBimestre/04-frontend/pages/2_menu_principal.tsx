import * as React from 'react';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {createTheme, styled, ThemeProvider} from '@mui/material/styles';
import {useRouter} from "next/router";


const theme = createTheme();

const images = [
    {
        url: 'https://img.remediosdigitales.com/85e147/nombres-de-autos-traducidos/1366_2000.jpg',
        title: 'AUTOS DISPONIBLES',
        width: '40%',
        id:'autosDisponibles'
    },
    {
        url: 'https://media.kasperskydaily.com/wp-content/uploads/sites/87/2015/05/05201736/rentacar-featured.jpg',
        title: 'AUTOS RENTADOS',
        width: '30%',
        id: 'autosRentados'
    }
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
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

const Image = styled('span')(({ theme }) => ({
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

const ImageBackdrop = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
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
//********************************************************************************************************************


export default function MenuPrincipal() {
    const router = useRouter()
    const handleOnClick = (image) => {
        const {usuarioLoginId} = router.query;
        if(image.id === 'autosDisponibles'){
            router.push({
                pathname: 'http://localhost:3000/3_listar_autos_disponibles',
                query: {
                    usuarioLoginId: usuarioLoginId
                }
            }).then().catch(
                (error) => {
                    console.log(error)
                }
            );
        }else{
            router.push({
                pathname: 'http://localhost:3000/4_listar_autos_rentados',
                query: {
                    usuarioLoginId: usuarioLoginId
                }
            }).then().catch(
                (error) => {
                    console.log(error)
                }
            );
        }
    }
    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{height: '100vh'}}>
                <CssBaseline/>
                {getGridBackground()}
                <Grid item xs={12} sm={8} md={6} component={Paper} square>
                    <Box
                        sx={{
                            my: 4,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5"><strong>
                            MENU PRINCIPAL
                        </strong>
                        </Typography>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        minWidth: 300,
                        width: '100%',
                        justifyContent: 'center'
                    }}>
                        {images.map((image) => (
                            <ImageButton
                                sx={{
                                    my: 4,
                                    mx: 4,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center'
                                }}
                                focusRipple
                                key={image.title}
                                style={{
                                    width: 335,
                                }}
                                onClick={() => handleOnClick(image)}
                            >
                                <ImageSrc style={{backgroundImage: `url(${image.url})`}}/>
                                <ImageBackdrop className="MuiImageBackdrop-root"/>
                                <Image>
                                    <Typography
                                        component="span"
                                        variant="subtitle1"
                                        color="inherit"
                                        sx={{
                                            position: 'relative',
                                            p: 4,
                                            pt: 2,
                                            pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                                        }}
                                    >
                                        {image.title}
                                        <ImageMarked className="MuiImageMarked-root"/>
                                    </Typography>
                                </Image>
                            </ImageButton>
                        ))}
                    </Box>
                </Grid>
                {getGridBackground()}
            </Grid>
        </ThemeProvider>
    );
}