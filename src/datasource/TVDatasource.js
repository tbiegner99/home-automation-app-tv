import { BaseDatasource } from '@tbiegner99/ui-app-components';

const BASE_URL = '';
const KODI_RPC_METHODS = {
  Player: {
    Open: 'Player.Open'
  },
  Addons: {
    ExecuteAddon: 'Addons.ExecuteAddon'
  },
  Application: {
    SetMute: 'Application.SetMute',
    GetProperites: 'Application.GetProperties'
  }
};

const createRpcCommand = (method, params) => ({
  jsonrpc: '2.0',
  method,
  params,
  id: 2
});

class TVDatasource extends BaseDatasource {
  constructor() {
    super(null, BASE_URL);
  }

  async setMute(isMuted) {
    const url = this.constructUrl('/jsonrpc');
    const body = createRpcCommand(KODI_RPC_METHODS.Application.SetMute, {
      mute: isMuted
    });
    const response = await this.client.post(url, body);
    if (!response.data.error) {
      return;
    }
    throw response.data.error;
  }

  async getProperties() {
    const url = this.constructUrl('/jsonrpc');
    const body = createRpcCommand(KODI_RPC_METHODS.Application.GetProperites, {
      properties: ['muted', 'volume']
    });
    const response = await this.client.post(url, body);
    if (!response.data.error) {
      return;
    }
    throw response.data.error;
  }

  async powerOn() {
    const url = this.constructUrl('/jsonrpc');
    const body = createRpcCommand(KODI_RPC_METHODS.Addons.ExecuteAddon, {
      addonid: 'script.json-cec',
      params: { command: 'activate' }
    });
    const response = await this.client.post(url, body);
    if (!response.data.error) {
      return;
    }
    throw response.data.error;
  }

  async powerOff() {
    const url = this.constructUrl('/jsonrpc');
    const body = createRpcCommand(KODI_RPC_METHODS.Addons.ExecuteAddon, {
      addonid: 'script.json-cec',
      params: { command: 'standby' }
    });
    const response = await this.client.post(url, body);
    if (!response.data.error) {
      return;
    }
    throw response.data.error;
  }

  async changeChannel(channelId) {
    const url = this.constructUrl('/jsonrpc');
    const body = createRpcCommand(KODI_RPC_METHODS.Player.Open, { item: { channelid: channelId } });
    const response = await this.client.post(url, body);
    if (!response.data.error) {
      return;
    }
    throw response.data.error;
  }
}

export default new TVDatasource();
