import React, {useState} from 'react'
import logo from './logo.svg';
import './App.css';
import Header from './components/Header'
import DataDisplay from './components/DataDisplay'
import RegisterForm from './components/RegisterForm'

const OnTheGoMap = ({iFrameOpen, setiFrameOpen}) => {

  const [iFrameHeight, setiFrameHeight] = useState(window.innerHeight - 16)

  return(
    <div id="OnTheGoMap" className={iFrameOpen === 'hidden' ? 'hidden' : 'shown'}>
      <iframe src="https://onthegomap.com/#/create" title="OnTheGoMap" height={iFrameHeight} width={window.innerWidth - 16}></iframe>
      <span className="iFrameControls">
        <span onClick={() => setiFrameOpen('hidden')} className="CloseButton">
          <svg className="close-svg" viewBox="-1 -1 4 4" xmlns="http://www.w3.org/2000/svg"><path d='M 0 2 L 1 1 L 0 0 M 2 0 L 1 1 L 2 2'></path></svg>
        </span>
        {iFrameHeight > window.innerHeight / 2 ?
          <span onClick={() => setiFrameHeight(window.innerHeight / 2)} className="ShrinkButton">
            <svg className="shrink-svg" viewBox="-1 -1 4 4" xmlns="http://www.w3.org/2000/svg"><path d='M 0 1.5 L 2 1.5'></path></svg>
          </span>
          :
          <span onClick={() => setiFrameHeight(window.innerHeight - 16)} className="GrowButton">
            <svg className="shrink-svg" viewBox="-1 -1 4 4" xmlns="http://www.w3.org/2000/svg"><path d='M 0 1.5 L 2 1.5 M 1 0.5 L 1 2.5'></path></svg>
          </span>
        }
      </span>

    </div>
  )
}

const Intro = ({setUser}) => {
  const [registerFormOpen, setRegisterFormOpen] = useState(false)

  const handleCreateAccountButton = () => {
    setRegisterFormOpen(true)
  }

  const handleMyDataButton = () => {
    setUser({_id:"61506aff33e8e9d9cc18fec5",
  no: 1, name: "ed's data"})
  }

  return(
    <div className="IntroText AppBody">
      <h2>Hello!</h2>
      <div><svg className="hello-h2" viewBox="-1 -2 21 8" xmlns="http://www.w3.org/2000/svg"><path d='M 0 0 L 0 4 M 0 2 L 3 2 M 3 0 L 3 4 M 6 4 L 4 4 L 4 0 L 6 0 M 4 2 L 6 2 M 7 0 L 7 4 L 9 4 M 10 0 L 10 4 L 12 4 M 12 2 A 1 1 0 0 0 16 2 A 1 1 0 0 0 12 2 M 17 4 A 1 1 0 0 0 19 4 A 1 1 0 0 0 17 4 M 18 2 L 18 -2'></path></svg></div>
      <p>...and welcome to Jog Log, where you can meet all — or at least some — of your jog logging needs.</p>
      <p>Like everyone else, for a long time I used Strava, but I became more and more uneasy about putting the data of my natural body's movements in the hands of a somewhat faceless and unknowable enterprise. There's a clear benefit to them — but what was I getting out of relentlessly uploading all this data? I was mindlessly cataloguing my running, and it was encroaching on the simple joy of it. Plus, I was fed up of running with a Garmin watch — keeping it charged and worrying about stopping for too long to appreciate some beautiful nook of the world.</p>
      <p>For a while I stopped tracking them at all, and let myself be less obsessive over it. But I did miss keeping track of how far, and how often I've run, and thought maybe I can make something to record the other things I get from running — the thoughts and feelings — the impressions and interactions. As, for me, that's a big part of running — to let my mind and body realign with the world around me.</p>
      <p>So I did just that. And you're welcome to use it as well.</p>
      <p><span onClick={handleCreateAccountButton} className="FakeA">Create an account</span> or have a look at it with <span onClick={handleMyDataButton} className="FakeA">my data</span>.</p>
      {registerFormOpen && <RegisterForm />}
      <p></p>
      <p></p>
    </div>
  )
}

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

  const [iFrameOpen, setiFrameOpen] = useState('closed')

  return (
    <div className="App">
      <Header logo={logo} user={user} setUser={setUser} shoes={shoes} setShoes={setShoes} change={change} setChange={setChange} metric={metric} setMetric={setMetric} setiFrameOpen={setiFrameOpen} />
      <Main user={user} setUser={setUser} shoes={shoes} change={change} setChange={setChange} metric={metric} />

      {// <div className="PlotLink" onClick={() => {setiFrameOpen(!iFrameOpen)}}>(Find your distance/elevation..i)</div>
      }

      {iFrameOpen !== 'closed' && <OnTheGoMap iFrameOpen={iFrameOpen} setiFrameOpen={setiFrameOpen}/>}
    </div>
  );
}

export default App;
