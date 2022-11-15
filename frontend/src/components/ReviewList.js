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

export default function AlignItemsList(props) {
    const { reviews, onClick } = props

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
        <List sx={{ width: '100%', bgcolor: 'white' }}>
            {reviews.map(review => <><ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt={review.name ?? 'Anonymus'} > {review.name ? review.name[0] : '?'} </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={review.name ?? 'Anonymus'}
                    secondary={
                        <React.Fragment>
                            <div>
                                <Rating size="small" name="half-rating" defaultValue={'$numberDecimal' in review.stars ? review.stars['$numberDecimal'] : 0} readOnly precision={0.5} />
                            </div>
                            {review.text}
                        </React.Fragment>
                    }
                />
            </ListItem> <Divider light /> </>)
            }
            {button}
        </List >
    );
}