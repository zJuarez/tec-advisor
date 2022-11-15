import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { GoogleMap, MarkerF } from '@react-google-maps/api';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'white',
    boxShadow: 24,
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    p: 5,
    width: '80vw',
    maxWidth: '750px',
    gap: 4,
};

export default function BusinessLocationModal(props) {
    const { open, handleClose, business, latitude, longitude, address } = props;

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {business}
                </Typography>
                <Typography id="modal-modal-title" variant="h6" component="h4">
                    {address}
                </Typography>
                <GoogleMap
                    zoom={15}
                    center={{ lat: latitude, lng: longitude }}
                    mapContainerClassName="map-container-modal"
                >
                    <MarkerF position={{ lat: latitude, lng: longitude }} />
                </GoogleMap>
            </Box>
        </Modal >
    );
}