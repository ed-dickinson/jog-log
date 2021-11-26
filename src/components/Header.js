import React, {useState} from 'react'
import LogoTitle from './LogoTitle'
import AnimatedLogo from './AnimatedLogo'
import FormTab from './FormTab'
import ImportForm from './ImportForm'


const Username = ({user, metric, setMetric, handleImport}) => {

  const handleUnitChange = () => {
    setMetric(!metric)
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

  const [importFormOpen, setImportFormOpen] = useState(false)

  const handleImport = () => {
    setImportFormOpen(true);
  }

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

      <Username user={user} metric={metric} setMetric={setMetric} handleImport={handleImport}/>

      <FormTab user={user} setUser={setUser} loggedIn={loggedIn} setLoggedIn={setLoggedIn} token={token} setToken={setToken} shoes={shoes} setShoes={setShoes} change={change} setChange={setChange} />

      <ImportForm importFormOpen={importFormOpen} setImportFormOpen={setImportFormOpen} user={user} token={token} change={change} setChange={setChange} />

    </header>

  )
}

export default Header
