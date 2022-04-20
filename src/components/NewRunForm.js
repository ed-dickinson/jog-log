import React, {useState, useEffect} from 'react'
import runService from '../services/run'

import NewShoeForm from './NewShoeForm'

const NewRunForm = ({token, user, shoes, setUser, setFormOpen, change, setChange, setiFrameOpen}) => {

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
  const [runShoe, setRunShoe] = useState(0);


  const resetForm = () => {
    setRunDistance('');
    setRunElevation(0);
    setRunDate(date_now);
    setRunDescription('');
  }

  useEffect(() => {
    // if (shoes.length > 0) {
      setRunShoe(shoes[0])
    // }
  }, [shoes])

  const [runFormMessage, setRunFormMessage] = useState('')
  const [buttonLogging, setButtonLogging] = useState(false)

  const handleNewRun = async (event) => {
    event.preventDefault();

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
      setButtonLogging(true)
      try {
        const response = await runService.addNew({
          token: token,
          formBody,
        })

        console.log(response)
        setRunFormMessage(response.message)
        resetForm()
        setFormOpen(false)
        setChange(!change)
        setButtonLogging(false)
      } catch (exception) {
        console.log('summin wrong')
        setTimeout(() => {
          console.log('timeout')
        }, 5000)
        setRunFormMessage('Error...')
        setButtonLogging(false)
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

      {
        // <div className="PlotLink"><a href="https://onthegomap.com/#/create" target="_blank" rel="noreferrer">(Find your distance/elevation...)</a></div>
      }

      <div className="PlotLink" ><span onClick={() => {setiFrameOpen('open')}}>(Find your distance/elevation...)</span></div>


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
        <button className={!buttonLogging ? "LogButton" : "LogButton logging"}>Log It.
          <div className="LoadingAnim">
            <svg className="loading" viewBox="-1 -1 4 4" xmlns="http://www.w3.org/2000/svg"><path d='M 2 1 A 1 1 0 0 1 0 1'></path></svg>
          </div>
        </button>
      </div>

    </form>
  )
}

export default NewRunForm
