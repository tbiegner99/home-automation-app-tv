import React from 'react';

import styles from './selectedProgramInfo.css';
import moment from 'moment';
import { H2 } from '../../../components/elements/Headers';

class SelectedProgramInfo extends React.Component {
  getCurrentProgram(programs) {
    const endsAfterNow = (program) => moment(program.endTime).isAfter(moment());
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
