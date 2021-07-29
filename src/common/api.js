import axios from 'axios'

const baseUrl = process.env.REACT_APP_API_PATH || 'http://localhost:3001/api/'

export default axios.create({
  baseURL: baseUrl,
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
})
