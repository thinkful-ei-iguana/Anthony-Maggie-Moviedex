require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const movies = require('./movies');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(helmet());

app.get('/movies', (req, res) => {
  const { genre, country, avg_vote } = req.query;

  if (req.query.genre) {
    response = movies.filter(movie =>
      movie
        .genre
        .toLowerCase()
        .includes(req.query.genre.toLowerCase())
    )
  }

  if (req.query.country) {
    response = movies.filter(movie =>
      movie
        .country
        .toLowerCase()
        .includes(req.query.country.toLowerCase())
    )
  }

  if (req.query.avg_vote) {
    response = movies.filter(movie =>
      movie.avg_vote >= (req.query.avg_vote)
    )
  }

  res.json(response);

  // let searchMethod;
  // let searchTerm;

  // if (genre) {
  //   searchMethod = 'genre';
  // }
  // if (country) {
  //   searchMethod = 'country';
  // }
  // if (avg_vote) {
  //   searchMethod = 'avg_vote';
  // }

  // const filter = movies.filter(movie => {
  //   let userInput = Object.values(req.query)
  //   console.log('userInput is', userInput[0]);
  //   console.log('movie.country is', movie.country);
  //   movie.searchMethod === userInput[0];
  // })
  // console.log('filter is', filter);
  // let response = filter;

  // res.json(response);
})

app.listen(8050, () => {
  console.log('listening at PORT 8050');
});

