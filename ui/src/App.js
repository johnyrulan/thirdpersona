import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload the app.
        </p>
        <a
          className="App-link"
          href="/dashboard"          
          rel="noopener noreferrer"
        >
          Learn React Now
        </a>
        <a
          className="App-link"
          href="/example/product"          
          rel="noopener noreferrer"
        >
          Example
        </a>
      </header>
    </div>
  );
}

export default App;
