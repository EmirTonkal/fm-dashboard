<template>
  <div class="navbar-container d-flex content align-items-center">
    <!-- Nav Menu Toggler -->
    <ul class="nav navbar-nav d-xl-none">
      <li class="nav-item">
        <b-link class="nav-link" @click="toggleVerticalMenuActive">
          <feather-icon icon="MenuIcon" size="21" />
        </b-link>
      </li>
    </ul>

    <!-- Left Col -->
    <div
      class="bookmark-wrapper align-items-center flex-grow-1 d-none d-lg-flex"
    >
      <dark-Toggler class="d-none d-lg-block" />
    </div>

    <b-navbar-nav class="nav align-items-center ml-auto">
      <locale />
      <b-nav-item-dropdown
        right
        toggle-class="d-flex align-items-center dropdown-user-link"
        class="dropdown-user"
      >
        <template #button-content>
          <div class="d-sm-flex d-none user-nav">
            <p class="user-name font-weight-bolder mb-0">
              {{ userInfo.name }} {{ userInfo.surname }}
            </p>
          </div>
          <b-avatar
            size="40"
            variant="light-primary"
            :src="`data:image/png;base64,${userInfo.image}`"
            badge-variant="none"
          />
        </template>

        <!-- <b-dropdown-item link-class="d-flex align-items-center">
          <feather-icon size="16" icon="UserIcon" class="mr-50" />
          <span>Profile</span>
        </b-dropdown-item>

        <b-dropdown-item link-class="d-flex align-items-center">
          <feather-icon size="16" icon="MailIcon" class="mr-50" />
          <span>Inbox</span>
        </b-dropdown-item>

        <b-dropdown-item link-class="d-flex align-items-center">
          <feather-icon size="16" icon="CheckSquareIcon" class="mr-50" />
          <span>Task</span>
        </b-dropdown-item>

        <b-dropdown-item link-class="d-flex align-items-center">
          <feather-icon size="16" icon="MessageSquareIcon" class="mr-50" />
          <span>Chat</span>
        </b-dropdown-item> 

        <b-dropdown-divider /> -->

        <b-dropdown-item
          link-class="d-flex align-items-center"
          @click="logout()"
        >
          <feather-icon size="16" icon="LogOutIcon" class="mr-50" />
          <span>{{ $t('logout') }}</span>
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </div>
</template>

<script>
import axios from '@axios';
import router from '@/router';
import store from '@/store';
import {
  BLink,
  BNavbarNav,
  BNavItemDropdown,
  BDropdownItem,
  BAvatar
} from 'bootstrap-vue';
import Locale from '@core/layouts/components/app-navbar/components/Locale.vue';
import DarkToggler from '@core/layouts/components/app-navbar/components/DarkToggler.vue';

export default {
  components: {
    BLink,
    BNavbarNav,
    BNavItemDropdown,
    BDropdownItem,
    BAvatar,
    Locale,
    // Navbar Components
    DarkToggler
  },
  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => {}
    }
  },
  computed: {
    userInfo: () => {
      const temp = localStorage.userInfo;
      if (!temp) {
        return {
          name: '',
          surname: '',
          image: ''
        };
      } else {
        return JSON.parse(temp);
      }
    }
  },
  methods: {
    logout() {
      axios
        .post('/logout')
        .then(() => {
          store.commit('app/LOGOUT');
        })
        .catch((err) => {
          if (err?.response?.status !== 401) {
            store.commit('app/LOGOUT');
          }
        });
    }
  }
};
</script>
