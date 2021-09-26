const express = require('express');
const app     = express();

/**
 * Settings
 * 
 * If 'process.env.PORT' distinct to 3000
 */
app.set('port', process.env.PORT || 3000);

/**
 * Middlewares
 * 
 * 'app.use(express.json())' using format 'JSON'
 */
app.use(express.json());

/**
 * Routes
 */
app.use(require('./routes/0_users'));

/**
 * Starting the server
 * 
 * app.get('port') get port defined
 */

app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
});