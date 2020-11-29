import axios from 'axios';

const instance = axios.create({
  // Local
  baseURL: 'http://127.0.0.1:5001/torre-app/us-central1/api',
});

export default instance;
