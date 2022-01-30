import React from 'react';
import dayjs from 'dayjs';
import { Modal } from '@tbiegner99/home-automation-components';
import { Checkbox } from '@tbiegner99/react-forms';

import GuideHeader from './GuideHeader';
import ChannelGuide from './ChannelGuide';
import TimeMarker from './TimeMarker';
import SelectedProgramInfo from './SelectedProgramInfo';

import styles from './tvGuide.css';

const ONE_SECOND = 1000;
const ONE_MINUTE = 60 * ONE_SECOND;

const getTime = () => {
  const now = dayjs();
  const minutesPastHour = now.minute();
  if (minutesPastHour >= 30) {
    return now.startOf('hour').add(30, 'minutes');
  }
  return now.startOf('hour');
};

const ALL_CHANNELS = () => true;
const HD_CHANNELS = (channel) => channel.highDefinition;

class TVGuide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: ALL_CHANNELS,
      channelInfo: null,
      currentProgram: null
    };
  }

  getNumberOfColumns() {
    const { guideLengthInHours } = this.props;
    return guideLengthInHours / 0.5;
  }

  selectChannel(channelInfo, currentProgram) {
    this.setState({
      channelInfo,
      currentProgram
    });
  }

  closeModal() {
    this.setState({
      channelInfo: null,
      currentProgram: null
    });
  }

  filterChange(hdFilterSelected) {
    this.setState({
      filter: hdFilterSelected ? HD_CHANNELS : ALL_CHANNELS
    });
  }

  async tuneToSelectedChannel() {
    const { onTune } = this.props;
    const { channelInfo } = this.state;
    try {
      await onTune(channelInfo);
      this.closeModal();
    } catch (err) {
      console.log(err);
    }
  }

  renderProgramInfoModal() {
    const { channelInfo, currentProgram } = this.state;

    if (!channelInfo) {
      return null;
    }

    return (
      <Modal className={styles.modal}>
        <SelectedProgramInfo
          onCancel={() => this.closeModal()}
          onTune={this.tuneToSelectedChannel.bind(this)}
          channelInfo={channelInfo}
          selectedProgram={currentProgram}
        />
      </Modal>
    );
  }

  renderChannelGuide(channelData) {
    const { guideLengthInHours } = this.props;
    const numberOfColumns = this.getNumberOfColumns();
    return (
      <ChannelGuide
        onChannelSelected={this.selectChannel.bind(this)}
        numberOfColumns={numberOfColumns}
        guideLengthInHours={guideLengthInHours}
        channelInfo={channelData}
        startTime={getTime()}
      />
    );
  }

  renderGuideData(guideData) {
    if (!guideData) {
      return null;
    }
    return guideData.filter(this.state.filter).map(this.renderChannelGuide.bind(this));
  }

  render() {
    const { guideData, guideLengthInHours } = this.props;
    const numberOfColumns = this.getNumberOfColumns();
    const startTime = getTime();
    return (
      <div className={styles.tvGuideContainer}>
        <div>
          <Checkbox onChange={this.filterChange.bind(this)}>HD Only</Checkbox>
        </div>
        <div className={styles.tvGuide}>
          <GuideHeader
            numberOfColumns={numberOfColumns}
            className={styles.infoRow}
            startTime={startTime}
          />
          <section className={styles.programsInfo}>{this.renderGuideData(guideData)}</section>
          {guideData && (
            <TimeMarker
              numberOfColumns={numberOfColumns}
              guideLengthInHours={guideLengthInHours}
              startTime={startTime}
              updateInterval={ONE_MINUTE}
            />
          )}
        </div>
        {this.renderProgramInfoModal()}
      </div>
    );
  }
}

export default TVGuide;
