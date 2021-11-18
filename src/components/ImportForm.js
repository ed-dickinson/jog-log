import React, { useState, useRef } from 'react'
// import CSVReader1 from './CSVReader'
import { FileDrop } from 'react-file-drop'
import Papa from 'papaparse'
import dateFormatter from '../services/dateFormatter'
import runService from '../services/run'

const CloseButton = ({action}) => {
  return(
    <span onClick={() => action(false)} className="CloseButton">
      <svg className="close-svg" viewBox="-1 -1 4 4" xmlns="http://www.w3.org/2000/svg"><path d='M 0 2 L 1 1 L 0 0 M 2 0 L 1 1 L 2 2'></path></svg>
    </span>
  )
}

const ImportForm = ({importFormOpen, setImportFormOpen, user, token, change, setChange}) => {

  const [importData, setImportData] = useState([])
  const [importRuns, setImportRuns] = useState([])
  const [fileDropMessage, setFileDropMessage] = useState('Now drop your file here!')
  const [fileUploaded, setFileUploaded] = useState(false)
  const [importStats, setImportStats] = useState({distance: 0, shoes: []})
  const [importProgress, setImportProgress] = useState(null)
  // const [currentlyImporting, setCurrentlyImporting] = useState(null)

  const handleFileDrop = (files, event) => {
    setFileUploaded(true);
    console.log('onDrop!', files, event);
    setFileDropMessage(`${files[0].name} (${(files[0].size/1000).toFixed(0)}KB)`)
    parseFile(files[0])
  }

  // click on file drop stuff
  const fileInputRef = useRef(null);
  const onTargetClick = () => {
    fileInputRef.current.click()
  }
  const onFileInputChange = (event) => {
    const { files } = event.target;
    // do something with your files...
    handleFileDrop(files, event)
    // console.log(files)
  }

  const parseFile = file => {
    Papa.parse(file, {
      header: true,
      complete: results => {
        console.log(results)
        setImportData(results.data)
        let runScrape = []
        let distance = 0;
        let shoes = [];
        results.data.forEach(activity => {
          if (activity['Activity Type'] === 'Run') {
            runScrape.push(activity)
            if (!shoes.includes(activity['Gear'])) {shoes.push(activity['Gear'])}
            distance += (activity['Distance']/1609.344)
          }
        })
        setImportRuns(runScrape)
        setImportStats({distance, shoes})
      }
    });
  }

  const doImport = async (run) => {
    // event.preventDefault();

    let runDetails = {
      user: user.no,
      no: run['Activity ID'],
      shoe: run['Gear'],
      distance: (run['Distance']/1609.34).toFixed(2),
      elevation: (run['Elevation Gain']*3.2808).toFixed(0),
      date: new Date(run['Activity Date']),
      description: run['Activity Name'],
      // imported: 'Strava',
    }

    try {
      const response = await runService.importNew({
        token: token,
        formBody: runDetails,
      })
      console.log(response)
      let i = importRuns.indexOf(run)

      setImportProgress([i+1, importRuns.length, `Importing: ${run['Activity Name']}`])
      if (i+1 === importRuns.length) {
        console.log('done2!')
        setImportProgress([i+1, importRuns.length, 'Done!'])
      }
    } catch (exception) {
      console.log('summin wrong')
      setTimeout(() => {
        console.log('timeout')
      }, 5000)
    }
    console.log('done3!')
    setImportProgress([importRuns.length, importRuns.length, 'Done!'])
    setChange(!change)

  }

  const startImport = () => {

    console.log(importRuns)

    setImportProgress([0,importRuns.length, `Importing: ${importRuns[0]['Activity Name']}`])
    importRuns.forEach(run => {
      // let runDetails = {
      //   user: user.no,
      //   no: run['Activity ID'],
      //   shoe: run['Gear'],
      //   distance: (run['Distance']/1609.34).toFixed(2),
      //   elevation: (run['Elevation Gain']*3.2808).toFixed(0),
      //   date: new Date(run['Activity Date']),
      //   description: run['Activity Name'],
      // }
      // formattedRuns.push(runDetails)

      // let i = importRuns.indexOf(run)
      // setImportProgress([i+1, importRuns.length, run])

      // console.log(run)
      doImport(run);

    })
    console.log('done!')
    setImportProgress([importRuns.length,importRuns.length, `Done!`])
    // doImport(formattedRuns)

    // for (let i = 0; i < importRuns.length; i++) {
    //
    // }
  }


  // if (formOpen) {
  //distance and elevation are causing that red error
  return(
    <div className={importFormOpen ? "ImportForm" : "ImportForm hidden"}>

      <CloseButton action={setImportFormOpen} />
      <h3>Import your Runs</h3>

      <span className="ServiceName">Strava:</span> Okay. You're gonna need to get your runs into a .csv file for this. You can request a copy of your data from Strava, and they'll give you a .zip folder including a file named "activites.csv". This is the one you want.

      <div className='FileDrop'>
        <div className="ProgressBar">
          <div className={fileUploaded ? "done" : ""}>
          </div>
        </div>
        <FileDrop
            onFrameDragEnter={(event) => console.log('onFrameDragEnter', event)}
            onFrameDragLeave={(event) => console.log('onFrameDragLeave', event)}
            onFrameDrop={(event) => console.log('onFrameDrop', event)}
            onDragOver={(event) => console.log('onDragOver', event)}
            onDragLeave={(event) => console.log('onDragLeave', event)}
            onDrop={(files, event) => handleFileDrop(files,event)}
            onTargetClick={onTargetClick}
          >

            {fileDropMessage}
          </FileDrop>
          <input
            style={{display: 'none'}}
            onChange={onFileInputChange}
            ref={fileInputRef}
            type="file"
            className="hidden"
          />
        </div>

      {importData.length > 0 && <span>
        Out of {importData.length} activities in the file, <strong>{importRuns.length}</strong> of them are runs.

          {importRuns.length > 0 && <span>

            <br /><br />
            They stretch from <strong>{dateFormatter.tradCondensed(importRuns[0]['Activity Date'])}</strong> to <strong>{dateFormatter.tradCondensed(importRuns[importRuns.length-1]['Activity Date'])}</strong>: covering <strong>{importStats.distance.toFixed(0)}</strong> miles and going through <strong>{importStats.shoes.length}</strong> pairs of shoes.

            <br /> <br/>
            <div><span className="FakeA" onClick={startImport}>Import them?</span></div>
            {importProgress !== null &&
              <div>
                <div className="ImportProgressBar"><div>
                  <div className="Bar" style={{width: (importProgress[0] / importProgress[1] * 100) + '%'}}></div>
                  <div className="Label">{importProgress[0]} / {importProgress[1]}</div>
                </div></div>

                <div>{importProgress[2]}</div>
              </div>
            }
          </span>}


      </span>}





    </div>
  )
// } else {
//   return(<div>No form.</div>)
// }
}

// <CSVReader1 importData={importData} setImportData={setImportData}/>


export default ImportForm
