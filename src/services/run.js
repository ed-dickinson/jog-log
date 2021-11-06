import axios from 'axios'
const baseUrl = 'http://localhost:3000'

const addNew = async params => {
  console.log(params)
  const config = {
    headers: {Authorization: `Bearer ${params.token}`}
  }

  const bodyObject = params.formBody;

  const response = await axios.post(baseUrl + '/run/new', bodyObject, config)
  // console.log(credentials)
  return response.data
}

const importNew = async params => {
  console.log(params)
  const config = {
    headers: {Authorization: `Bearer ${params.token}`}
  }

  const bodyObject = params.formBody;

  const response = await axios.post(baseUrl + '/run/import', bodyObject, config)
  // console.log(credentials)
  return response.data
}

const exported = { addNew, importNew }

export default exported
