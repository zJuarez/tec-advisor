const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/error');
const cors = require('cors');
const path = require('path')

//IMPORT ROUTES
const userRoutes = require('./routes/user')
const businessRouter = require('./routes/business')

//CONNECT DATABASE
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => console.log('DB connected'))
    .catch((err) => console.log(err));


app.disable('etag')

//MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../frontend/build')));

//ROUTES MIDDLEWARE
app.use("/api", userRoutes)
app.use('/business', businessRouter)

//ERROR MIDDLEWARE
app.use(errorHandler);

const port = process.env.PORT || 8000;

app.get('*', (req, res) => {
    console.log('redirecting');
    res.sendFile(
        path.resolve(__dirname, '../frontend/build', 'index.html')
    );
});

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
})

