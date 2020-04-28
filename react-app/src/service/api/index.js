import axios from 'axios';
import {
  successResponseInterceptor,
  errorResponseInterceptor,
} from './api.interceptors';
import api from './Api.service';

const TIMEOUT = 40 * 1000;

const createAxiosInstance = () => {
  const axiosApi = axios.create({
    baseURL: '',
    timeout: TIMEOUT,
  });
  axiosApi.interceptors.response.use(
    successResponseInterceptor,
    errorResponseInterceptor,
  );
  axiosApi.defaults.headers.common.Accept = 'application/json; charset=utf-8';
  return axiosApi;
};

const setBearerToken = apiInst => {
  // eslint-disable-next-line no-param-reassign
  apiInst.defaults.headers.common.Authorization = '<set bearer here..>';
};

export default () => {
  api.initialize(createAxiosInstance());
  setBearerToken(api.getApi().apiInst);
};
