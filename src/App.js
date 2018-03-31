import React, { Component } from 'react';
import './App.css';
import { formatElapsedTime } from './formatElapsedTime';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mainTimeInMS: 0,
      lapTimeInMS: 0,
      timerActive: false,
      timerId: null,
      lapTimes: []
    }
  } 

  handleStartStopResume = (event) => {

    if (event.target.value === 'Start') {
      const timerId = setInterval(this.timer, 10);
      this.setState({
        timerActive: true,
        timerId: timerId
      });
    } else if (event.target.value === 'Stop') {
      clearInterval(this.state.timerId);
      this.setState({
        timerActive: false,
        timerId: null
      });
    } else { // Resume
      const timerId = setInterval(this.timer, 10);
      this.setState({
        timerActive: true,
        timerId: timerId
      });
    }
  }

  timer = () => {
    this.setState((prevState) => ({
        mainTimeInMS: prevState.mainTimeInMS + 10,
        lapTimeInMS:  prevState.lapTimeInMS + 10 
      })
    );
  }

  // When lap is clicked, lap timer resets to 0 and
  // lap time and main time at button click are saved in an array
  handleLapSplit = () => {
    this.setState((prevState) => {
      return {
        lapTimeInMS: 0,
        lapTimes: [...prevState.lapTimes,
          {
            splitMainTime: prevState.mainTimeInMS,
            splitLapTime:  prevState.lapTimeInMS
          }
        ]
      };

    })
  }

  handleReset = () => {
    this.setState({
      mainTimeInMS: 0,
      lapTimeInMS: 0,
      lapTimes: []
    });
  }

  componentWillUnmount() {
    if(this.state.timerId) {
      clearInterval(this.state.timerId);
    }
  }

  render() {
    const {timerActive, mainTimeInMS, lapTimeInMS, lapTimes} = this.state;
    const mainTime = formatElapsedTime(mainTimeInMS);
    const lapTime = formatElapsedTime(lapTimeInMS);

    // stop  - timerActive is true
    // start - timerActive is false and mainTimeInMS is 0
    // resume - timerActive is false and mainTimeInMS is not 0 
    const btnVal = timerActive ? 'Stop'
      : (mainTimeInMS === 0 ? 'Start' : 'Resume');

    return (
      <div>
        <p className='main-time'>{mainTime}</p>
        <p className='lap-time'>{lapTime}</p>
        <button value={btnVal} onClick={this.handleStartStopResume}>
          {btnVal}
        </button>
        {timerActive &&
          <button onClick={this.handleLapSplit}>Lap</button>}
        { btnVal === 'Resume' &&
          <button onClick={this.handleReset}>Reset</button>}
        {lapTimes.length !== 0 &&
          <table className='lap-table'>
            {lapTimes.map((lap, index) => (
              <tr>
                <td>{index < 10 ? '0' + index : index}</td>
                <td>{formatElapsedTime(lap.splitLapTime)}</td>
                <td>{formatElapsedTime(lap.splitMainTime)}</td>
              </tr>
            )).reverse()}
          </table>
        }
      </div>
    );
  }
}

export default App;
