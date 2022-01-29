import React from 'react';
import { connect } from 'react-redux';
import TVGuide from './guide/TVGuide';
import Urls from '../../utils/Urls';
import NavBar from './navs/NavBar';
import TVGuideActionCreator from '../../actionCreators/tv/GuideActionCreator';
import TVActionCreator from '../../actionCreators/tv/TVActionCreator';
import CurrentTime from '../../components/elements/CurrentTime';

import styles from './tvPage.css';
import { H3 } from '../../components/elements/Headers';

const TEN_MINUTES = 10 * 60 * 1000;
const GUIDE_LENGTH_IN_HOURS = 2;

class TVPage extends React.Component {
  componentDidMount() {
    this.guideInterval = setInterval(this.props.loadGuide, TEN_MINUTES);
  }

  componentWillUnmount() {
    clearInterval(this.guideInterval);
  }

  render() {
    const { tvGuide, onTune, onChangeUrl, onPowerOn, onPowerOff, onToggleMute } = this.props;
    return (
      <div className={styles.tvPage}>
        <NavBar
          onPowerOn={onPowerOn}
          onPowerOff={onPowerOff}
          onToggleMute={onToggleMute}
          onHomeClick={() => onChangeUrl(Urls.HOME)}
        />
        <div className={styles.tvContent}>
          <H3 className={styles.time}>
            <CurrentTime format="dddd MMMM D YYYY" />
            <CurrentTime format="hh:mma" />
          </H3>
          <div className={styles.content}>
            <TVGuide
              onTune={onTune}
              guideLengthInHours={GUIDE_LENGTH_IN_HOURS}
              guideData={tvGuide}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tvGuide: state.tv.store.guide.value
});

const mapDispatchToProps = () => ({
  onChangeUrl: (url) => {
    TVGuideActionCreator.changeUrl(url);
  },

  loadGuide() {
    TVGuideActionCreator.loadGuide();
  },

  onTune(channelInfo) {
    return TVActionCreator.tuneToChannel(channelInfo.channelId);
  },
  onPowerOn() {
    return TVActionCreator.powerOn();
  },
  onPowerOff() {
    return TVActionCreator.powerOff();
  },
  onToggleMute(mute) {
    return TVActionCreator.setMute(mute);
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TVPage);
