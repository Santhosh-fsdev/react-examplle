import React, { useEffect, useState } from 'react';
import './App.css';


// -------- class component example ------------




class App extends React.Component {

  constructor() {
    super();

    this.state = {
      name: 'hello'
    }
    this.submit = this.submit.bind(this);

  };

  submit = () => {
    console.log('hello world')
  }
  render() {

  
    return (
      <div className="App">
        <h1>{this.state.name}</h1>
        <button onClick={() => this.setState({ name: 'world' })}>click</button>
      </div>
    )
  }
}

// -----------functional component example -------------

// function App() {

//   const [name,setName] = useState('hello');

//   useEffect(()=>{
//     console.log('component can be found in the dom')
//   },[])

//   return (
//     <div className="App">
//       <h1>{name}</h1>
//       <button onClick={()=> setName('world')}>Click</button>
//     </div>

//   );
// }

export default App;
