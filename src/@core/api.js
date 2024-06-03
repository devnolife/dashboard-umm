import axios from 'axios'
export const baseUrl = 'http://localhost:8000/api'
import toast, { Toaster } from 'react-hot-toast'
export async function fetch(method, url, params, body) {
  try {
    return await axios[method](baseUrl + url, params, body)
  } catch (e) {
    <Toaster />
    toast.error(e.response.data.message)
  }
}
