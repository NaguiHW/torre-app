const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

// API

// App Config
const app = express();

// Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// API Routes
app.get('/', (request, response) => response.status(200).send('Hello World'));

app.post('/people/search', async (request, response) => {
  const size = request.query.size;
  const offset = request.query.offset;

  try {
    const res = await fetch(`https://search.torre.co/people/_search/?size=${size}&offset=${offset}`, {
      method: 'POST',
    });

    const data = await res.json();

    response.status(200).send({
      data: data.results,
    });
  } catch (error) {
    response.status(400).send({
      error,
    })
  }
});

app.post('/opportunities/search', async (request, response) => {
  const size = request.query.size;
  const offset = request.query.offset;

  try {
    const res = await fetch(`https://search.torre.co/opportunities/_search/?size=${size}&offset=${offset}`, {
      method: 'POST',
    });

    const data = await res.json();

    response.status(200).send({
      data: data.results,
    });
  } catch (error) {
    response.status(400).send({
      error,
    });
  }
});

// Listen Command
exports.api = functions.https.onRequest(app);
