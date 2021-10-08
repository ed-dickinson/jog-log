import axios from 'axios'
const baseUrl = 'http://localhost:3000/user/login'

const login = async credentials => {
  console.log(credentials)
  const response = await axios.post(baseUrl, credentials)
  // console.log(credentials)
  return response.data
}

export default { login }
