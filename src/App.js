import logo from './logo.svg';
import './App.css';
import Header from './components/Header'

const Form = (props) => {
  return(
    <div>
      <form>Distance:<input></input></form>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <Header logo={logo} />
    </div>
  );
}

export default App;
