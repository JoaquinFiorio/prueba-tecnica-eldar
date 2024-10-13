const express = require('express');
const app = express();
const userRoutes = require('./eldar');

app.use('/eldar', userRoutes);

module.exports = app;