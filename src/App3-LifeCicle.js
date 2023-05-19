import { clear } from '@testing-library/user-event/dist/clear';
import './App.css';
import { Component } from 'react';


/**
  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
  * CICLO DE VIDA DO COMPONENTE 
  * https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/
  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 */
class App extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      posts: [
        {
          id: 1,
          title: 'Título',
          body: "Corpo...."
        },{
          id: 2,
          title: 'Título 2',
          body: "Corpo 2...."
        },{
          id: 3,
          title: 'Título 3',
          body: "Corpo 3...."
        }
      ],
      counter: 0,
    };
  };

  timeoutUpdate = null;

  componentDidMount() {
    this.handleTimeout();
  }

  componentDidUpdate(prevProps) {
    this.handleTimeout();
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutUpdate)
  }

  handleTimeout() {
    const { posts, counter} = this.state;
    posts[0].title = 'O título mudou';

    this.timeoutUpdate = setTimeout(() => {
      this.setState({posts, counter: counter + 1});
    },1000)
  }

  render() {
    const { posts, counter } = this.state; // Mesma coisa que this.state.name

    return (
      <div className="App">
        <p>{counter}</p>
        {posts.map(post => (
          <div key={post.id} >
            <h1>{post.title}</h1>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    );
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
