import jwtDefaultConfig from './jwtDefaultConfig';

export default class JwtService {
  // Will be used by this service for making API calls
  axiosIns = null;

  // jwtConfig <= Will be used by this service
  jwtConfig = { ...jwtDefaultConfig };

  constructor(axiosIns, jwtOverrideConfig) {
    this.axiosIns = axiosIns;
    this.jwtConfig = { ...this.jwtConfig, ...jwtOverrideConfig };

    // Request Interceptor
    this.axiosIns.interceptors.request.use(
      (config) => {
        // Get token from localStorage
        const accessToken = this.getToken();

        // If token is present add it to request's Authorization Header
        if (accessToken) {
          // eslint-disable-next-line no-param-reassign
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  getToken() {
    return localStorage.getItem(this.jwtConfig.storageTokenKeyName);
  }

  setToken(value) {
    localStorage.setItem(this.jwtConfig.storageTokenKeyName, value);
  }

  login(...args) {
    return this.axiosIns.post(this.jwtConfig.loginEndpoint, ...args);
  }
}
