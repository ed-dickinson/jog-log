import React from 'react'
import LogoTitle from './LogoTitle'
import AnimatedLogo from './AnimatedLogo'
import NewRun from './NewRun'


const Header = (props) => {
  const logo = props.logo
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <AnimatedLogo />

      <LogoTitle />

      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >

      </a>

      <NewRun />

    </header>

  )
}

export default Header
