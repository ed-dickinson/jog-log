import React, {useState} from 'react'
import shoeService from '../services/shoes'

const NewShoeForm = ({token, user, setShoeFormOpen}) => {
  const [shoeName, setShoeName] = useState('')
  const [shoeMessage, setShoeMessage] = useState('')
  const handleNewShoe = async (event) => {
    event.preventDefault()
    try {
      const response = await shoeService.addNew({
        token: token, user: user, shoeName: shoeName,
      })
      // setShoeFormOpen(false)
      setShoeMessage('Shoes added!')
      console.log(response)
    } catch (exception) {
      console.log('summin wrong')
      setTimeout(() => {
        console.log('timeout')
      }, 5000)
    }
  }
  return(
    <span>
      {shoeMessage === '' ?
        <span className="NewShoeForm" >
            <label>Name: </label>
            <input type="text" value={shoeName} onChange={({target}) => setShoeName(target.value)}/>
            <button onClick={handleNewShoe}>Add</button>
        </span>
      :
        <span className="NewShoeMessage">{shoeMessage}</span>
    }


    </span>
  )
}

export default NewShoeForm
