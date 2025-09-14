import axios from 'axios';

// Create an Axios instance with a base URL and credentials support
const apiRequest = axios.create({
  baseURL: 'http://localhost:8800/api', // Base URL for API requests
  withCredentials: true, // Allows sending cookies with requests
});


export default apiRequest;
