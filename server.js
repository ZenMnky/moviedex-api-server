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
 * handleGetMovie 
 * genre - filter by genre. case insensitive.
 * country - filter to include specified country. case insensitive.
 * vote - filter by vote >= to the given number
 */
app.get('/', (req,res) => {
    return res.status(200).send(`You've reached the home route. The active endpoint is '/movie'`)
});

app.get('/movie', (req, res) => {
    const { genre, country, avg_vote } = req.params;

    return res.status(200).send(`You've reached the /Movie route. It's under construction.`)
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost/${PORT}`);
})

