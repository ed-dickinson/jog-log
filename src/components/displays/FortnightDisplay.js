import React, {useState} from 'react'
import dateFormatter from '../../services/dateFormatter'

const WeekDisplay = ({runs, shoes, metric}) => {

  const days_since_first = [];
  const now = new Date();

  const by_weeks = [[]];

  for (let d = new Date(runs[runs.length-1].date); d <= now; d.setDate(d.getDate() + 1)) {
  // for (let d = now; d >= new Date(runs[runs.length-1].date); d.setDate(d.getDate() - 1)) {

    const matched_run = runs.find(run =>
      new Date(run.date).toDateString() === new Date(d).toDateString()
    );

    let empty_day = {date: new Date(d)};
    // console.log(d.getDay(), d, ((now - d) / (3600000*24) / 7))
    // console.log(now.getDay())

    let week = Math.floor((now - d) / ((3600000*24)) / 7)
    // console.log(now.getDay(), d.getDay())

    //this could be an issue
    // if (now.getDay() >= d.getDay()) {week = week + 1; }
    if (now.getDay() < d.getDay()) {week = week + 1; }
    if (d.getDay() === 0) {week++} // SUNDAY > MONDAY
    if (now.getDay() === 0) {week--}; //sorts out sunday forcing everything a week back

    //construct the week array
    if (by_weeks[week] === undefined) {by_weeks[week] = []}

    if (matched_run) {
      // console.log('match')
      matched_run.week = week;
      days_since_first.push(matched_run)

      //this shifts week start sunday > monday
      by_weeks[week][d.getDay()===0?6:d.getDay()-1] = matched_run
    } else {
      // days_since_first.push(new Date(d));
      empty_day.week = week;
      empty_day.distance = 0;
      empty_day.elevation = 0;
      days_since_first.push(empty_day);

      by_weeks[week][d.getDay()===0?6:d.getDay()-1] = empty_day
    }
  }

  // make fake days to pad out week
  for (let i = 0; i < by_weeks[by_weeks.length-1].length; i++) {
    if (by_weeks[by_weeks.length-1][i] === undefined) {
      by_weeks[by_weeks.length-1][i] = {
        week: by_weeks[by_weeks.length-1][6].week, distance: 0, elevation: 0
      }
    }
  }

  const reversed_days = days_since_first.sort(function(a,b){
    return new Date(b.date) - new Date(a.date);
  })

  const day_names = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  const by_fortnights = [];

  for (let i = 0; i < by_weeks.length; i++) {
    if (i%2!==1) {
      let blank_week = [];
      for (let j = 0; j <= 6; j++) {
        blank_week[j] = {week: i+1, distance: 0, elevation: 0};
      }
      let first_week = (by_weeks[i+1]===undefined)?blank_week:by_weeks[i+1];

      by_fortnights[i] = first_week.concat(by_weeks[i])
    }
  }

  // by_weeks.forEach(week => {
  //
  // })

  // console.log(by_weeks)
  console.log(by_fortnights)
  return(
    <div className="FortnightDisplay">
      {by_fortnights.map(by_week=>
        <div className="Week" key={by_week.week}>
        <div className="WeekLabel">
          <span style={{color:'orange', fontWeight:'bold'}}>
            WK{by_week[0].week}&{by_week[0].week+1}:&nbsp;
          </span>
          <span className="WeekDate">
            ({dateFormatter.traditionalShort(by_week[0].date)} - {by_week[13]?dateFormatter.traditionalShort(by_week[13].date):'— '})
          </span>
          {(by_week.map(a=>a.distance).reduce((b,c)=>b+c)/(metric?0.62137:1)).toFixed(1)}{metric?'km':'mi'}
          <span style={{color:'orange'}}> —&nbsp;</span>
          {(by_week.map(a=>a.elevation).reduce((b,c)=>b+c)/(metric?3.2808:1)).toFixed(0)}{metric?'m':'ft'}
        </div>

          {by_week.map(by_day=>
            <span className="Day">
              <div
                style={{borderBottom: `${by_day.distance*5}px solid black`}}
                className="Run"
              >
                <div style={{fontSize:0}}>
                  {new Date(by_day.date).getDate()}/{new Date(by_day.date).getMonth()}-
                  {day_names[new Date(by_day.date).getDay()]}(w{by_day.week})
                </div>
                {by_day.distance>0 &&
                <div className="RunData">{metric?(by_day.distance/0.62137).toFixed(1):by_day.distance}{metric?'km':'mi'}</div>}

              </div>
            </span>
          )}
          {(by_week.map(a=>a.distance).reduce((b,c)=>b+c))===0?<div className="NoRuns">No runs this fortnight<svg className="sad-face" viewBox="-1 -1 7 5" xmlns="http://www.w3.org/2000/svg"><path d='M 1 4 A 1 1 0 0 1 4 4 M 2 1 A 1 1 0 0 1 0 1 A 1 1 0 0 1 2 1 M 5 1 A 1 1 0 0 1 3 1 A 1 1 0 0 1 5 1'></path></svg></div>:''}
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

    </div>
  )
}

export default WeekDisplay
