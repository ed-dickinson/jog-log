import React, {useState, useEffect, useCallback} from 'react'
import loginService from '../services/login'
// import shoeService from '../services/shoes'
import userService from '../services/user'

import NewRunForm from './NewRunForm'

const CloseButton = ({action}) => {
  return(
    <span onClick={() => action(false)} className="CloseButton">
      <svg className="close-svg" viewBox="-1 -1 4 4" xmlns="http://www.w3.org/2000/svg"><path d='M 0 2 L 1 1 L 0 0 M 2 0 L 1 1 L 2 2'></path></svg>
    </span>
  )
}

const Form = ({formOpen, setFormOpen, token, setToken, user, setUser, shoes, setShoes, change, setChange}) => {


  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')



  const getShoes = useCallback(async (userNo) => {
    // if (shoes === []) {
      try {
        const response = await userService.getShoes(userNo)
        setShoes(response.shoes)
      } catch (exeption) {
        console.log('summin wrong')
        setTimeout(() => {
          console.log('timeout')
        }, 5000)
      }
    // }
  },[setShoes]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInJogLogUser')
    if (loggedUserJSON) {
      const storedUser = JSON.parse(loggedUserJSON)
      setUser(storedUser.user)
      setToken(storedUser.token)
      getShoes(storedUser.user.no)
    }
  }, [getShoes, setUser, setToken])


  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const response = await loginService.login({
        email: username, password,
      })
      setFormOpen(false)
      setUser(response.user)
      setToken(response.token)

      getShoes(response.user.no)
      window.localStorage.setItem(
        'loggedInJogLogUser', JSON.stringify({user:response.user, token:response.token})
      )

      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('wrong credentials')
      setTimeout(() => {
        console.log('timeout login')
      }, 5000)
    }

  }


  // if (formOpen) {
  //distance and elevation are causing that red error
  return(
    <div className={formOpen ? "Form" : "Form hidden"}>
      {user!==null ?
        <NewRunForm token={token} user={user} shoes={shoes} setFormOpen={setFormOpen} change={change} setChange={setChange} />
      :
        <form onSubmit={handleLogin}>
          <label>Email: </label>
          <input
            type="text"
            value={username}
            onChange={({target}) => setUsername(target.value)}
          />&nbsp;
          <label>Password: </label>
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

}

const FormTab = ({user, setUser, token, setToken, shoes, setShoes, change, setChange}) => {
  const [formOpen, setFormOpen] = useState(false)



  return (

    <div className="FormTab">
      <Form formOpen={formOpen} setFormOpen={setFormOpen} user={user} setUser={setUser} token={token} setToken={setToken} shoes={shoes} setShoes={setShoes} change={change} setChange={setChange} />
      <div onClick={() => setFormOpen(true)} className={!formOpen ? "Tab" : "Tab hidden"}>
        {user!==null
          ? <svg className="log-a-jog-svg" viewBox="-1 -2 20 7.5" xmlns="http://www.w3.org/2000/svg"><path d='M 2 1 A 1 1 0 0 1 4 1 A 1 1 0 0 1 2 1 A 1 1 0 0 1 4 1 M 10 3 A 1 1 0 0 0 12 3 L 12 1 M 3 3 A 1 1 0 0 0 7 3 L 7 2 A 1 1 0 0 0 5 2 A 1 1 0 0 0 7 2 M 0 0 L 0 3 L 2 3 M 13 1 A 1 1 0 0 0 15 1 A 1 1 0 0 0 13 1 M 14 3 A 1 1 0 0 0 18 3 L 18 2 A 1 1 0 0 0 16 2 A 1 1 0 0 0 18 2 M 10 -1 L 10 0 A 1 1 0 0 0 8 0 A 1 1 0 0 0 10 0 L 10 1'></path></svg>
          : <svg className="log-in-svg" viewBox="-1 -2 16 7.5" xmlns="http://www.w3.org/2000/svg"><path d='M 2 1 A 1 1 0 0 1 4 1 A 1 1 0 0 1 2 1 A 1 1 0 0 1 4 1 M 10 4 A 1 1 0 0 0 10 4 L 10 2 M 3 3 A 1 1 0 0 0 7 3 L 7 2 A 1 1 0 0 0 5 2 A 1 1 0 0 0 7 2 M 0 0 L 0 3 L 2 3 M 12 1 L 12 3 L 12 2 A 1 1 0 0 1 14 2 L 14 3 M 9 0 A 1 1 0 0 0 11 0 A 1 1 0 0 0 9 0'></path></svg>
        }
      </div>

    </div>
  )
}


export default FormTab
