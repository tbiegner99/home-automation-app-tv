import { BaseDatasource } from '@tbiegner99/ui-app-components';

import TVGuideSerializer from '../serializers/tv/TVGuideSerializer';

const BASE_URL = '/api/tv';
class TVGuideDatasource extends BaseDatasource {
  constructor() {
    super(null, BASE_URL);
  }

  async loadGuide() {
    const url = this.constructUrl('/guide');
    const results = await this.client.get(url);
    return TVGuideSerializer.fromGuideData(results.data);
  }
}

export default new TVGuideDatasource();
