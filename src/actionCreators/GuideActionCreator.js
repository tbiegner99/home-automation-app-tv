import { BaseActionCreator } from '@tbiegner99/ui-app-components';

import TVGuideDatasource from '../../datasource/tv/TVGuideDatasource';
import TVEvents from '../../events/TVEvents';

class TVGuideActionCreator extends BaseActionCreator {
  async loadGuide() {
    try {
      const results = await TVGuideDatasource.loadGuide();
      this.dispatch({
        type: TVEvents.GUIDE_LOADED,
        data: { guide: results }
      });
      return results;
    } catch (err) {
      this.dispatch({ type: TVEvents.GUIDE_LOAD_FAILED, data: err });
      throw err;
    }
  }
}
export default new TVGuideActionCreator();
