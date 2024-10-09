// src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: '/api', // Using proxy
  withCredentials: true, // Send cookies with each request
});

// Authentication APIs
export const register = (username, password) =>
  API.post('/auth/register', { username, password });

export const login = (username, password) =>
  API.post('/auth/login', { username, password });

export const logout = () =>
  API.post('/auth/logout');

// Image APIs
export const uploadImage = (formData) =>
  API.post('/images/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const getImages = () => API.get('/images');

export default API;
