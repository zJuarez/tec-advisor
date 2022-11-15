import * as React from 'react';
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import Skeleton from '@mui/material/Skeleton';

export default function LoadingPlace() {
    return (<Card sx={{ width: "100%", marginTop: 2, boxShadow: 'none', margin: "1px solid gray" }}>
        <Skeleton sx={{ height: 350 }} animation="wave" variant="rectangular" />
        <CardContent>
            <Skeleton sx={{ margin: "auto" }} animation="wave" width={300} height={20} style={{ marginBottom: 6 }} />
        </CardContent>
        <CardActions>
            <Skeleton sx={{ margin: "auto" }} animation="wave" width={100} height={20} style={{ marginBottom: 6 }} />
        </CardActions>
    </Card>);

}
