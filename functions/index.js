const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');

// API

// App Config
const app = express();

// Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// API Routes
app.get('/', (request, response) => response.status(200).send('Hello World'));

app.post('/people', async (request, response) => {
  const size = request.query.size;
  const offset = request.query.offset;
})

// Listen Command
exports.api = functions.https.onRequest(app);
