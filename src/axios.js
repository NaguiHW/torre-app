import axios from 'axios';

const instance = axios.create({
  // Local
  baseURL: 'http://127.0.0.1:5001/torre-app/us-central1/api',
  // Production
  // baseURL: 'https://us-central1-torre-app.cloudfunctions.net/api',
});

export default instance;
