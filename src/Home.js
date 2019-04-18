import React, { Component } from 'react';
import Publication from './Publication';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
        
    }
  }

  render() {
    console.log('Home')

    return (
      <div className="App">
      <Publication/>

      </div>
    );
  }
}
const style = {
  margin: 15,
};
export default App;