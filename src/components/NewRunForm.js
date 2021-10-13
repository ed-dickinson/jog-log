import React, {useState, useEffect} from 'react'
import runService from '../services/run'

import NewShoeForm from './NewShoeForm'

const NewRunForm = ({token, user, shoes, setUser, setFormOpen, change, setChange}) => {
  console.log('runformrender');
  const now = new Date();
  const date = {year: now.getFullYear(), month: now.getMonth()+1, day: now.getDate()}
  const date_now = date.year + '-' + (date.month.toString().length>1?'':'0')  + date.month + '-' + (date.day.toString().length>1?'':'0') + date.day;

  const [shoeFormOpen, setShoeFormOpen] = useState(false)

  const openNewShoeForm = (event) => {
    event.preventDefault();
    setShoeFormOpen(true)
  }

  const [runDistance, setRunDistance] = useState('');
  const [runElevation, setRunElevation] = useState(0);
  const [runDate, setRunDate] = useState(date_now);
  const [runDescription, setRunDescription] = useState('');
  // console.log(shoes[0])
  // const firstShoeNo = shoes[0].no
  const [runShoe, setRunShoe] = useState(0);
  // console.log(runShoe)

  useEffect(() => {
    // if (shoes.length > 0) {
      setRunShoe(shoes[0])
    // }
  }, [shoes])

  const [runFormMessage, setRunFormMessage] = useState('')

  const handleNewRun = async (event) => {
    event.preventDefault();

    // console.log(shoes)
    // if (shoes.length>0) {
    //   setRunShoe(shoes[0].no)
    // }
    // console.log(runShoe)
    let formBody = {
      user: user.no,
      shoe: runShoe.no,
      // distance: Math.round(parseInt(runDistance) * 1609.34),
      distance: runDistance,
      elevation: parseInt(runElevation),
      date: new Date(runDate),
      description: runDescription,
    }
    console.log(formBody)
    if (formBody.distance > 0 && runDescription !== '') {
      try {
        const response = await runService.addNew({
          token: token,
          formBody,
        })
        // setShoeFormOpen(false)
        // setShoeMessage('Shoes added!')
        console.log(response)
        setRunFormMessage(response.message)
        setFormOpen(false)
        setChange(!change)
      } catch (exception) {
        console.log('summin wrong')
        setTimeout(() => {
          console.log('timeout')
        }, 5000)
      }
    } else {
        setRunFormMessage(formBody.distance === 0 || runDistance === '' ?
          "! Distance can't be 0..." :
          "! Run needs a description...")
    }
  }

  return(
    <form onSubmit={handleNewRun}>
      <label>Distance: </label>
      <input type="text"
        value={runDistance}
        onChange={({target}) => setRunDistance(target.value)}
      /><span className="form-units">mi</span>
      <label>Elevation: </label>
      <input type="text"
        value={runElevation}
        onChange={({target}) => setRunElevation(target.value)}
      /><span className="form-units">ft</span>
      <label>Date: </label>
      <input type="date"
        value={runDate}
        onChange={({target}) => setRunDate(target.value)}
      /><br />

      <label>Description:</label><br />
      <textarea
        type="textarea" name="description"
        value={runDescription}
        onChange={({target}) => setRunDescription(target.value)}
      />

      <label>Shoes: </label>

      {shoes.length === 0
        ? <span className="no-shoes">No shoes! <button className="anchor-button"
          onClick={openNewShoeForm}
          >Add some?</button> </span>
        : <select name="shoes" id="shoes"
          onChange={({target}) => {setRunShoe(target.value); console.log(target.value)}}
        >
          {shoes.map(shoe =>
            <option key={shoe.no} value={shoe.no}>{shoe.name}</option>
          )}

          </select>
      }

      {shoeFormOpen !== false && <NewShoeForm token={token} user={user} setShoeFormOpen={setShoeFormOpen}/>}

      <div className="button-cont">
        <span className="run-form-message">{runFormMessage} </span>
        <button>Log It.</button>
      </div>

    </form>
  )
}

export default NewRunForm
