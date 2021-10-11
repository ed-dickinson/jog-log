import React, {useState, useEffect} from 'react'
import userService from '../services/user'
import dateFormatter from '../services/dateFormatter'


const DataDisplay = ({user, shoes}) => {

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

  }, [user.no])

  // console.log(shoes)

  return (
    <div className="DataDisplay AppBody">
      Your data:
      <div>{runs.length} runs total</div>
      {runs.map(run =>
        <div>
          <span>{dateFormatter.traditionalShort(run.date)} </span> -
          <span>{run.distance} miles</span> -
          <span>{run.elevation} ft</span> —
          <span>{run.shoe} {shoes[run.shoe]}</span>
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
