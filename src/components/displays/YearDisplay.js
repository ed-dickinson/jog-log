import React from 'react'

const months = ["January","February","March","April","May","June","July",
      "August","September","October","November","December"];

const YearDisplay = ({runs, shoes, metric}) => {

  const by_years = []

  const now = new Date();

  runs.forEach(run => {
    const month = new Date(run.date).getMonth()
    const year_index = now.getFullYear() - (new Date(run.date).getFullYear())

    if (by_years[year_index] === undefined) {
      by_years[year_index] = {year: (new Date(run.date).getFullYear()), distance: 0, elevation: 0, by_months: []}
    }
    by_years[year_index].distance += run.distance
    by_years[year_index].elevation += run.elevation

    if (by_years[year_index].by_months[month] === undefined) {
      by_years[year_index].by_months[month] = run.distance
    } else {
      by_years[year_index].by_months[month] += run.distance
    }

  })

  return(
    <div className="YearDisplay">
      {by_years.map(by_year=>
        <div className="Year" key={by_year.year}
          style={{borderBottom: `${3 + Math.round(by_year.distance/10)}px solid orange`}}
        >
          <div className="YearLabel">
            <span style={{color:'orange', fontWeight:'bold'}}>
              {by_year.year}
            </span>

            <span className="Stats">
              {(by_year.distance*(metric?1.6093:1)).toFixed(0)} {metric?'km':'mi'}
              <span style={{color:'orange'}}> —&nbsp;</span>
              {(by_year.elevation*(metric?0.3048:1)).toFixed(0)} {metric?'m':'ft'}
            </span>
          </div>

          <div style={{height: `${by_year.by_months.reduce(function(a,b){return Math.max(a, b);},0)}px`}}>
            {by_year.by_months.map(by_month=>
              <span className="Month" key={by_month.month}
                style={{
                  height: `${by_month}px`,
                  left: `${by_year.by_months.indexOf(by_month)/12*100}%`,
                }}>

                <span className="MonthInfo">
                  {months[by_year.by_months.indexOf(by_month)]}
                  <span className="MonthInfo2">
                    {(by_month*(metric?1.6093:1)).toFixed(0)}{metric?'km':'mi'}
                  </span>
                </span>

              </span>

            )}
          </div>

        </div>
      )}


    </div>
  )
}


export default YearDisplay
