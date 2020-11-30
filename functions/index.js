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
  const payload = [];
  const requestedBody = JSON.stringify(request.body);
  const bodyIsPresent = requestedBody !== JSON.stringify({});
  // let res;

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
});

app.post('/opportunities/search', async (request, response) => {
  const size = request.query.size;
  const offset = request.query.offset;
  const payload = [];
  const requestedBody = JSON.stringify(request.body);
  const bodyIsPresent = requestedBody !== JSON.stringify({});
  let res;

  for (const key in request.body) {
    if (key === 'remote' || key === 'organization') {
      payload.push({ [key]: { term: request.body[key] } });
    }
    if (key === 'skill/role') {
      payload.push({ [key]: { text: request.body[key], experience: 'potential-to-develop' } });
    }
    if (key === 'type' || key === 'status') {
      payload.push({ [key]: { code: request.body[key] } });
    }
  }

  const bodyToSend = JSON.stringify({ and: payload });

  try {
    if (bodyIsPresent) {
      console.log(bodyToSend);
      res = await fetch(`https://search.torre.co/opportunities/_search/?size=${size}&offset=${offset}`, {
        method: 'POST',
        body: bodyToSend,
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
      });
    } else {
      res = await fetch(`https://search.torre.co/opportunities/_search/?size=${size}&offset=${offset}`, {
        method: 'POST',
      });
    }

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
