import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    gap: 4,
};

export default function BusinessReviewModal(props) {
    const { open, handleClose, business, id } = props;
    const [review, setReview] = useState("")
    const [stars, setStars] = useState(0)
    const [error, setError] = useState(false)
    const navigate = useNavigate()

    const logIn = document.cookie.search('userName=') !== -1
    const userName = logIn ? document.cookie.substr(
        document.cookie.search('userName=') + 9
    ) : null

    const post = () => {
        const reviewObject = {
            text: review,
            stars: stars,
            name: userName,
        }

        console.log(reviewObject)

        if (review == "") {
            setError(true)
            return
        }

        axios.post('/business/add/' + id, reviewObject)
            .then(res => console.log(res.data));
        toast.success("Review added!");
        handleClose()
    }

    if (userName == null) {
        return <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {'Looks like you are not logged in'}
                </Typography>
                <Typography id="modal-modal-title" variant="h8" component="h4">
                    {'You want to write a review?'}
                </Typography>
                <Box sx={{ mt: 5, textAlign: 'center' }}>
                    <Button sx={{ width: 150, justifySelf: 'center' }} variant="contained" onClick={() => navigate("/login")} component="label">
                        Login
                    </Button>
                </Box>
            </Box>
        </Modal >

    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {'Did you like ' + business + '?'}
                </Typography>
                <TextField
                    id="outlined-multiline-static"
                    label="Review"
                    multiline
                    error={error}
                    rows={4}
                    defaultValue={review}
                    onChange={(e) => setReview(e.target.value)}
                    sx={{ maxWidth: '400px' }}
                />
                <Rating name="half-rating" onChange={(_event, newStars) => {
                    setStars(newStars);
                }}
                    defaultValue={stars} precision={0.5} />
                <Box sx={{ mt: 5, textAlign: 'center' }}>
                    <Button sx={{ width: 150, justifySelf: 'center' }} variant="contained" onClick={post} component="label">
                        Upload
                    </Button>
                </Box>
            </Box>
        </Modal >
    );
}