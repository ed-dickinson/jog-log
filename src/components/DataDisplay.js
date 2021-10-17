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

const WeekDisplay = ({runs, shoes, metric}) => {

  const days_since_first = [];
  const now = new Date();

  const by_weeks = [[]];

  for (let d = new Date(runs[runs.length-1].date); d <= now; d.setDate(d.getDate() + 1)) {
  // for (let d = now; d >= new Date(runs[runs.length-1].date); d.setDate(d.getDate() - 1)) {

    const matched_run = runs.find(run =>
      new Date(run.date).toDateString() === new Date(d).toDateString()
    );



    // let matched_run = undefined;
    // runs.forEach(run => {
    //   if (new Date(run.date).toDateString() === new Date(d).toDateString()) {
    //     console.log(run)
    //     matched_run = run
    //   }
    //   console.log(new Date(d).toLocaleDateString(), new Date(run.date).toLocaleDateString())
    // })

    let empty_day = {date: new Date(d)};
    // console.log(d.getDay(), d, ((now - d) / (3600000*24) / 7))
    // console.log(now.getDay())

    let week = Math.floor((now - d) / ((3600000*24)) / 7)
    // console.log(now.getDay(), d.getDay())

    //this could be an issue
    if (now.getDay() >= d.getDay()) {week = week - 0; }

    //construct the week array
    if (by_weeks[week] === undefined) {by_weeks[week] = []}

    if (matched_run) {
      // console.log('match')
      matched_run.week = week;
      days_since_first.push(matched_run)

      by_weeks[week][d.getDay()] = matched_run
    } else {
      // days_since_first.push(new Date(d));
      empty_day.week = week;
      empty_day.distance = 0;
      empty_day.elevation = 0;
      days_since_first.push(empty_day);

      by_weeks[week][d.getDay()] = empty_day
    }
  }

  const reversed_days = days_since_first.sort(function(a,b){
    return new Date(b.date) - new Date(a.date);
  })

  const day_names = ['Mon','Tue','Wed','Thur','Fri','Sat','Sun'];

  console.log(by_weeks)

  return(
    <div className="WeekDisplay">
      {by_weeks.map(by_week=>
        <div className="Week">
          <div>
            <span style={{color:'orange'}}>WK{by_week[0].week}:&nbsp;</span>
            {by_week.map(a=>a.distance).reduce((b,c)=>b+c)}mi
            <span style={{color:'orange'}}> —&nbsp;</span>
            {by_week.map(a=>a.elevation).reduce((b,c)=>b+c)}ft
          </div>
          {by_week.map(by_day=>
            <span className="Day">
              <div
                style={{borderBottom: `${by_day.distance*5}px solid black`}}
                className="Run"
              >
                {day_names[new Date(by_day.date).getDay()]}({by_day.distance})-wk{by_day.week}
              </div>
            </span>
          )}
        </div>
      )}
      {reversed_days.map(day=>
        <div>
          {day.week} -
          {new Date(day.date).toDateString()} {new Date(day.date).toLocaleDateString()}
          {day._id ?
            <span> - {day.distance} miles</span>
            : ''
          }
        </div>)}
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
