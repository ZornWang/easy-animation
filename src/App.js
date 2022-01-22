import React from 'react'
import './App.css';
import Coordinate from './modules/coordinate/Coordinate';
import Button from './modules/button/Button';
import Ball from './modules/ball/Ball';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transform: 'none'
    }
  }

  handleBallTransform(data) {
    this.setState({
      transform: data
    })
  }

  render() {
    return (
      <div className="App">
        <Coordinate />
        <Button ballTransfrom={(data) => this.handleBallTransform(data)} />
        <Ball ballTrans={this.state.transform} />
      </div>
    );
  }
}

export default App;
