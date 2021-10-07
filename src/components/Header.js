import React from 'react'
import LogoTitle from './LogoTitle'
import AnimatedLogo from './AnimatedLogo'
import FormTab from './FormTab'


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

      <FormTab />

    </header>

  )
}

export default Header
