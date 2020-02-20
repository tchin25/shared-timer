import React, {Component} from 'react'; 

class Clock extends Component {
    constructor(props) {
      super(props);
      this.state = {
        time: Date.now()
      };
    }
    componentDidMount() {
      this.intervalID = setInterval(
        () => this.tick(),
        1000
      );
    }
    componentWillUnmount() {
      clearInterval(this.intervalID);
    }
    tick() {
      this.setState({
        time: Date.now()
      },
      () => {
        if (this.props.deadline && this.props.deadline >= this.state.time){
            //trigger alarm
            //Callback method?
            this.props.alarmTriggered();
        }
      }
      );
    }
    render() {
      return (
        <p>
          The time is {this.state.time}.
        </p>
      );
    }
  }

  Clock.defaultProps = {
      alarmTriggered: () => alert('Alarm triggered'),
    //   deadline: Date.now + 60 * 1000
  }

  export default Clock