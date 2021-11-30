import React, {useState, useEffect} from 'react'
import userService from '../services/user'
import dateFormatter from '../services/dateFormatter'
import WeekDisplay from './displays/WeekDisplay'
import FortnightDisplay from './displays/FortnightDisplay'
import MonthDisplay from './displays/MonthDisplay'
import YearDisplay from './displays/YearDisplay'
import StatDisplay from './displays/StatDisplay'

const LoadingAnimation = () => {
  return(
    <div className="LoadingAnim">
      <span>
        <svg className="loading" viewBox="-1 -1 4 4" xmlns="http://www.w3.org/2000/svg"><path d='M 2 1 A 1 1 0 0 1 0 1'></path></svg>
      </span>
    </div>
  )
}

const DisplaySelector = ({displayType, setDisplayType}) => {
  const displayTypes = ['List', 'Stats', 'Week', 'Fortnight', 'Month', 'Year', 'None']
  return (
    <div className="DisplaySelector">
      {displayTypes.map(type =>
        <span
          key={type}
          className={`${displayType===type&&'selected'}`}
          onClick={() => setDisplayType(type)}
        >{type}</span>
      )}
    </div>
  )
}

const TextDisplay = ({runs, shoes, metric}) => {

  //shoe func!
  //<span>{shoes.find(shoe => shoe.no === run.shoe).name} ({run.shoe})</span>

  return(
    <div>
      {runs.map(run =>
        <div key={run.no} className="TextDisplayRun"
          style={{borderBottom: `${3 + Math.round(run.distance*2)}px solid orange`}}
        >
          <span>{dateFormatter.traditionalShort(run.date)}</span>
          <span>{metric?(run.distance/0.62137).toFixed(1):run.distance} {metric?'km':'miles'}</span>
          <span>{metric?(run.elevation/3.2808).toFixed(0):run.elevation} {metric?'m':'ft'}</span>

          <div className="Description"> &nbsp; {run.description}</div>
        </div>

      )}
    </div>
  )
}



const DataDisplay = ({user, shoes, reRender, setReRender, change, setChange, metric}) => {

  const [runs, setRuns] = useState([])
  const [displayType, setDisplayType] = useState('List')
  const [loading, setLoading] = useState('')

  const getRuns = async (userNo) => {
    setLoading('loading')
    try {
      const response = await userService.getRuns(userNo)
      setLoading('loaded')
      setRuns(response.runs)

    } catch (exeption) {
      console.log('summin wrong')
      setLoading('failed')
      setTimeout(() => {
        console.log('timeout')
      }, 5000)
    }
  }

  useEffect(() => {
    getRuns(user.no)
  }, [user.no, change])

  const sortedRuns = runs.sort(function(a,b){
    return new Date(b.date) - new Date(a.date);
  })

  return (
    <div className="DataDisplay AppBody">

      <div><strong>Your data:</strong> {runs.length} runs total, since {runs[0]?dateFormatter.traditionalShort(runs[0].date):''}</div><br />
      <DisplaySelector displayType={displayType} setDisplayType={setDisplayType} />

      {loading === 'loading' && <LoadingAnimation />}

      {displayType === "List" && <TextDisplay runs={sortedRuns} shoes={shoes} metric={metric}/>}
      {displayType === "Week" && <WeekDisplay runs={sortedRuns} shoes={shoes} metric={metric}/>}
      {displayType === "Fortnight" && <FortnightDisplay runs={sortedRuns} shoes={shoes} metric={metric}/>}
      {displayType === "Month" && <MonthDisplay runs={sortedRuns} shoes={shoes} metric={metric}/>}
      {displayType === "Year" && <YearDisplay runs={sortedRuns} shoes={shoes} metric={metric}/>}
      {displayType === "Stats" && <StatDisplay runs={sortedRuns} shoes={shoes} metric={metric}/>}


    </div>
  )
}

export default DataDisplay
