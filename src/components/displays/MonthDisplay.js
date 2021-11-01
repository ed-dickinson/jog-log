import React, {useState} from 'react'
import dateFormatter from '../../services/dateFormatter'

const MonthDisplay = ({runs, shoes, metric}) => {

  const days_since_first = [];
  const now = new Date();

  const by_weeks = [[]];
  const by_months = [[]];

  let month_i = -1;
  let month = -1;

  let start_date = new Date(runs[runs.length-1].date)
  // start_date.setDate(start_date - start_date.getDate() + 1)

  for (let d = new Date(start_date.setDate(1)); d <= now; d.setDate(d.getDate() + 1)) {
  // for (let d = now; d >= new Date(runs[runs.length-1].date); d.setDate(d.getDate() - 1)) {

    const matched_run = runs.find(run =>
      new Date(run.date).toDateString() === new Date(d).toDateString()
    );

    let empty_day = {date: new Date(d)};
    // console.log(d.getDay(), d, ((now - d) / (3600000*24) / 7))
    // console.log(now.getDay())

    // let week = Math.floor((now - d) / ((3600000*24)) / 7)
    if (month !== new Date(d).getMonth()) {
      month_i++;
    }
    month = new Date(d).getMonth();
    // console.log(now.getDay(), d.getDay())

    //this could be an issue
    // if (now.getDay() >= d.getDay()) {week = week + 1; }
    // if (now.getDay() < d.getDay()) {week = week + 1; }
    // if (d.getDay() === 0) {week++} // SUNDAY > MONDAY
    // if (now.getDay() === 0) {week--}; //sorts out sunday forcing everything a week back

    //construct the week array
    if (by_months[month_i] === undefined) {by_months[month_i] = []}

    if (matched_run) {
      // console.log('match')
      matched_run.month = month;
      days_since_first.push(matched_run)

      //this shifts week start sunday > monday
      by_months[month_i][new Date(d).getDate()-1] = matched_run
    } else {
      // days_since_first.push(new Date(d));
      empty_day.month = month;
      empty_day.distance = 0;
      empty_day.elevation = 0;
      days_since_first.push(empty_day);

      by_months[month_i][new Date(d).getDate()-1] = empty_day
    }
  }

  // make fake days to pad out week
  // for (let i = 0; i < by_weeks[by_weeks.length-1].length; i++) {
  //   if (by_weeks[by_weeks.length-1][i] === undefined) {
  //     by_weeks[by_weeks.length-1][i] = {
  //       week: by_weeks[by_weeks.length-1][6].week, distance: 0, elevation: 0
  //     }
  //   }
  // }

  const reversed_days = days_since_first.sort(function(a,b){
    return new Date(b.date) - new Date(a.date);
  })

  by_months.reverse();

  const day_names = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const month_names = ["January","February","March","April","May","June","July",
        "August","September","October","November","December"];


  // by_weeks.forEach(week => {
  //
  // })

  // console.log(by_weeks)
  console.log(by_months)
  return(
    <div className="MonthDisplay">
      {by_months.map(by_month=>
        <div className="Month" key={by_month[0].month}>
        <div className="WeekLabel">
          <span style={{color:'orange', fontWeight:'bold'}}>
            {month_names[by_month[0].month]} [{by_month[0].month}]:
          </span>

          {(by_month.map(a=>a.distance).reduce((b,c)=>b+c)/(metric?0.62137:1)).toFixed(1)}{metric?'km':'mi'}
          <span style={{color:'orange'}}> —&nbsp;</span>
          {(by_month.map(a=>a.elevation).reduce((b,c)=>b+c)/(metric?3.2808:1)).toFixed(0)}{metric?'m':'ft'}
        </div>

          {by_month.map(by_day=>
            <span
              className="Day"
              style={{width: `${100 / by_month.length}%`}}
            >
              <div
                style={{borderBottom: `${by_day.distance*5}px solid black`}}
                className="Run"
              >
                <div style={{fontSize:0}}>
                  {new Date(by_day.date).getDate()}/{new Date(by_day.date).getMonth()}-
                  {day_names[new Date(by_day.date).getDay()]}(w{by_day.week})
                </div>
                {by_day.distance>0 &&
                  <div className="RunData">{metric?(by_day.distance/0.62137).toFixed(1):by_day.distance}{metric?'km':'mi'}</div>
                }

              </div>
            </span>
          )}
          {(by_month.map(a=>a.distance).reduce((b,c)=>b+c))===0?<div className="NoRuns">No runs this month<svg className="sad-face" viewBox="-1 -1 7 5" xmlns="http://www.w3.org/2000/svg"><path d='M 1 4 A 1 1 0 0 1 4 4 M 2 1 A 1 1 0 0 1 0 1 A 1 1 0 0 1 2 1 M 5 1 A 1 1 0 0 1 3 1 A 1 1 0 0 1 5 1'></path></svg></div>:''}
        </div>
      )}


    </div>
  )
}

export default MonthDisplay
