import React, {useState} from 'react'
import dateFormatter from '../../services/dateFormatter'

const OrangeDash = () => {
  return(
    <span style={{color:'orange',fontWeight:900}}>—</span>
  )
}

const OrangeHalfDash = () => {
  return(
    <span style={{color:'orange',fontWeight:900}}>-</span>
  )
}

const StatDisplay = ({runs, shoes, metric}) => {

  let longest_runs = runs;

  longest_runs.sort(function(a, b){return b.distance-a.distance});



  const [loadedLong, setLoadedLong] = useState({state: 1, all: false})
  const handleLoadMoreLong = () => {
    setLoadedLong({state: loadedLong.state + 1, all: false})
  }

  const top_longest_runs = longest_runs.slice(0,loadedLong.state*10)

  let vertest_runs = runs;

  vertest_runs.sort(function(a, b){return b.elevation-a.elevation});

  const [loadedVert, setLoadedVert] =useState({state:1, all: false})
  const handleLoadMoreVert = () => {
    setLoadedVert({state: loadedVert.state + 1, all: false})
  }

  const top_vertest_runs = vertest_runs.slice(0,loadedVert.state*10)

  // let avg_runs = runs;

  // let avg_run = avg_runs.reduce(function(a,b){return a.distance+b.distance},0);

  let total_distance = 0;
  let total_elevation = 0;

  for (let i = 0; i < runs.length; i++) {
    total_distance += runs[i].distance;
    total_elevation += runs[i].elevation;
  }

  let avg_run = total_distance / runs.length

  const everests = total_elevation / 29031.7;

  const equators = total_distance / 24901.461;

  let sort_shoes = shoes;

  let sort_shoes_date = shoes;

  if (typeof shoes !== undefined) {
    sort_shoes.sort(function(a, b){return b.distance-a.distance})
    sort_shoes_date.sort(function(a, b){return b.date-a.date})
  }

  return(
    <div className="StatDisplay">

    <div className="Block">
      <div className="Heading">Stats:</div>

      <div>Average run distance <OrangeDash /> <strong>{(avg_run*(metric?1.6093:1)).toFixed(1)} {metric?'km':'mi'}</strong></div>
      <br />
      <div>All-time run distance <OrangeDash /> <strong>{(total_distance*(metric?1.6093:1)).toFixed(0)} {metric?'km':'mi'}</strong> ({equators.toFixed(2)} Laps of the Equator)</div>
      <div>All-time run elevation <OrangeDash /> <strong>{(total_elevation*(metric?0.3048:1)).toFixed(0)} {metric?'m':'ft'}</strong> ({everests.toFixed(1)} Everests)</div>
      <br />
      {typeof shoes !== undefined ?
        <div className="ShoeStats">
        <div>Shoes worn furthest <OrangeDash /> <strong>"{sort_shoes[0].name}" <OrangeHalfDash /> {(sort_shoes[0].distance*(metric?1.6093:1)).toFixed(1)} {metric?'km':'mi'}</strong></div>
        <div>Shoes had longest <OrangeDash /> <strong>"{sort_shoes_date[sort_shoes_date.length-1].name}" <OrangeHalfDash /> owned since {dateFormatter.traditional(sort_shoes_date[sort_shoes_date.length-1].date)}</strong></div>
        </div>
      :
        <div>No shoe stats</div>
      }

    </div>

      <div className="Records Block">
        <div className="Heading">Longest Runs:</div>

        {top_longest_runs.map(run =>
          <div className="Record" key={run.no}><span className="RecordStat">{(run.distance*(metric?1.6093:1)).toFixed(1)} {metric?'km':'mi'}</span> <OrangeDash /> <span className="RecordTitle">{run.no > 1000000 ? <a href={`https://www.strava.com/activities/${run.no}`}>{run.description}</a> : run.description}</span>  <span className="Date"><OrangeDash /> {dateFormatter.traditionalShort(run.date)}</span>

          </div>
        )}

        {(!loadedLong.all) &&
          <div className="LoadMore">
            <svg onClick={handleLoadMoreLong} className="load-more" viewBox="-1 -1 6 7" xmlns="http://www.w3.org/2000/svg"><path d='M 4 2 A 1 1 0 0 1 0 2 M 0 0 L 2 2 L 4 0'></path></svg>
          </div>
        }
      </div>

      <div className="Records Block">
        <div className="Heading">Climbiest Runs:</div>

        {top_vertest_runs.map(run =>
          <div className="Record" key={run.no}><span className="RecordStat">{(run.elevation*(metric?0.3048:1)).toFixed(0)} {metric?'m':'ft'}</span> <OrangeDash /> <span className="RecordTitle">{run.no > 1000000 ? <a href={`https://www.strava.com/activities/${run.no}`}>{run.description}</a> : run.description}</span> <span className="Date"><OrangeDash /> {dateFormatter.traditionalShort(run.date)}</span></div>
        )}

        {(!loadedVert.all) &&
          <div className="LoadMore">
            <svg onClick={handleLoadMoreVert} className="load-more" viewBox="-1 -1 6 7" xmlns="http://www.w3.org/2000/svg"><path d='M 4 2 A 1 1 0 0 1 0 2 M 0 0 L 2 2 L 4 0'></path></svg>
          </div>
        }

        </div>

    </div>
  )
}

export default StatDisplay
