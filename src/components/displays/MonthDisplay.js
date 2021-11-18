import React, {useState} from 'react'
import dateFormatter from '../../services/dateFormatter'

const MonthDisplay = ({runs, shoes, metric}) => {

  const [loaded, setLoaded] = useState({state: 1, all: false})

  const now = new Date();


  const getRuns = offset => {
    let now2 = new Date(now)
    let end_date = new Date(now2.setFullYear(now.getFullYear() - offset))
    let start_date = new Date(now2.setFullYear(now.getFullYear() - offset - 1))
    let month_array = []
    for (let i = 0; i < 12; i++) {
      let month = end_date.getMonth() - i
      let year = end_date.getFullYear()
      let length = [3||5||8||10].some(x=>x===month) ? 30 : month === 1 ? 28 : 31;
      if (month < 0) { month += 12; year -= 1 }
      month_array[i] = {month: month, year: year, distance: 0, elevation: 0, by_days:[], longest: 0, length: length }
    }
    runs.forEach(run => {

      const date = new Date(run.date)
      if (date > start_date && date < end_date) {
        console.log(date)
        let month_index = end_date.getMonth() - date.getMonth()
        if (month_index < 0) {month_index += 12}
        month_array[month_index].distance += run.distance
        month_array[month_index].elevation += run.elevation
        run.day = date.getDate() -1
        month_array[month_index].by_days[date.getDate()] = run

        if (month_array[month_index].longest < run.distance) {
          month_array[month_index].longest = run.distance
        }
      }

    })

    return month_array
  }

  let first_load_months = getRuns(0)
  const [byMonths, setByMonths] = useState(first_load_months)



  const handleLoadMore = () => {
    let next_runs = getRuns(loaded.state)
    setByMonths(byMonths.concat(next_runs))
    setLoaded({...loaded, state: loaded.state + 1})
  }

  const month_names = ["January","February","March","April","May","June","July",
        "August","September","October","November","December"];

  return(
    <div className="MonthDisplay">
      {byMonths.map(by_month =>
        <div className="Month"
          key={byMonths.indexOf(by_month)}
          style={{borderBottom: `${3 + Math.round(by_month.distance/4)}px solid orange`}}
        >
          <span style={{color:'orange', fontWeight:'bold'}}>
          {month_names[by_month.month]} '{by_month.year.toString().slice(2)}</span>

          <span className="MonthStats">
            {(by_month.distance*(metric?1.6093:1)).toFixed(0)} {metric?'km':'mi'}
            <span style={{color:'orange'}}> —&nbsp;</span>
            {(by_month.elevation*(metric?0.3048:1)).toFixed(0)} {metric?'m':'ft'}
          </span>

          <div style={{height: `${by_month.longest*5}px`}}>
            {by_month.by_days.map(by_day =>
              <span className="Day" style={{
                height: `${by_day.distance*5}px`,
                left: `${(by_day.day)/by_month.length*100}%`,
                width: `${90/by_month.length}%`
              }}>

                <span className="RunInfo">
                  {(by_day.distance*(metric?1.6093:1)).toFixed(1)}{metric?'km':'mi'}
                  <span className="RunInfoFixed">
                    {(by_day.description)}
                    <span className="RunInfoFixedDate">
                      {(dateFormatter.dayAndDate(new Date(by_day.date)))}
                    </span>
                  </span>
                </span>

              </span>
            )}
          </div>

          {by_month.distance===0?<div className="NoRuns">No runs this month<svg className="sad-face" viewBox="-1 -1 7 5" xmlns="http://www.w3.org/2000/svg"><path d='M 1 4 A 1 1 0 0 1 4 4 M 2 1 A 1 1 0 0 1 0 1 A 1 1 0 0 1 2 1 M 5 1 A 1 1 0 0 1 3 1 A 1 1 0 0 1 5 1'></path></svg></div>:''}

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

export default MonthDisplay
