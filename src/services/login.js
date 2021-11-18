import axios from 'axios'
const baseUrl = 'https://jog-log--api.herokuapp.com/user'

const login = async credentials => {
  console.log(credentials)
  const response = await axios.post(baseUrl + '/login', credentials)

  return response.data
}

const register = async details => {
  console.log(details)
  const response = await axios.post(baseUrl + '/new', details)

  return response.data
}

const exported = { login, register }

export default exported
