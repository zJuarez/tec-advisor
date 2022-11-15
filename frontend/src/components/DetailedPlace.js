import * as React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import BusinessReviewModal from './BusinessReviewsModal';
import { GoogleMap, MarkerF } from '@react-google-maps/api';
import ReviewList from './ReviewList'
import LoadingPlace from './LoadingPlace'

export default function DetailedPlace() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [place, setPlace] = useState({})
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [loading, setLoading] = useState(false);

    const fetchBusiness = useCallback(() => {
        setLoading(true);
        // TODO CHANGE HARDOCDED URI
        axios.get('/business/' + id)
            .then(response => {
                setPlace(response.data)
                setLoading(false)
            })
            .catch((error) => {
                setPlace({ error: error })
            })
    })
    useEffect(() => {
        fetchBusiness()
    }, [])

    const name = place.name;
    const category = place.category;
    const address = place.address;
    const city = place.city;
    const state = place.state;
    const img = place.imageUrl;
    const stars = place.stars ? ('$numberDecimal' in place.stars ? place.stars['$numberDecimal'] : 0) : 0
    const latitude = place.latitude
    const longitude = place.longitude

    if (loading) {
        return <div className='feed'> <LoadingPlace></LoadingPlace> </div>
    }

    return (<div className="feed">
        <div style={{ marginTop: 10, fontSize: 12, color: "gray" }}>
            <Card sx={{ width: "100%", marginTop: 2, bosxShadow: 'none', margin: "1px solid gray" }}>
                <Link to={'/' + category + '/' + place._id}>
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
                    <Button style={{ margin: 'auto' }} variant="rating" onClick={handleOpen}>
                        <Rating name="half-rating" defaultValue={stars} readOnly precision={0.5} />
                    </Button>
                </CardActions>
                <BusinessReviewModal id={id} open={open} handleClose={handleClose} business={name} />
            </Card>
        </div >
        <Card sx={{ width: "100%", marginTop: 2, boxShadow: 'none', margin: "1px solid gray" }}>
            <GoogleMap
                zoom={15}
                center={{ lat: latitude, lng: longitude }}
                mapContainerClassName="map-container"
            >
                <MarkerF position={{ lat: latitude, lng: longitude }} />
            </GoogleMap>
            <Box sx={{ mb: 1, mt: 2, textAlign: 'center' }}>
                <Button sx={{ width: 150, justifySelf: 'center' }} onClick={() => navigate('/location/' + id)} variant="outline" component="label">
                    See more!
                </Button>
            </Box>
        </Card>

        {<Card sx={{ width: "100%", marginTop: 2, boxShadow: 'none', margin: "1px solid gray" }}>
            <ReviewList reviews={place.reviews} onClick={handleOpen} />
        </Card>}
    </div>);

}
