import React from 'react';
import moment from 'moment';
import styles from './timeMarker.css';

class TimeMarker extends React.Component {
  componentDidMount() {
    const { updateInterval = 60 * 1000 } = this.props;
    this.refreshInterval = setInterval(() => this.setState({ now: moment() }), updateInterval);
  }

  componentWillUnmount() {
    clearInterval(this.refreshInterval);
  }

  render() {
    const { startTime, numberOfColumns, guideLengthInHours } = this.props;
    const BASE_PCT = 100 / (numberOfColumns + 1);
    const remainingPct = 100 - BASE_PCT;
    const diffInMinutes = moment().diff(moment(startTime), 'minutes');
    const pctOfRemaining = (remainingPct * diffInMinutes) / (guideLengthInHours * 60);
    const style = {
      left: `${BASE_PCT + pctOfRemaining}%`
    };
    return <div style={style} className={styles.timeMarker} />;
  }
}

export default TimeMarker;
