import axios from 'axios'
const baseUrl = 'https://jog-log--api.herokuapp.com/shoes'

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

const exported = { addNew }

export default exported
