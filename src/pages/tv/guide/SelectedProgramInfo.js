import React from 'react';
import dayjs from 'dayjs';
import { H2 } from '@tbiegner99/home-automation-components';
import styles from './selectedProgramInfo.css';

class SelectedProgramInfo extends React.Component {
  getCurrentProgram(programs) {
    const endsAfterNow = (program) => dayjs(program.endTime).isAfter(dayjs());
    return programs.filter(endsAfterNow)[0];
  }

  render() {
    const { channelInfo, onCancel, onTune, selectedProgram } = this.props;
    const program = selectedProgram || this.getCurrentProgram(channelInfo.programs) || {};
    return (
      <div className={styles.selectedProgramInfo}>
        <section className={styles.header}>
          <H2>
            {channelInfo.number} {channelInfo.name}
          </H2>
        </section>
        <section className={styles.body}>
          <div
            className={styles.image}
            style={{
              backgroundImage: `url(${channelInfo.icon})`
            }}
          />
          <div className={styles.programInfo}>
            <div>{program.title}</div>
            <div>{program.episodeName}</div>
            <div className={styles.programDescription}>{program.plot}</div>
          </div>
        </section>
        <section className={styles.buttonBar}>
          <div className={styles.buttons}>
            <div className={styles.button}>
              <button onClick={onTune}>Tune</button>
            </div>
            <div className={styles.button}>
              <button onClick={onCancel}>Cancel</button>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default SelectedProgramInfo;
