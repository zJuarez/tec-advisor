import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import PinDropIcon from '@mui/icons-material/PinDrop';
import CommentIcon from '@mui/icons-material/Comment';
import { Link, useNavigate } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import BusinessReviewModal from './BusinessReviewsModal';
import Button from '@mui/material/Button';
import { useState } from 'react';

export default function Place(props) {

    const navigate = useNavigate()

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const id = props.business._id;
    const name = props.business.name;
    const category = props.business.category;
    const city = props.business.city;
    const state = props.business.state;
    const img = props.business.imageUrl;
    const stars = props.business.stars['$numberDecimal']

    const handleLocationClick = () => {
        navigate('/location/' + id)
    }

    return (<Card sx={{ width: "100%", marginTop: 2, boxShadow: 'none', margin: "1px solid gray" }}>
        <Link to={'/place/' + id}>
            <CardMedia
                component="img"
                maxHeight="240px"
                image={img}
                alt={name}
            />
        </Link>
        <CardContent>
            <CardHeader
                title={name}
                subheader={category + ". " + city + ", " + state}
            />
        </CardContent>
        <CardActions>
            <Button variant="rating" onClick={handleOpen}>
                <Rating name="half-rating" defaultValue={stars} readOnly precision={0.5} />
            </Button>
            <IconButton onClick={handleLocationClick} style={{ marginLeft: 'auto' }} aria-label="location">
                <PinDropIcon />
            </IconButton>
            <IconButton onClick={handleOpen}>
                <CommentIcon />
            </IconButton>
        </CardActions>
        <BusinessReviewModal id={id} open={open} handleClose={handleClose} business={name} />
    </Card>);

}
