import axios from 'axios'
const baseUrl = 'http://localhost:3000/user'

const getShoes = async userNo => {
  const response = await axios.get(`${baseUrl}/${userNo}/shoes`)
  // console.log(response.data)
  return response.data
}

const getRuns = async userNo => {
  const response = await axios.get(`${baseUrl}/${userNo}/runs`)
  // console.log(response.data)
  return response.data
}

const exported = { getShoes, getRuns }

export default exported
