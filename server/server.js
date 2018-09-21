const express = require('express');
const morgan = require('morgan');
const proxy = require('express-http-proxy');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

const descriptionService = 'http://localhost:3001'
const photoPortal = 'http://localhost:3007'
const bookingWidget = 'http://localhost:3003'
const reviewsService = 'http://localhost:3004'

app.use('/:id', express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));


app.get('/photos/:id', proxy(photoPortal));
app.get('/bookings/:id', proxy(bookingWidget));
app.get('/descriptions/:id', proxy(descriptionService));
app.get('/reviews/:id', proxy(reviewsService));

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
