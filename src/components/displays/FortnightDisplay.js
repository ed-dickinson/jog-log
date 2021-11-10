import React, {useState} from 'react'
import dateFormatter from '../../services/dateFormatter'

const FortnightDisplay = ({runs, shoes, metric}) => {

  const [loaded, setLoaded] = useState({state: 1, all: false})

  const now = new Date();

  const mondayise = (day) => {
    let new_day = day === 0 ? 6 : day - 1;
    return new_day
  }

  const getRuns = offset => {
    let now2 = new Date(now)
    let current_day = mondayise(now2.getDay())
    const weeks_to_grab = 26
    // 0 is sunday, 1 is monday

    let week_array = []

    for (let i = 0; i < weeks_to_grab; i++) {
      let current_week = {week: 0, distance: 0, elevation: 0, by_days:[], longest: 0, start_date: undefined}
      let start_date = new Date(now)

      start_date.setDate(now.getDate() - (current_day + 7) - ((offset * weeks_to_grab * 14) + (i * 14)))
      start_date.setHours(0)
      start_date.setMinutes(0)
      start_date.setSeconds(0)

      current_week.start_date = start_date
      current_week.week = (offset * weeks_to_grab) + i

      let end_date = new Date(start_date)
      end_date.setDate(start_date.getDate() + 14)

      runs.forEach(run => {
        const date = new Date(run.date)
        if (date > start_date && date < end_date) {

          current_week.distance += run.distance
          current_week.elevation += run.elevation
          run.day = mondayise(date.getDay())

          if (date - start_date > end_date - date) {
            run.day += 7
            console.log(run)
          }

          current_week.by_days[mondayise(date.getDay())] = run

          if (current_week.longest < run.distance) {
            current_week.longest = run.distance
          }
        }
      })
      week_array.push(current_week)
    }

    return week_array
  }

  let first_load_weeks = getRuns(0)
  const [byWeeks, setByWeeks] = useState(first_load_weeks)



  const handleLoadMore = () => {
    let next_runs = getRuns(loaded.state)
    setByWeeks(byWeeks.concat(next_runs))
    setLoaded({...loaded, state: loaded.state + 1})
  }

  const day_names = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const month_names = ["January","February","March","April","May","June","July",
        "August","September","October","November","December"];

  return(
    <div className="FortnightDisplay">

      {byWeeks.map(by_week =>
        <div className="Week" key={by_week.week}>

          <span style={{color:'orange', fontWeight:'bold'}}>
              {dateFormatter.traditionalShort(by_week.start_date)}
          </span>

          <span className="Stats">
            {(by_week.distance*(metric?1.6093:1)).toFixed(0)} {metric?'km':'mi'}
            <span style={{color:'orange'}}> —&nbsp;</span>
            {(by_week.elevation*(metric?0.3048:1)).toFixed(0)} {metric?'m':'ft'}
          </span>

          <div style={{height: `${by_week.longest*5}px`}}>
            {by_week.by_days.map(by_day =>
              <span className="Day" key={by_day.day}style={{
                height: `${by_day.distance*5}px`,
                left: `${(by_day.day)/14*100}%`,
                width: `${90/14}%`
              }}>

                <span className="RunInfo">
                  {(by_day.distance*(metric?1.6093:1)).toFixed(1)}{metric?'km':'mi'}
                  <span className="RunInfoFixed">
                    {(by_day.description)}
                    <span className="HoverDate">{day_names[by_day.day>6?by_day.day-7:by_day.day]} {dateFormatter.traditionalShort(by_day.date)}</span>
                  </span>
                </span>

              </span>
            )}
          </div>

          {by_week.distance===0?<div className="NoRuns">No runs this fortnight<svg className="sad-face" viewBox="-1 -1 7 5" xmlns="http://www.w3.org/2000/svg"><path d='M 1 4 A 1 1 0 0 1 4 4 M 2 1 A 1 1 0 0 1 0 1 A 1 1 0 0 1 2 1 M 5 1 A 1 1 0 0 1 3 1 A 1 1 0 0 1 5 1'></path></svg></div>:''}

        </div>
      )}


      {(!loaded.all) &&
        <div className="LoadMore">
          <svg onClick={handleLoadMore} className="load-more" viewBox="-1 -1 6 7" xmlns="http://www.w3.org/2000/svg"><path d='M 4 2 A 1 1 0 0 1 0 2 M 0 0 L 2 2 L 4 0'></path></svg>
        </div>
      }


    </div>
  )
}

export default FortnightDisplay
