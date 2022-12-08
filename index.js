const express = require('express');
require('dotenv').config();
const app = express();
require('./connection/db');

const routes = require('./routes/index');

app.use(express.json());

// app.use(express.static('uploads/images'));
// app.use('/uploads/checklistTemplate', express.static('uploads/images'));

app.use('/', routes);


app.listen(process.env.PORT, () => {
    console.log(`server is up on port ${process.env.PORT}`)
});
