require('dotenv').config(); //reads the .env file and adds values to 'process.env' object
const express = require('express'); // boss man
const morgan = require('morgan'); // server http log
const app = express(); 
const cors = require('cors'); // configures to allow CORS
const helmet = require('helmet'); // removes server identfier from response header, and other things
const MOVIE_DATA = require('./movies-data-small.json');

app.use(morgan('dev'));
app.use(cors());
app.use(helmet());

const PORT = 8000;
const API_TOKEN = process.env.API_TOKEN;

/**
 * validateBearerToken
 * 
 */
const validateBearerToken = (req, res, next) => {
    const authVal = req.get('Authorization')

    if(!authVal){
        return res.status(400).json({error: 'Unauthorized request'});
    }
    if(!authVal.startsWith('Bearer ')){
        return res.status(400).send('Must include Bearer token')
    }

    //returns an array with two elements. token is second element
    const token = authVal.split(' ')[1]
    if(token !== API_TOKEN){
        return res.status(401).json(message: 'invalid credntials')
    }

    next();

}

/**
 * handleGetMovies
 * genre - filter by genre. case insensitive.
 * country - filter to include specified country. case insensitive.
 * vote - filter by vote >= to the given number
 */
const handleGetMovie = (req, res) => {
    const { genre, country, avg_vote } = req.params;

    return res.status(200).send(`You've reached the UPDATED /Movie route. It's under construction.`)
}

/**
 * handleGetHome
 * friendly user message to point to where the action is
 */
const handleGetHome = (req, res) => {
    return res.status(200).send(`You've reached the home route. All the action is at the '/movie' endpoint.`)
}

// run validation on all endpoints
app.use(validateBearerToken); 

// ENDPOINTS
app.get('/', handleGetHome);
app.get('/movie', handleGetMovie);



// deploy server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost/${PORT}`);
})

