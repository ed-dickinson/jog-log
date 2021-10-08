import React, {useState} from 'react'
import loginService from '../services/login'

const CloseButton = ({action}) => {
  return(
    <span onClick={() => action(false)} className="CloseButton">
      <svg className="close-svg" viewBox="-1 -1 4 4" xmlns="http://www.w3.org/2000/svg"><path d='M 0 2 L 1 1 L 0 0 M 2 0 L 1 1 L 2 2'></path></svg>
    </span>
  )
}

const Form = ({formOpen, setFormOpen, loggedIn, user, setUser}) => {
  const now = new Date();
  const date = {year: now.getFullYear(), month: now.getMonth()+1, day: now.getDate()}
  const date_now = date.year + '-' + (date.month.toString().length>1?'':'0')  + date.month + '-' + (date.day.toString().length>1?'':'0') + date.day;
  console.log(date_now)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('loggin in with', username, password)
    try {
      const response = await loginService.login({
        email: username, password,
      })
      setFormOpen(false)
      setUser(response.user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('wrong credentials')
      setTimeout(() => {
        console.log('timeout')
      }, 5000)
    }
  }


  // if (formOpen) {
  return(
    <div className={formOpen ? "Form" : "Form hidden"}>
      {user!==null ?
        <form>
          <label>Distance:</label><input type="number" /><span className="form-units">mi</span>
          <label>Elevation:</label><input type="number" /><span className="form-units">ft</span>
          <label>Date:</label><input type="date" value={date_now} onChange={() => console.log(date_now)}/><br />

          <label>Description:</label><br /><textarea type="textarea" name="description" />

          <label>Shoes:</label>

          {user.shoes.length===0
            ? <span className="no-shoes">No shoes! <a href="/">Add some?</a></span>
            : <select name="shoes" id="shoes">
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="mercedes">Mercedes</option>
                <option value="audi">Audi</option>
              </select>
          }



          <div className="button-cont">
            <button>Submit</button>
          </div>

        </form>
      :
        <form onSubmit={handleLogin}>
          <label>Email:</label>
          <input
            type="text"
            value={username}
            onChange={({target}) => setUsername(target.value)}
          />
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={({target}) => setPassword(target.value)}
          />
          <div className="button-cont">
            <button>Log In</button>
          </div>

        </form>
      }
      <CloseButton action={setFormOpen} />

    </div>
  )
// } else {
//   return(<div>No form.</div>)
// }
}

const FormTab = ({user, setUser, loggedIn, setLoggedIn}) => {
  const [formOpen, setFormOpen] = useState(false)



  return (

    <div className="FormTab">
      <Form formOpen={formOpen} setFormOpen={setFormOpen} loggedIn={loggedIn} user={user} setUser={setUser} />
      <div onClick={() => setFormOpen(true)} className={!formOpen ? "Tab" : "Tab hidden"}>
        {user!==null
          ? <svg className="log-a-jog-svg" viewBox="-1 -2 20 7.5" xmlns="http://www.w3.org/2000/svg"><path d='M 2 1 A 1 1 0 0 1 4 1 A 1 1 0 0 1 2 1 A 1 1 0 0 1 4 1 M 10 3 A 1 1 0 0 0 12 3 L 12 1 M 3 3 A 1 1 0 0 0 7 3 L 7 2 A 1 1 0 0 0 5 2 A 1 1 0 0 0 7 2 M 0 0 L 0 3 L 2 3 M 13 1 A 1 1 0 0 0 15 1 A 1 1 0 0 0 13 1 M 14 3 A 1 1 0 0 0 18 3 L 18 2 A 1 1 0 0 0 16 2 A 1 1 0 0 0 18 2 M 10 -1 L 10 0 A 1 1 0 0 0 8 0 A 1 1 0 0 0 10 0 L 10 1'></path></svg>
          : <svg className="log-in-svg" viewBox="-1 -2 16 7.5" xmlns="http://www.w3.org/2000/svg"><path d='M 2 1 A 1 1 0 0 1 4 1 A 1 1 0 0 1 2 1 A 1 1 0 0 1 4 1 M 10 4 A 1 1 0 0 0 10 4 L 10 2 M 3 3 A 1 1 0 0 0 7 3 L 7 2 A 1 1 0 0 0 5 2 A 1 1 0 0 0 7 2 M 0 0 L 0 3 L 2 3 M 12 1 L 12 3 L 12 2 A 1 1 0 0 1 14 2 L 14 3 M 9 0 A 1 1 0 0 0 11 0 A 1 1 0 0 0 9 0'></path></svg>
        }
      </div>




    </div>
  )
}

// <div className="NewRunTab"><svg className="log-a-jog-svg" viewBox="-1 -2 16 8.5" xmlns="http://www.w3.org/2000/svg"><path d='M 2 1 A 1 1 0 0 1 4 1 A 1 1 0 0 1 2 1 A 1 1 0 0 1 4 1 M 8 3 A 1 1 0 0 0 10 3 L 10 1 M 2 4 A 1 1 0 0 0 6 4 L 6 3 A 1 1 0 0 0 4 3 A 1 1 0 0 0 6 3 M 0 0 L 0 3 L 2 3 M 11 0 A 1 1 0 0 0 13 0 A 1 1 0 0 0 11 0 M 11 4 A 1 1 0 0 0 14 4 L 14 3 A 1 1 0 0 0 12 3 A 1 1 0 0 0 14 3 M 8 -1 L 8 0 A 1 1 0 0 0 6 0 A 1 1 0 0 0 8 0 L 8 1'></path></svg></div>

// <div className="NewRun">
//   <div className="NewRunTab"><svg className="log-a-jog-svg" viewBox="-1 -1 25 6" xmlns="http://www.w3.org/2000/svg"><path d='M 3 2 A 1 1 0 0 1 5 2 A 1 1 0 0 1 3 2 M 14 2 A 1 1 0 0 0 16 2 L 16 0 M 6 3 A 1 1 0 0 0 8 3 L 8 2 A 1 1 0 0 0 6 2 A 1 1 0 0 0 8 2 M 0 0 L 0 3 L 2 3 M 17 2 A 1 1 0 0 0 19 2 A 1 1 0 0 0 17 2 M 20 3 A 1 1 0 0 0 22 3 L 22 2 A 1 1 0 0 0 20 2 A 1 1 0 0 0 22 2 M 12 1 L 12 2 A 1 1 0 0 0 10 2 A 1 1 0 0 0 12 2 L 12 3'></path></svg></div>
// </div>

export default FormTab
