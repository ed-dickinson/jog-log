import React from 'react'
import LogoTitle from './LogoTitle'
import AnimatedLogo from './AnimatedLogo'
import NewRun from './NewRun'


const Header = (props) => {
  const logo = props.logo
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

      <NewRun />

    </header>

  )
}

export default Header
