import React, {useState} from 'react'
import LogoTitle from './LogoTitle'
import AnimatedLogo from './AnimatedLogo'
import FormTab from './FormTab'


const Header = (props) => {
  const [user, setUser] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false);
  // const logo = props.logo
  return (
    <header className="App-header">
      <div className="HeaderBG"></div>

      <AnimatedLogo />

      <LogoTitle />

      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >

      </a>

      <span className="header-username">{user!==null?`[${user.name}]`:''}</span>

      <FormTab user={user} setUser={setUser} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />

    </header>

  )
}

export default Header
