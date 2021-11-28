import axios from 'axios'
// const baseUrl = 'https://jog-log--api.herokuapp.com/user'
const baseUrl = 'http://joglog-env.eba-mdjdjcrp.us-east-2.elasticbeanstalk.com/user'

const getShoes = async userNo => {
  const response = await axios.get(`${baseUrl}/${userNo}/shoes`)

  return response.data
}

const getRuns = async userNo => {
  const response = await axios.get(`${baseUrl}/${userNo}/runs`)

  return response.data
}

const exported = { getShoes, getRuns }

export default exported
