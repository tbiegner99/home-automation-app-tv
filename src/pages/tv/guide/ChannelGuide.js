import React from 'react';
import dayjs from 'moment';
import styles from './channelGuide.css';

class ChannelGuide extends React.Component {
  programsInGuideRange(program) {
    const { startTime: guideStartTime, guideLengthInHours, numberOfColumns } = this.props;

    const { endTime, startTime } = program;
    const guideStart = dayjs(guideStartTime);
    const guideEnd = dayjs(guideStart).add(guideLengthInHours, 'hours');

    return dayjs(startTime).isSameOrBefore(guideEnd) && dayjs(endTime).isAfter(guideStart);
  }

  renderChannelInfo() {
    const { onChannelSelected, channelInfo, numberOfColumns } = this.props;
    const style = {
      width: `${100 / (numberOfColumns + 1)}%`
    };
    return (
      <div
        onClick={() => onChannelSelected(channelInfo, null)}
        style={style}
        className={styles.channelColumn}
      >
        <div className={styles.channelNumber}>{channelInfo.number}</div>
        <div className={styles.channelName}>{channelInfo.name}</div>
        <img src={channelInfo.icon} className={styles.channelIcon} alt="" />
      </div>
    );
  }

  renderProgram(program) {
    const {
      channelInfo,
      onChannelSelected,
      startTime: guideStartTime,
      guideLengthInHours,
      numberOfColumns
    } = this.props;
    const { title, startTime, endTime } = program;
    const BASE_WIDTH_PCT = 100 / (numberOfColumns + 1);

    const specialClass = '';
    const programStart = dayjs(startTime);
    const programEnd = dayjs(endTime);
    const guideStart = dayjs(guideStartTime);
    const guideEnd = dayjs(guideStartTime).add(guideLengthInHours, 'hours');

    const rangeStart = dayjs.max(guideStart, programStart);
    const rangeEnd = dayjs.min(guideEnd, programEnd);

    const rangeRuntime = rangeEnd.diff(rangeStart, 'minutes');
    const pct = BASE_WIDTH_PCT * (rangeRuntime / 30);
    if (pct === 0) {
      return null;
    }

    const style = {
      width: `${pct}%`
    };

    return (
      <div
        onClick={() => onChannelSelected(channelInfo, program)}
        data-start-time={programStart.toString()}
        data-runtime={program.runtime}
        data-broadcast={program.broadcastId}
        className={styles.column}
        style={style}
      >
        <div className={styles.programText}> {title}</div>
      </div>
    );
  }

  renderPrograms(programs) {
    return programs
      .filter((program) => this.programsInGuideRange(program))
      .map((program) => this.renderProgram(program));
  }

  render() {
    const { channelInfo } = this.props;

    return (
      <div data-channel-id={channelInfo.channelId} className={styles.channelGuide}>
        {this.renderChannelInfo()}
        {this.renderPrograms(channelInfo.programs)}
      </div>
    );
  }
}

export default ChannelGuide;
