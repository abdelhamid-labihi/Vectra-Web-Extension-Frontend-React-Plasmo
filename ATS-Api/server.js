const express = require('express');
const cors = require('cors');
require('dotenv').config();
const uploadRoute = require('./routes/uploadRoute');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: 'chrome-extension://dhbnnkjhbecicjddmjohljdfocdcdgpp' }));


app.use('/upload', uploadRoute);

app.listen(process.env.APP_PORT, () => {
    console.log(`Server running on port ${process.env.APP_PORT}`);
});




