import React, {useState, useEffect} from 'react'
import userService from '../services/user'
import dateFormatter from '../services/dateFormatter'


const DataDisplay = ({user, shoes, reRender, setReRender, change, setChange}) => {

  const [runs, setRuns] = useState([])

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

  console.log(shoes)

  return (
    <div className="DataDisplay AppBody">
      Your data:
      <div>{runs.length} runs total</div>
      {runs.map(run =>
        <div key={run.no}>
          <span>{dateFormatter.traditionalShort(run.date)} </span> —
          <span>{run.distance} miles</span> —
          <span>{run.elevation} ft</span> —
          <span>{shoes.find(shoe => shoe.no === run.shoe).name} ({run.shoe})</span>
          <div> &nbsp; {run.description}</div>
        </div>

      )}
      {runs.forEach(run =>
        <div>{run.distance}</div>
      )}

    </div>
  )
}

export default DataDisplay
