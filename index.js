const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('./config/connect')
const User = require('./models/user')
const authroute = require('./routes/auth')

const app = express();


app.use(cors());


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', authroute);



const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});