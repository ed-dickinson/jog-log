import React, {useState, useEffect} from 'react'
import userService from '../services/user'
import dateFormatter from '../services/dateFormatter'
import WeekDisplay from './displays/WeekDisplay'

const DisplaySelector = ({displayType, setDisplayType}) => {
  const displayTypes = ['Text', 'Week', 'Fortnight', 'Month', 'None']
  return (
    <div className="DisplaySelector">
      {displayTypes.map(type =>
        <span
        className={`${displayType===type&&'selected'}`}
        onClick={() => setDisplayType(type)}
        >{type}</span>
      )}
    </div>
  )
}

const TextDisplay = ({runs, shoes, metric}) => {

  return(
    <div>
      {runs.map(run =>
        <div key={run.no} className="TextDisplayRun">
          <span>{dateFormatter.traditionalShort(run.date)}</span>
          <span>{metric?(run.distance/0.62137).toFixed(1):run.distance} {metric?'km':'miles'}</span>
          <span>{metric?(run.elevation/3.2808).toFixed(0):run.elevation} {metric?'m':'ft'}</span>
          <span>{shoes.find(shoe => shoe.no === run.shoe).name} ({run.shoe})</span>
          <div className="Description"> &nbsp; {run.description}</div>
        </div>

      )}
    </div>
  )
}




const DataDisplay = ({user, shoes, reRender, setReRender, change, setChange, metric}) => {

  const [runs, setRuns] = useState([])
  const [displayType, setDisplayType] = useState('Text')

  // const handleDisplayTypeChange = () => {
  //
  // }

  const getRuns = async (userNo) => {
    try {
      const response = await userService.getRuns(userNo)
      setRuns(response.runs)
      // console.log(response.runs)
    } catch (exeption) {
      console.log('summin wrong')
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

  // console.log(shoes)

  return (
    <div className="DataDisplay AppBody">

      <div><strong>Your data:</strong> {runs.length} runs total, since {runs[0]?dateFormatter.traditionalShort(runs[0].date):''}</div><br />
      <DisplaySelector displayType={displayType} setDisplayType={setDisplayType} />

      {displayType === "Text" && <TextDisplay runs={sortedRuns} shoes={shoes} metric={metric}/>}
      {displayType === "Week" && <WeekDisplay runs={sortedRuns} shoes={shoes}/>}


    </div>
  )
}

export default DataDisplay
