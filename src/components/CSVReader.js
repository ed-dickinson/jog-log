// DELETE THIS AND NPM REACT PAPA PARSE!


import React, { Component } from 'react';
import { CSVReader } from 'react-papaparse';

// export default class CSVReader1 extends Component<{setImportData?: setImportData}> {
//   handleOnDrop = (data) => {
//     console.log('---------------------------');
//     console.log(data);
//     console.log('---------------------------');
//     // setImportData(data)
//
//   };
//
//   handleOnError = (err, file, inputElem, reason) => {
//     console.log(err);
//   };
//
//   handleOnRemoveFile = (data) => {
//     console.log('---------------------------');
//     console.log(data);
//     console.log('---------------------------');
//   };
//
//   render() {
//     return (
//       <>            <br /><br />
//         <div className="FileDropper">
//         <CSVReader
//           onDrop={this.handleOnDrop}
//           onError={this.handleOnError}
//           addRemoveButton
//           onRemoveFile={this.handleOnRemoveFile}
//         >
//           <span>Drop .csv file here or click to upload.</span>
//         </CSVReader>
//         </div>
//       </>
//     );
//   }
// }

export default class CSVReader1 extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  handleOnDrop = (data) => {
    console.log('---------------------------');
    console.log(data);
    console.log('---------------------------');
    // setImportData(data)

  };

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  handleOnRemoveFile = (data) => {
    console.log('---------------------------');
    console.log(data);
    console.log('---------------------------');
  };

  render() {
    return (
      <>            <br /><br />
        <div className="FileDropper">
        <CSVReader
          onDrop={this.handleOnDrop}
          onError={this.handleOnError}
          addRemoveButton
          onRemoveFile={this.handleOnRemoveFile}
        >
          <span>Drop .csv file here or click to upload.</span>
        </CSVReader>
        </div>
      </>
    );
  }
}

// export default CSVReader1
