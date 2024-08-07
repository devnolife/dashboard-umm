import axios from 'axios'
export const baseUrl2 = 'http://localhost:8080/api'
export const baseUrl = 'https://api.beasiswa.unismuh.ac.id/api'
import toast from 'react-hot-toast'

export async function fetch(method, url, params, body) {
  try {
    axios.defaults.headers.post['Content-Type'] = 'application/ json'
    return await axios[method](baseUrl + url, params, body)
  } catch (e) {
    toast.error(e.response.data.message)
  }
}
