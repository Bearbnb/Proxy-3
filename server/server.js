const express = require('express');
const morgan = require('morgan');
const proxy = require('express-http-proxy');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

const descriptionService = 'http://bearbnbdescription-env1.b4nkf45hnu.us-west-2.elasticbeanstalk.com'
const photoPortal = 'http://eastphotos-env.fdvpa3pswm.us-east-1.elasticbeanstalk.com/'
const bookingWidget = 'http://bearbnbbooking-env.bz7dpdnrpj.us-west-1.elasticbeanstalk.com/'
const reviewsService = 'http://bearbnbreviews-env.rppvejjmcc.us-east-1.elasticbeanstalk.com/'

app.use('/:id', express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));


app.get('/photos/:id', proxy(photoPortal));
app.get('/bookings/:id', proxy(bookingWidget));
app.get('/bookings/:id/check_in/:date', proxy(bookingWidget));
app.post('/bookings/:id/check_in/:date/check_out/:date', proxy(bookingWidget));
app.get('/descriptions/:id', proxy(descriptionService));
app.get('/reviews/:id', proxy(reviewsService));

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
