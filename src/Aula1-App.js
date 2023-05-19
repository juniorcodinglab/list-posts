import './App.css';
import { Component } from 'react';

class App extends Component {

  constructor(props) {
    super(props);
    // Fazendo com que o this a ser usado na função handlePClick seja o mesmo this do construtor
    this.handlePClick = this.handlePClick.bind(this);
    
    this.state = {
      name: "Silvio Cesar",
      counter: 0
    };
  }

  handlePClick() {
    const { name } = this.state;
    // Quando o stato muda, a função handle será chamado novamente
    this.setState({ name: "Flávio" }); 
    
    console.log(`<p> clicado: ${name}`);
  }

  // Arrow Funcion não tem ths dentro dela, então não precisa setar bind para ela
  handleAClick = (e) => {
    e.preventDefault();
    const  { counter } = this.state;
    this.setState({ counter: counter + 1});
  }

  render() {
    const { name, counter } = this.state; // Mesma coisa que this.state.name

    return (
      <div className="App">
        
      </div>
    )
  }
}

/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/
export default App;
