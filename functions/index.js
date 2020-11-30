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
app.post('/people/search', async (request, response) => {
  const size = request.query.size;
  const offset = request.query.offset;
  const bodyIsPresent = JSON.stringify(request.body) === JSON.stringify({});

  if (bodyIsPresent) {
    try {
      const res = await fetch(`https://search.torre.co/people/_search/?size=${size}&offset=${offset}`, {
        method: 'POST',
      });
  
      const data = await res.json();
  
      response.status(200).send({
        data: data.results,
        total: data.total,
      });
    } catch (err) {

    }
  } else {
    try {
      const res = await fetch(`https://search.torre.co/people/_search/?size=${size}&offset=${offset}`, {
        method: 'POST',
      });
  
      const data = await res.json();
  
      response.status(200).send({
        data: data.results,
        total: data.total,
      });
    } catch (error) {
      response.status(400).send({
        error,
      })
    }
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
      total: data.total,
    });
  } catch (error) {
    response.status(400).send({
      error,
    });
  }
});

app.get('/opportunity/:id', async (request, response) => {
  const id = request.params.id;

  try {
    const res = await fetch(`https://torre.co/api/opportunities/${id}`, {
      method: 'GET',
    });

    const data = await res.json();

    response.status(200).send({
      data,
    });
  } catch (error) {
    response.status(400).send({
      error,
    });
  }
});

app.get('/bios/:username', async (request, response) => {
  const username = request.params.username;

  try {
    const res = await fetch(`https://torre.bio/api/bios/${username}`, {
      method: 'GET',
    });

    const data = await res.json();

    response.status(200).send({
      data,
    });
  } catch (error) {
    response.status(400).send({
      error,
    });
  }
});


// Listen Command
exports.api = functions.https.onRequest(app);
