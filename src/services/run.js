import axios from 'axios'
const baseUrl = 'http://localhost:3000/run'

const addNew = async params => {
  console.log(params)
  const config = {
    headers: {Authorization: `Bearer ${params.token}`}
  }

  const bodyObject = params.formBody;

  const response = await axios.post(baseUrl + '/new', bodyObject, config)
  // console.log(credentials)
  return response.data
}

const exported = { addNew }

export default exported
