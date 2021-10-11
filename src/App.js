import React, {useState} from 'react'
import logo from './logo.svg';
import './App.css';
import Header from './components/Header'
import DataDisplay from './components/DataDisplay'

const Intro = () => {
  return(
    <div className="IntroText AppBody">
      <p>Welcome to Jog Log, where you can meet all – or at least some – of your jog logging needs.</p>
      <p> Like everyone else, for a long time I used Strava, but I became more and more uneasy about putting the data of my natural body's movements in the hands of a somewhat faceless enterprise. Half out of a genuine fear of not-knowing what their intentions are — and half for the simple principle of it.</p>
      <p>Plus, I'm fed up of running with a Garmin watch — keeping it charged and worrying about pausing for to long if I want to take a moment to appreciate some beautiful vista. But I do still like keeping track of how far, and how often, I've run, so I wanted to make a way to do just that. And you're welcome to use it as well.</p>
      <p>So <a href="https://reactjs.org"
      target="_blank"
      rel="noopener noreferrer">create an account</a> or have a look at it with <a href="https://reactjs.org"
      target="_blank"
      rel="noopener noreferrer">my data</a>.</p>
      <p></p>
      <p></p>
    </div>
  )
}

// {user === null && <Intro />}

const Main = ({user, shoes, change, setChange}) => {
  return(
    <main>
      {user === null ?
        <Intro /> :
        <DataDisplay user={user} shoes={shoes} change={change} setChange={setChange}/>
      }


    </main>
  )
}

function App() {
  const [user, setUser] = useState(null)
  const [shoes, setShoes] = useState([])
  const [change, setChange] = useState(false)

  return (
    <div className="App">
      <Header logo={logo} user={user} setUser={setUser} shoes={shoes} setShoes={setShoes} change={change} setChange={setChange}/>
      <Main user={user} shoes={shoes} change={change} setChange={setChange}/>
    </div>
  );
}

export default App;
