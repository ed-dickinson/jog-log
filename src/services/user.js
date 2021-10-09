import axios from 'axios'
const baseUrl = 'http://localhost:3000/user'

const getShoes = async userNo => {
  const response = await axios.get(`${baseUrl}/${userNo}/shoes`)
  console.log(response.data)
  return response.data
}

export default { getShoes }
