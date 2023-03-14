import {Component} from 'react'
import './index.css'

const playIconUrl = 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
const pauseIconUrl =
  'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
const resetIconUrl =
  'https://assets.ccbp.in/frontend/react-js/reset-icon-img.png'

class DigitalTimer extends Component {
  state = {
    timerLimitInMinutes: 25,
    timerElapsedInSeconds: 0,
    isTimerRunning: false,
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  clearTimerInterval = () => {
    clearInterval(this.intervalId)
  }

  incrementTimerElapsedInSeconds = () => {
    const {timerLimitInMinutes, timerElapsedInSeconds} = this.state
    const isTimerCompleted = timerElapsedInSeconds === timerLimitInMinutes * 60
    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timerElapsedInSeconds: prevState.timerElapsedInSeconds + 1,
      }))
    }
  }

  onClickStartOrPauseBtn = () => {
    const {
      timerLimitInMinutes,
      timerElapsedInSeconds,
      isTimerRunning,
    } = this.state

    const isTimerCompleted = timerElapsedInSeconds === timerLimitInMinutes * 60
    if (isTimerCompleted) {
      this.setState({timerElapsedInSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimerElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  onClickResetBtn = () => {
    this.clearTimerInterval()
    this.setState({
      timerLimitInMinutes: 25,
      timerElapsedInSeconds: 0,
      isTimerRunning: false,
    })
  }

  onIncrementTimer = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))
  }

  onDecrementTimer = () => {
    const {timerLimitInMinutes} = this.state

    if (timerLimitInMinutes > 1) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  renderTimerController = () => {
    const {isTimerRunning} = this.state
    const startOrPauseImgUrl = isTimerRunning ? pauseIconUrl : playIconUrl
    const startOrPauseAltText = isTimerRunning ? 'pause icon' : 'play Icon'

    return (
      <div className="timer-controller-container">
        <button
          className="timer-controller-btn"
          type="button"
          onClick={this.onClickStartOrPauseBtn}
        >
          <img
            className="timer-controller-icon"
            src={startOrPauseImgUrl}
            alt={startOrPauseAltText}
          />
          <p className="timer-controller-text">
            {isTimerRunning ? 'Pause' : 'Start'}
          </p>
        </button>

        <button
          className="timer-controller-btn"
          type="button"
          onClick={this.onClickResetBtn}
        >
          <img
            className="timer-controller-icon"
            src={resetIconUrl}
            alt="reset icon"
          />
          <p className="timer-controller-text">Reset</p>
        </button>
      </div>
    )
  }

  getTimerElapsedInSecondsInTimeFormat = () => {
    const {timerLimitInMinutes, timerElapsedInSeconds} = this.state
    const remainingSeconds = timerLimitInMinutes * 60 - timerElapsedInSeconds
    const minutes = Math.floor(remainingSeconds / 60)
    const seconds = Math.floor(remainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {
      timerLimitInMinutes,
      timerElapsedInSeconds,
      isTimerRunning,
    } = this.state
    const isBtnDisabled = timerElapsedInSeconds > 0
    return (
      <div className="digital-timer-app">
        <h1 className="app-title">Digital Timer</h1>
        <div className="app-content">
          <div className="timer-display-section">
            <div className="timer">
              <h1 className="time">
                {this.getTimerElapsedInSecondsInTimeFormat()}
              </h1>
              <p className="timer-status">
                {isTimerRunning ? 'Running' : 'Paused'}
              </p>
            </div>
          </div>
          <div className="timer-setting-section">
            {this.renderTimerController()}
            <div className="timer-limits-section">
              <p className="timer-limit-text">Set Timer Limit</p>
              <div className="timer-limit-control">
                <button
                  className="btn minus-btn"
                  type="button"
                  disabled={isBtnDisabled}
                  onClick={this.onDecrementTimer}
                >
                  -
                </button>
                <button className="minutes-limit-text-btn" type="button">
                  <p className="minutes-limit-text">{timerLimitInMinutes}</p>
                </button>
                <button
                  className="btn plus-btn"
                  type="button"
                  disabled={isTimerRunning}
                  onClick={this.onIncrementTimer}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
