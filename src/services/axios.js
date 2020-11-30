import axios from 'axios'

const Axios = axios.create({
  baseURL: 'http://localhost:3000/api'
})

Axios.interceptors.response.use(
  (res) => { return res; },
  (error) => { return error.response; }
);

export { Axios }