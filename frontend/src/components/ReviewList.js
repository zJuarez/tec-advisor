import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';

export default function ReviewList(props) {
    const { reviews, onClick } = props

    const logIn = document.cookie.search('userName=') !== -1
    const userName = logIn ? document.cookie.substr(
        document.cookie.search('userName=') + 9
    ) : null

    const emptyState = <h4 style={{ color: "gray" }}> No Reviews Yet. Write your own!</h4>
    const button = <Box sx={{ mb: 1, mt: 2, textAlign: 'center' }}>
        <Button sx={{ width: 150, justifySelf: 'center' }} variant="outline" onClick={onClick} component="label">
            Review
        </Button>
    </Box>

    if (reviews == null) {
        return;
    }

    if (reviews.length === 0) {
        return <> {emptyState} {button}</>
    }
    return (
        // 
        <List sx={{ width: '100%', bgcolor: 'white' }}>
            {reviews.map(review => <><ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt={review.name ?? 'Anonymus'} > {review.name ? review.name[0] : '?'} </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={(review.name ?? 'Anonymus') + (review.edited === 1 ? ' [Edit]' : '')}
                    secondary={
                        <React.Fragment>
                            <div>
                                <Rating size="small" name="half-rating" defaultValue={'$numberDecimal' in review.stars ? review.stars['$numberDecimal'] : 0} readOnly precision={0.5} />
                            </div>
                            <div>
                                {review.text}
                            </div>
                            {review.creationDate ? review.creationDate.substr(0, 10) : ''}
                        </React.Fragment>
                    }
                />
                {review.name === userName ?
                    <Link style={{ decoration: 'none', marginTop: 4 }} to={"/editReview/" + review._id}>
                        <EditIcon fontSize='small' color='action' />
                    </Link>
                    : null}

            </ListItem> <Divider light /> </>)
            }
            {button}
        </List >
    );
}