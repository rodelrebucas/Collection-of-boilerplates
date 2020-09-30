class Api {
  apiInst;

  constructor(api) {
    this.apiInst = api;
  }

  get = async (route, payload) => {
    const response = await this.apiInst.get(route, payload);
    return response;
  };

  post = async (route, payload) => {
    const response = await this.apiInst.post(route, payload);
    return response;
  };

  put = async (route, payload) => {
    const response = await this.apiInst.put(route, payload);
    return response;
  };

  patch = async (route, payload) => {
    const response = await this.apiInst.patch(route, payload);
    return response;
  };

  delete = async route => {
    const response = await this.apiInst.delete(route);
    return response;
  };
}

const api = (() => {
  // eslint-disable-next-line no-underscore-dangle
  let _api;
  return {
    initialize: apiInst => {
      if (_api === undefined) _api = new Api(apiInst);
    },
    getApi: () => {
      if (_api !== null) return _api;
      throw Error("Initialize api first.");
    },
  };
})();

export default api;
