import React from 'react';
import dayjs from 'dayjs';
import styles from './timeMarker.css';

class TimeMarker extends React.Component {
  componentDidMount() {
    const { updateInterval = 60 * 1000 } = this.props;
    this.refreshInterval = setInterval(() => this.setState({ now: dayjs() }), updateInterval);
  }

  componentWillUnmount() {
    clearInterval(this.refreshInterval);
  }

  render() {
    const { startTime, numberOfColumns, guideLengthInHours } = this.props;
    const BASE_PCT = 100 / (numberOfColumns + 1);
    const remainingPct = 100 - BASE_PCT;
    const diffInMinutes = dayjs().diff(dayjs(startTime), 'minutes');
    const pctOfRemaining = (remainingPct * diffInMinutes) / (guideLengthInHours * 60);
    const style = {
      left: `${BASE_PCT + pctOfRemaining}%`
    };
    return <div style={style} className={styles.timeMarker} />;
  }
}

export default TimeMarker;
