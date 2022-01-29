import React from 'react';
import dayjs from 'moment';
import styles from './guideHeader.css';

const renderNext3Hours = (startTime, numColumns, style) => {
  const time = dayjs(startTime);
  const components = [];

  for (let i = 0; i < numColumns; i++) {
    components.push(
      <div style={style} className={styles.column}>
        {time.format('h:mm')}
      </div>
    );
    time.add(30, 'minutes');
  }
  return components;
};

const GuideHeader = (props) => {
  const { startTime, numberOfColumns } = props;
  const style = {
    width: `${100 / (numberOfColumns + 1)}%`
  };
  return (
    <div className={styles.guideHeader}>
      <div style={style} className={styles.channelColumn}>
        Channel
      </div>
      {renderNext3Hours(startTime, numberOfColumns, style)}
    </div>
  );
};

export default GuideHeader;
