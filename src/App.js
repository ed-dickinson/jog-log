import React, {useState} from 'react'
import logo from './logo.svg';
import './App.css';
import Header from './components/Header'
import DataDisplay from './components/DataDisplay'
import RegisterForm from './components/RegisterForm'

const Intro = ({setUser}) => {
  const [registerFormOpen, setRegisterFormOpen] = useState(false)

  const handleCreateAccountButton = () => {
    console.log('open create account form')
    setRegisterFormOpen(true)
  }

  const handleMyDataButton = () => {
    console.log('fill with my data')
    setUser({_id:"61506aff33e8e9d9cc18fec5",
  no: 1, name: "ed's data"})
  }

  return(
    <div className="IntroText AppBody">
      <h2>Hello!</h2>
      <div><svg className="hello-h2" viewBox="-1 -2 21 8" xmlns="http://www.w3.org/2000/svg"><path d='M 0 0 L 0 4 M 0 2 L 3 2 M 3 0 L 3 4 M 6 4 L 4 4 L 4 0 L 6 0 M 4 2 L 6 2 M 7 0 L 7 4 L 9 4 M 10 0 L 10 4 L 12 4 M 12 2 A 1 1 0 0 0 16 2 A 1 1 0 0 0 12 2 M 17 4 A 1 1 0 0 0 19 4 A 1 1 0 0 0 17 4 M 18 2 L 18 -2'></path></svg></div>
      <p>...and welcome to Jog Log, where you can meet all — or at least some — of your jog logging needs.</p>
      <p> Like everyone else, for a long time I used Strava, but I became more and more uneasy about putting the data of my natural body's movements in the hands of a somewhat faceless enterprise. Half out of a genuine fear of not-knowing what their intentions are — and half for the simple principle of it.</p>
      <p>Plus, I'm fed up of running with a Garmin watch — keeping it charged and worrying about pausing for to long if I want to take a moment to appreciate some beautiful vista. But I do still like keeping track of how far, and how often, I've run, so I wanted to make a way to do just that. And you're welcome to use it as well.</p>
      <p>So <span onClick={handleCreateAccountButton} className="FakeA">create an account</span> or have a look at it with <span onClick={handleMyDataButton} className="FakeA">my data</span>.</p>
      {registerFormOpen && <RegisterForm />}
      <p></p>
      <p></p>
    </div>
  )
}

// {user === null && <Intro />}

const Main = ({user, setUser, shoes, change, setChange, metric}) => {
  return(
    <main>
      {user === null ?
        <Intro setUser={setUser} /> :
        <DataDisplay user={user} shoes={shoes} change={change} setChange={setChange} metric={metric}/>
      }


    </main>
  )
}

function App() {
  const [user, setUser] = useState(null)
  const [shoes, setShoes] = useState([])
  const [change, setChange] = useState(false)
  const [metric, setMetric] = useState(false)

  return (
    <div className="App">
      <Header logo={logo} user={user} setUser={setUser} shoes={shoes} setShoes={setShoes} change={change} setChange={setChange} metric={metric} setMetric={setMetric}/>
      <Main user={user} setUser={setUser} shoes={shoes} change={change} setChange={setChange} metric={metric}/>
    </div>
  );
}

export default App;
