import axios from 'axios'
const baseUrl = 'http://localhost:3000/shoes'

const addNew = async params => {
  console.log(params)
  const config = {
    headers: {Authorization: `Bearer ${params.token}`}
  }

  const bodyObject = {name: params.shoeName, user: params.user.no, }

  const response = await axios.post(baseUrl + '/new', bodyObject, config)
  // console.log(credentials)
  return response.data
}

export default { addNew }
