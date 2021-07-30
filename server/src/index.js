const express = require('express');
const path = require('path');

const config = require('./config/config');
const routes = require('./app/routes/routes');

const app = express();

app.use(express.static(path.resolve(__dirname, '../../client')));

app.use('/api', routes);

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../client', 'index.html'));
})

app.listen(config.port, () => {
    console.log(`Server connected on port: ${config.port}`);
});