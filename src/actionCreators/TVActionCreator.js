import { BaseActionCreator } from '@tbiegner99/ui-app-components';

import TVDatasource from '../datasource/TVDatasource';
import TVEvents from '../events/TVEvents';

class TVActionCreator extends BaseActionCreator {
  async powerOn() {
    try {
      await TVDatasource.powerOn();
      this.dispatch({
        type: TVEvents.POWERED_ON
      });
    } catch (err) {
      this.dispatch({ type: TVEvents.POWER_ON_ERROR, data: err });
      throw err;
    }
  }

  async powerOff() {
    try {
      await TVDatasource.powerOff();
      this.dispatch({
        type: TVEvents.POWERED_OFF
      });
    } catch (err) {
      this.dispatch({ type: TVEvents.POWER_OFF_ERROR, data: err });
      throw err;
    }
  }

  async setMute(isMuted) {
    try {
      await TVDatasource.setMute(isMuted);
      this.dispatch({
        type: TVEvents.MUTE_STATE_CHANGED,
        data: { isMuted }
      });
    } catch (err) {
      console.log(err);
      this.dispatch({ type: TVEvents.MUTE_ERROR, data: err });
      throw err;
    }
  }

  async tuneToChannel(channelId) {
    try {
      const results = await TVDatasource.changeChannel(channelId);
      this.dispatch({
        type: TVEvents.CHANNEL_CHANGED,
        data: { channelId }
      });
      return results;
    } catch (err) {
      this.dispatch({ type: TVEvents.TUNE_FAILED, data: err });
      throw err;
    }
  }
}
export default new TVActionCreator();
