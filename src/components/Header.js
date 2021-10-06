import React from 'react'
import LogoTitle from './LogoTitle'

const Header = (props) => {
  const logo = props.logo
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <LogoTitle />
      <span>
        <div>Jog Log</div>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          "Keep on loggin' those jogs!"
        </a>
      </span>

    </header>

  )
}

export default Header
