import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import NorthIcon from '@mui/icons-material/North';
import titos from './titos.jpg'
import SouthIcon from '@mui/icons-material/South';
import PinDropIcon from '@mui/icons-material/PinDrop';

export default function Place(props) {

    const place = props.place ?? "Tito's Alitas Adictivas";
    const zone = props.zone ?? "Zona Tec";
    const price = props.price ?? 3;
    const priceS = '$'.repeat(price)
    const top = props.top ?? 1;
    const desc = props.desc ?? "Las Mejores Alitas del Universo. Tenders, Elotes, Papas Especiales, Quesito Irresistible, Cerveza bien fría. Salsas únicas y originales."
    const img = props.img ?? titos;

    return (<Card sx={{ width: "100%", marginTop: 2, boxShadow: 'none', margin: "1px solid gray" }}>
        <CardMedia
            component="img"
            maxHeight="240px"
            image={img}
            alt={place}
        />
        <CardContent>
            <CardHeader
                title={place}
                subheader={zone + " " + priceS}
            />

            <Typography variant="body2" color="text.secondary">
                {desc}
            </Typography>
        </CardContent>
        <CardActions>
            <IconButton aria-label="up vote">
                <NorthIcon />
            </IconButton>
            <IconButton aria-label="down vote">
                <SouthIcon />
            </IconButton>
            <IconButton style={{ marginLeft: 'auto' }} aria-label="location">
                <PinDropIcon />
            </IconButton>
        </CardActions>
    </Card>);

}
