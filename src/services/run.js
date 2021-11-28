import axios from 'axios'
// const baseUrl = 'https://jog-log--api.herokuapp.com'
const baseUrl = 'http://joglog-env.eba-mdjdjcrp.us-east-2.elasticbeanstalk.com'

const addNew = async params => {

  const config = {
    headers: {Authorization: `Bearer ${params.token}`}
  }

  const bodyObject = params.formBody;

  const response = await axios.post(baseUrl + '/run/new', bodyObject, config)

  return response.data
}

const importNew = async params => {

  const config = {
    headers: {Authorization: `Bearer ${params.token}`}
  }

  const bodyObject = params.formBody;

  const response = await axios.post(baseUrl + '/run/import', bodyObject, config)

  return response.data
}

const exported = { addNew, importNew }

export default exported
