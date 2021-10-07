import React, {useState} from 'react'

const Form = ({formOpen}) => {

  if (formOpen) {
  return(
    <div className="NewRunForm">
      <form>
        <label>Distance:</label><input />
        <label>Elevation:</label><input />
        <label>Date:</label><input type="date" /><br />

        <label>Description:</label><input name="description"/>

        <label>Shoes:</label>
        <select name="shoes" id="shoes">
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select>

        <button>Submit</button>

      </form>
    </div>
  )
} else {
  return(<div>No form.</div>)
}
}

const NewRun = () => {
  const [formOpen, setFormOpen] = useState(false)

  return (
    <div className="NewRun">{formOpen ?
      <Form formOpen={formOpen}/> :
      <div onClick={() => setFormOpen(true)} className="NewRunTab"><svg className="log-a-jog-svg" viewBox="-1 -2 20 7.5" xmlns="http://www.w3.org/2000/svg"><path d='M 2 1 A 1 1 0 0 1 4 1 A 1 1 0 0 1 2 1 A 1 1 0 0 1 4 1 M 10 3 A 1 1 0 0 0 12 3 L 12 1 M 3 3 A 1 1 0 0 0 7 3 L 7 2 A 1 1 0 0 0 5 2 A 1 1 0 0 0 7 2 M 0 0 L 0 3 L 2 3 M 13 1 A 1 1 0 0 0 15 1 A 1 1 0 0 0 13 1 M 14 3 A 1 1 0 0 0 18 3 L 18 2 A 1 1 0 0 0 16 2 A 1 1 0 0 0 18 2 M 10 -1 L 10 0 A 1 1 0 0 0 8 0 A 1 1 0 0 0 10 0 L 10 1'></path></svg></div>
    }


    </div>
  )
}

// <div className="NewRunTab"><svg className="log-a-jog-svg" viewBox="-1 -2 16 8.5" xmlns="http://www.w3.org/2000/svg"><path d='M 2 1 A 1 1 0 0 1 4 1 A 1 1 0 0 1 2 1 A 1 1 0 0 1 4 1 M 8 3 A 1 1 0 0 0 10 3 L 10 1 M 2 4 A 1 1 0 0 0 6 4 L 6 3 A 1 1 0 0 0 4 3 A 1 1 0 0 0 6 3 M 0 0 L 0 3 L 2 3 M 11 0 A 1 1 0 0 0 13 0 A 1 1 0 0 0 11 0 M 11 4 A 1 1 0 0 0 14 4 L 14 3 A 1 1 0 0 0 12 3 A 1 1 0 0 0 14 3 M 8 -1 L 8 0 A 1 1 0 0 0 6 0 A 1 1 0 0 0 8 0 L 8 1'></path></svg></div>

// <div className="NewRun">
//   <div className="NewRunTab"><svg className="log-a-jog-svg" viewBox="-1 -1 25 6" xmlns="http://www.w3.org/2000/svg"><path d='M 3 2 A 1 1 0 0 1 5 2 A 1 1 0 0 1 3 2 M 14 2 A 1 1 0 0 0 16 2 L 16 0 M 6 3 A 1 1 0 0 0 8 3 L 8 2 A 1 1 0 0 0 6 2 A 1 1 0 0 0 8 2 M 0 0 L 0 3 L 2 3 M 17 2 A 1 1 0 0 0 19 2 A 1 1 0 0 0 17 2 M 20 3 A 1 1 0 0 0 22 3 L 22 2 A 1 1 0 0 0 20 2 A 1 1 0 0 0 22 2 M 12 1 L 12 2 A 1 1 0 0 0 10 2 A 1 1 0 0 0 12 2 L 12 3'></path></svg></div>
// </div>

export default NewRun