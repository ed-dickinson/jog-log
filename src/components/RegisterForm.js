import React, {useState} from 'react'
import loginService from '../services/login'


const RegisterForm = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')
  const [registerButtonText, setRegisterButtonText] =useState('Register')

  const handleRegister = async (event) => {
    event.preventDefault()
    console.log('handle register')
    if (registerButtonText !== 'Register') {
      return;
    }
    // console.log('loggin in with', username, password)
    try {
      const response = await loginService.register({
        email: username, password, name: nickname,
      })
      // setFormOpen(false)
      // setUser(response.user)
      // setToken(response.token)
      console.log(response.message)
      setRegisterButtonText('Registered!')
      // getShoes(response.user.no)
      // window.localStorage.setItem(
      //   'loggedInJogLogUser', JSON.stringify({user:response.user, token:response.token})
      // )

      // setUsername('')
      // setPassword('')
    } catch (exception) {
      console.log('something wrong in registering!')
      setTimeout(() => {
        console.log('timeout - register')
      }, 5000)
      setRegisterButtonText('Error Registering')
    }

  }

  return(
    <div className="RegisterForm">
      <form onSubmit={handleRegister}>
        <span>
          <label>Name: </label><br />
          <input
          type="text"
          value={nickname}
          onChange={({target}) => setNickname(target.value)}
        />
      </span>
        <span>
          <label>Email: </label><br />
          <input
            type="text"
            value={username}
            onChange={({target}) => setUsername(target.value)}
        />
        </span>
        <span>
          <label>Password: </label><br />
          <input
            type="password"
            value={password}
            onChange={({target}) => setPassword(target.value)}
          />
        </span>
        <div className={registerButtonText==='Register'?"button-cont":"button-cont registered"}>
          <button>{registerButtonText}</button>
        </div>

      </form>
    </div>

  )
}

export default RegisterForm
