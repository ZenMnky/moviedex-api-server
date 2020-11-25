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
        return res.status(401).json({message: 'invalid credntials'})
    }

    next();

}

/**
 * findUniqueGenres
 * 
 * @returns {array} - valid movie genres based on the genres in the database
 * 
 */
const findUniqueGenres = () => {
    // grab all the genres in the DB
    let movieGenres = MOVIE_DATA.map(movie => {
        return movie.genre;
    });
    // filter down to only unique genres
    // if the array doesn't already contain the genre, add it
    let uniqueGenres = [...new Set(movieGenres)];

    return uniqueGenres;
}


/**
 * handleGetMovies
 * genre - filter by genre. case insensitive.
 * country - filter to include specified country. case insensitive.
 * vote - filter by vote >= to the given number
 */
const handleGetMovie = (req, res) => {
    // initialize response object
    let response = MOVIE_DATA;
    let validMovieGenres = findUniqueGenres();
    // get query parameters
    const { genre, country, avg_vote } = req.query;
    // validate params
    // check if keys are provided without a value
    if(genre === '' || country === '' || avg_vote === ''){
        res.status(400).send('keys must contain a value')
    }
    if(genre && !validMovieGenres.includes(genre)){
        return res.status(400).send(`genre must be of a valid types. See /genres for a list of valid types`);
    }
    

    // return response
    return res.status(200).send(response)
}

/**
 * handleGetHome
 * friendly user message to point to where the action is
 */
const handleGetHome = (req, res) => {
    return res.status(200).send(`
        You've reached the home route.
        The primary endpoint is '/movie'
        Optional parameters: genre, country, avg_vote
        See a list of movie genres at '/genres'
    `)
}

// run validation on all endpoints
app.use(validateBearerToken); 

// ENDPOINTS
app.get('/', handleGetHome);
app.get('/movie', handleGetMovie);
//return array of uniuqe genre types
app.get('/genres', (req,res) => {
    let uniqueGenres = findUniqueGenres();
    return res.json(uniqueGenres);

})


// deploy server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost/${PORT}`);
})

