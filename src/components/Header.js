import React, {useState} from 'react'
import LogoTitle from './LogoTitle'
import AnimatedLogo from './AnimatedLogo'
import FormTab from './FormTab'


const Username = ({user, metric, setMetric}) => {

  const [actionsOpen, setActionsOpen] = useState(false)

  const handleUnitChange = () => {
    setMetric(!metric)
  }

  const handleImport = () => {
    console.log('import here')
  }

  return (
    <span className="header-username">
      {user!==null?`[${user.name}]`:''}
    <div className="Actions">
        <div onClick={handleUnitChange}>{metric?'metric':'imperial'}</div>
        <div onClick={handleImport}>import</div>
      </div>

    </span>
  )
}

const Header = ({user, setUser, shoes, setShoes, change, setChange, metric, setMetric}) => {

  const [token, setToken] = useState(null)
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

      <Username user={user} metric={metric} setMetric={setMetric}/>

      <FormTab user={user} setUser={setUser} loggedIn={loggedIn} setLoggedIn={setLoggedIn} token={token} setToken={setToken} shoes={shoes} setShoes={setShoes} change={change} setChange={setChange} />

    </header>

  )
}

export default Header
