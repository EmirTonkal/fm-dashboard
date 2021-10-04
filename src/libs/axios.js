import Vue from 'vue';

// axios
import axios from 'axios';
import store from '@/store';

const baseURL = 'https://api.famametric.com/v1';
// const baseURL = 'http://localhost:4101/v1';

const onError = (response) => {
  if (response?.status === 401) {
    store.commit('app/LOGOUT');
  }
};

const getAxiosInstance = () => {
  const instance = axios.create({ baseURL });

  // Add token to the headers
  instance.interceptors.request.use((config) => {
    const token = localStorage.token;
    const dbLanguage = localStorage.dbLanguage;
    const siteId = localStorage.siteId;
    if (token) {
      config.headers['x-famametric-auth'] = token;
      config.headers['x-famametric-siteid'] = siteId;
      config.headers['x-lang-code'] = dbLanguage;
    }
    config.headers['Content-Type'] = 'application/json;charset=UTF-8';
    return config;
  });

  // Redirect to login page on token errors
  instance.interceptors.response.use(
    (response) => {
      onError(response);
      return response;
    },
    (error) => {
      onError(error?.response);
      return Promise.reject(error);
    }
  );

  return instance;
};

Vue.prototype.$http = getAxiosInstance();

export default getAxiosInstance();
