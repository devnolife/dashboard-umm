import axios from 'axios'
export const baseUrl = 'http://localhost:8000/api'
import toast from 'react-hot-toast'

export async function fetch(method, url, params, body) {
  try {
    axios.defaults.headers.post['Content-Type'] = 'application/json'
    return await axios[method](baseUrl + url, params, body)
  } catch (e) {
    toast.error(e.response.data.message)
  }
}
