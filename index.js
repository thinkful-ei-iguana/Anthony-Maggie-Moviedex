require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const movies = require('./movies');
const app = express();
const API_Key = process.env.API_TOKEN;
const PORT = process.env.PORT || 8000;
const morganSetting = process.env.NODE_ENV === 'production' ? 'tiny' : 'common';

app.use(morgan(morganSetting));
app.use(cors());
app.use(helmet());

// Begin Auth
app.use(function validatonCheckpoint(req, res, next) {
  const User_API_Key = req.get('Authorization');
  console.log(User_API_Key);
  if (!User_API_Key || User_API_Key.split(' ')[1] !== API_Key) {
    return res.status(401).json({ error: 'Not a valid API key' });
  }
  next();
});

// End Auth

app.get('/movies', (req, res) => {
  const { genre, country, avg_vote } = req.query;

  let response = movies;

  if (req.query.genre) {
    response = response.filter(movie =>
      movie.genre
        .toLowerCase()
        .includes(req.query.genre.toLowerCase().replace('_', ' '))
    );
  }

  if (req.query.country) {
    response = response.filter(movie =>
      movie.country
        .toLowerCase()
        .includes(req.query.country.toLowerCase().replace('_', ' '))
    );
  }

  if (req.query.avg_vote) {
    response = response.filter(movie => movie.avg_vote >= req.query.avg_vote);
  }

  res.json(response);
});

app.listen(PORT, () => {
  console.log(`listening at PORT ${PORT}`);
});
