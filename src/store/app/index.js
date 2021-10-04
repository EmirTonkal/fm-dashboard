import { $themeBreakpoints } from '@themeConfig';
import router from '@/router';

export default {
  namespaced: true,
  state: {
    windowWidth: 0,
    shallShowOverlay: false
  },
  getters: {
    currentBreakPoint: (state) => {
      const { windowWidth } = state;
      if (windowWidth >= $themeBreakpoints.xl) return 'xl';
      if (windowWidth >= $themeBreakpoints.lg) return 'lg';
      if (windowWidth >= $themeBreakpoints.md) return 'md';
      if (windowWidth >= $themeBreakpoints.sm) return 'sm';
      return 'xs';
    }
  },
  mutations: {
    UPDATE_WINDOW_WIDTH(state, val) {
      state.windowWidth = val;
    },
    TOGGLE_OVERLAY(state, val) {
      state.shallShowOverlay =
        val !== undefined ? val : !state.shallShowOverlay;
    },
    LOGOUT(_state, _obj) {
      if (localStorage.getItem('token')) {
        localStorage.removeItem('token');
      }
      if (localStorage.getItem('userInfo')) {
        localStorage.removeItem('userInfo');
      }
      if (localStorage.getItem('dbLanguage')) {
        localStorage.removeItem('dbLanguage');
      }
      if (localStorage.getItem('siteId')) {
        localStorage.removeItem('siteId');
      }
      router.push({ name: 'login' });
    }
  },
  actions: {}
};
