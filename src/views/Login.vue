<template>
  <b-overlay :show="showLoaderOverlay">
    <div class="auth-wrapper auth-v2">
      <b-row class="auth-inner m-0">
        <!-- Brand logo-->
        <b-link class="brand-logo">
          <b-img
            src="@/assets/images/logo/logo.png"
            alt="logo"
            width="60%"
            height="60%"
            class="logo"
          ></b-img>
          <h2 class="brand-text text-primary ml-1">Famametric</h2>
        </b-link>
        <!-- /Brand logo-->

        <!-- Left Text-->
        <b-col lg="8" class="d-none d-lg-flex align-items-center p-5">
          <div
            class="w-100 d-lg-flex align-items-center justify-content-center px-5"
          >
            <b-img fluid :src="imgUrl" alt="Login V2" />
          </div>
        </b-col>
        <!-- /Left Text-->

        <!-- Login-->

        <b-col lg="4" class="d-flex align-items-center auth-bg px-2 p-lg-5">
          <b-col sm="8" md="6" lg="12" class="px-xl-2 mx-auto">
            <b-card-title title-tag="h2" class="font-weight-bold mb-1">
              {{ $t('login.welcome') }}
            </b-card-title>

            <!-- form -->
            <validation-observer ref="loginValidation">
              <b-form class="auth-login-form mt-2" @submit.prevent>
                <!-- email -->
                <b-form-group
                  :label="$t('login.username')"
                  label-for="login-username"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Username"
                    rules="required"
                  >
                    <b-form-input
                      id="login-email"
                      v-model="username"
                      :state="errors.length > 0 ? false : null"
                      name="login-email"
                      placeholder="JohnDoe"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>

                <!-- forgot password -->
                <b-form-group>
                  <div class="d-flex justify-content-between">
                    <label for="login-password">{{
                      $t('login.password')
                    }}</label>
                  </div>
                  <validation-provider
                    #default="{ errors }"
                    name="Password"
                    rules="required"
                  >
                    <b-input-group
                      class="input-group-merge"
                      :class="errors.length > 0 ? 'is-invalid' : null"
                    >
                      <b-form-input
                        id="login-password"
                        v-model="password"
                        :state="errors.length > 0 ? false : null"
                        class="form-control-merge"
                        :type="passwordFieldType"
                        name="login-password"
                        placeholder="············"
                      />
                      <b-input-group-append is-text>
                        <feather-icon
                          class="cursor-pointer"
                          :icon="passwordToggleIcon"
                          @click="togglePasswordVisibility"
                        />
                      </b-input-group-append>
                    </b-input-group>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>

                <!-- checkbox -->
                <b-form-group>
                  <b-form-checkbox
                    id="remember-me"
                    v-model="status"
                    name="checkbox-1"
                  >
                    {{ $t('login.rememberMe') }}
                  </b-form-checkbox>
                </b-form-group>

                <!-- submit buttons -->
                <b-button
                  type="submit"
                  variant="primary"
                  block
                  @click="validationForm"
                >
                  {{ $t('login.signIn') }}
                </b-button>
              </b-form>
            </validation-observer>
          </b-col>
        </b-col>

        <!-- /Login-->
      </b-row>
    </div>
  </b-overlay>
</template>

<script>
/* eslint-disable global-require */
import axios from '@axios';
import router from '@/router';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import {
  BRow,
  BCol,
  BLink,
  BFormGroup,
  BFormInput,
  BInputGroupAppend,
  BInputGroup,
  BFormCheckbox,
  BCardTitle,
  BImg,
  BForm,
  BButton,
  BOverlay
} from 'bootstrap-vue';
import { required, email } from '@validations';
import { togglePasswordVisibility } from '@core/mixins/ui/forms';
import store from '@/store/index';
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue';

export default {
  components: {
    BRow,
    BCol,
    BLink,
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroup,
    BFormCheckbox,
    BCardTitle,
    BImg,
    BForm,
    BButton,
    ValidationProvider,
    ValidationObserver,
    BOverlay
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      status: '',
      password: '',
      username: '',
      sideImg: require('@/assets/images/pages/login-v2.svg'),
      // validation rulesimport store from '@/store/index'
      required,
      email,
      showLoaderOverlay: false
    };
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon';
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require('@/assets/images/pages/login-v2-dark.svg');
        return this.sideImg;
      }
      return this.sideImg;
    }
  },
  methods: {
    validationForm() {
      this.$refs.loginValidation.validate().then((success) => {
        if (success) {
          this.showLoaderOverlay = true;
          axios
            .post('/sign-in', {
              username: this.username,
              password: this.password
            })
            .then((response) => {
              const data = response?.data;
              const token = data?.token;
              const name = data?.name;
              const surname = data?.lastname;
              const image = data?.image;
              const userInfo = {
                name,
                surname,
                image
              };
              if (!token) throw Error('API error');
              localStorage.token = token;
              localStorage.userInfo = JSON.stringify(userInfo);
              return axios.get('/list-language');
            })
            .then((response) => {
              const languages = response?.data?.result || [];
              let preferredLanguageCode = navigator?.language || 'en';
              const dashIndex = preferredLanguageCode.indexOf('-');
              if (dashIndex !== -1) {
                preferredLanguageCode = preferredLanguageCode.substring(
                  0,
                  preferredLanguageCode.indexOf('-')
                );
              }
              const selectedLanguage = languages.find(
                (x) => x.code === preferredLanguageCode
              );
              localStorage.setItem(
                'dbLanguage',
                selectedLanguage?.code || 'en'
              );
              return axios.get('/list-site');
            })
            .then((response) => {
              const sites = response?.data?.result || [];
              if (!sites || sites?.length === 0) {
                throw Error('API error');
              }
              localStorage.siteId = sites[0].id;
              router.push({ path: '/' });
            })
            .catch((err) => {
              this.showLoaderOverlay = false;
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: err.message,
                  icon: 'XIcon',
                  variant: 'danger'
                }
              });
            });
        }
      });
    }
  }
};
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';

@media only screen and (max-height: 500px) {
  .logo {
    display: none;
  }
  .brand-text {
    display: none;
  }
}
</style>
