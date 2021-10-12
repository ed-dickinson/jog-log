import React, {useState, useEffect} from 'react'
import userService from '../services/user'
import dateFormatter from '../services/dateFormatter'

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

const TextDisplay = ({runs, shoes}) => {
  return(
    <div>
      {runs.map(run =>
        <div key={run.no} className="TextDisplayRun">
          <span>{dateFormatter.traditionalShort(run.date)}</span>
          <span>{run.distance} miles</span>
          <span>{run.elevation} ft</span>
          <span>{shoes.find(shoe => shoe.no === run.shoe).name} ({run.shoe})</span>
          <div className="Description"> &nbsp; {run.description}</div>
        </div>

      )}
    </div>
  )
}

const WeekDisplay = ({runs, shoes}) => {
  return(
    <div>
      {runs.map(run =>
        <div key={run.no} className="TextDisplayRun">
          <span>{dateFormatter.traditionalShort(run.date)}</span>

          <span>{run.distance} miles</span>
          <span>{run.elevation} ft</span>
          <span>{shoes.find(shoe => shoe.no === run.shoe).name} ({run.shoe})</span>
          <div className="Description"> &nbsp; {run.description}</div>
        </div>

      )}
    </div>
  )
}


const DataDisplay = ({user, shoes, reRender, setReRender, change, setChange}) => {

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
    // console.log(runs)

  }, [user.no, change])

  // console.log(shoes)

  return (
    <div className="DataDisplay AppBody">

      <div><strong>Your data:</strong> {runs.length} runs total</div><br />
      <DisplaySelector displayType={displayType} setDisplayType={setDisplayType} />

      {displayType === "Text" && <TextDisplay runs={runs} shoes={shoes}/>}
      {displayType === "Week" && <WeekDisplay runs={runs} shoes={shoes}/>}


    </div>
  )
}

export default DataDisplay
