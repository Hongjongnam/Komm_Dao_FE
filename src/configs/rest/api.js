import axios from 'axios';

const baseURL = 'http://localhost:4000';

const token = localStorage.getItem('token');

axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export const provider = axios.create({ baseURL });
