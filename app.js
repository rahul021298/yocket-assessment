/**
 * Require
 */
require('dotenv/config');
const express = require('express');
const app = express();
const postRouter = require('./routes/postRoutes');
const mongoose = require('mongoose');
const { notFoundMiddleware } = require('./middleware/notFound');
const { errorHandlerMiddleware } = require('./middleware/errorHandler');
const { InternalError } = require('./errors/customErrors');

mongoose.connect(process.env.DB_Connect, { useNewUrlParser: true }, (err, res) =>{
    if (err){
        next(new InternalError(err));
    } else {
        console.info('Connected to DB');
    }
});

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use('/post', postRouter);
app.use('/get', postRouter);

// custom error handler
app.use(errorHandlerMiddleware);

// to process undefined routes
app.use(notFoundMiddleware);

const port = process.env.PORT || 5000;
app.listen(port, (err, res) => {
    if (err){
        next(new InternalError(err));
    } else {
        console.log(`server is listening on port ${port}...`);
    }
});