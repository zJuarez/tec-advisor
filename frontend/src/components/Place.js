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
import CommentIcon from '@mui/icons-material/Comment';
import { Link } from 'react-router-dom';

export default function Place(props) {

    const name = props.business.name;
    const category = props.business.category;
    const address = props.business.address;
    const city = props.business.city;
    const state = props.business.state;
    const img = props.business.imageUrl;

    return (<Card sx={{ width: "100%", marginTop: 2, boxShadow: 'none', margin: "1px solid gray" }}>
        <CardMedia
            component="img"
            maxHeight="240px"
            image={img}
            alt={name}
        />
        <CardContent>
            <CardHeader
                title={name}
                subheader={category + ". " + city + ", " + state}
            />

            <Typography variant="body2" color="text.secondary">
                {/* {desc} */}
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
                <Link to={"/location/"+props.business._id}>
                    <PinDropIcon />
                </Link>
            </IconButton>
            <IconButton>
                <Link to={"/reviews/"+props.business._id}>
                    <CommentIcon/>
                </Link>
            </IconButton>
        </CardActions>
    </Card>);

}
