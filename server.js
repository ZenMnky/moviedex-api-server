const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const helmet = require('helmet');

const PORT = 8000;

app.use(morgan('dev'));
app.use(cors());
app.use(helmet());


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


app.get('/', handleGetHome);


app.get('/movie', handleGetMovie);




app.listen(PORT, () => {
    console.log(`Server is running at http://localhost/${PORT}`);
})

