<template>
  <b-card>
    <div>
      <!--   <b-button
        class="mb-2"
        type="submit"
        variant="primary"
        @click="showCreateSiteUser"
      >
        Create Site User
      </b-button>
      <span class="mx-1"></span>
      <b-button
        class="mb-2"
        type="submit"
        variant="primary"
        @click="showCreateFirmUser"
      >
        Create Firm User
      </b-button>

      <DxPopup
        :visible="popupVisible"
        :close-on-outside-click="false"
        :show-close-button="false"
        :show-title="true"
        :width="400"
        :height="450"
        title="Create User"
      >
        <div class="dx-fieldset">
          <div class="dx-field">
            <div class="dx-field-label">Customer</div>
            <div class="dx-field-value">
              <DxSelectBox
                :data-source="customers"
                display-expr="lastname"
                value-expr="id"
                @value-changed="onCustomerValueChanged"
              />
            </div>
          </div>
          <div v-if="isSelectCustomer" class="dx-field">
            <DxForm
              id="form"
              :col-count="1"
              :on-content-ready="validateForm"
              :form-data="userData"
            >
              <DxItem
                caption="Username"
                data-field="username"
                :validation-rules="validationRules.username"
              />
              <DxItem
                caption="Name"
                data-field="name"
                :validation-rules="validationRules.name"
              />
              <DxItem
                caption="Surname"
                data-field="lastname"
                :validation-rules="validationRules.lastname"
              />
              <DxItem
                caption="Password"
                data-field="password"
                :validation-rules="validationRules.password"
              />
              <DxItem
                v-if="isFirmUser"
                :editor-options="{
                  dataSource: firms,
                  value: '',
                  displayExpr: 'name',
                  valueExpr: 'id'
                }"
                caption="Firm"
                data-field="firm"
                editor-type="dxSelectBox"
              />
              <DxItem
                v-else
                :editor-options="{
                  dataSource: sites,
                  value: '',
                  displayExpr: 'name',
                  valueExpr: 'id'
                }"
                caption="Site"
                data-field="site"
                editor-type="dxSelectBox"
              />
            </DxForm>
          </div>
        </div>
        <DxToolbarItem
          widget="dxButton"
          toolbar="bottom"
          location="before"
          :options="saveButtonOptions"
        />
        <DxToolbarItem
          widget="dxButton"
          toolbar="bottom"
          location="after"
          :options="closeButtonOptions"
        />
      </DxPopup> -->

      <TableTemplate
        :table-name="tableName"
        :table-columns="tableColumns"
        :use-language-selector="useLanguageSelector"
        :use-import="useImport"
      />
    </div>
  </b-card>
</template>

<script>
import axios from '@axios';
import 'devextreme-vue/tag-box';
import { BCard } from 'bootstrap-vue';
import {
  DxDataGrid,
  DxColumn,
  DxEditing,
  DxScrolling,
  DxColumnFixing,
  DxSearchPanel,
  DxColumnChooser,
  DxGroupPanel,
  DxGrouping
} from 'devextreme-vue/data-grid';
// import { DxPopup, DxToolbarItem } from 'devextreme-vue/popup';
// import DxSelectBox from 'devextreme-vue/select-box';
// import { DxForm, DxItem } from 'devextreme-vue/form';
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue';
import TableTemplate from './TableTemplate';

export default {
  components: {
    TableTemplate,
    // DxSelectBox,
    // DxForm,
    // DxItem,
    // DxToolbarItem,
    // DxPopup,
    BCard
  },
  data() {
    return {
      tableColumns: [
        {
          id: 'id',
          name: 'ID',
          allowEdit: false
        },
        {
          id: 'firstname',
          name: this.$t('user.name')
        },
        {
          id: 'lastname',
          name: this.$t('user.lastName')
        },
        {
          id: 'username',
          name: this.$t('user.username')
        },
        {
          id: 'password',
          name: this.$t('user.password')
        }
      ],
      tableName: 'site-user',
      useLanguageSelector: false,
      useImport: false,

      data: [],
      sites: [],
      firms: [],
      customers: [],
      userData: {},
      dataLoading: true,
      isFirmUser: false,
      popupVisible: false,
      isSelectCustomer: false,
      error: '',
      customerId: '',
      validationRules: {
        name: [{ type: 'required', message: 'Name is required.' }],
        username: [{ type: 'required', message: 'Username is required.' }],
        password: [{ type: 'required', message: 'Password is required.' }],
        lastname: [{ type: 'required', message: 'Surname is required.' }],
        customer: [{ type: 'required', message: 'Customer is required.' }]
      },
      saveButtonOptions: {
        icon: 'save',
        text: 'Save',
        onClick: () => {
          const { name, username, password, lastname } = this.userData;
          if (!name || !username || !password || !lastname) {
            this.showToast({
              variant: 'error',
              title: 'Error',
              text: 'Please, fill all items'
            });
            return;
          } else if (lastname.length != 1) {
            this.showToast({
              variant: 'error',
              title: 'Error',
              text: 'Surname must have a one character'
            });
            return;
          }
          this.isFirmUser
            ? this.postCreateFirmUser()
            : this.postCreateSiteUser();
        }
      },
      closeButtonOptions: {
        icon: 'close',
        text: 'Close',
        onClick: () => {
          this.popupVisible = false;
          this.userData = {};
        }
      }
    };
  },

  methods: {
    validateForm(e) {
      e.component.validate();
    },
    showCreateSiteUser() {
      this.popupVisible = true;
    },
    showCreateFirmUser() {
      this.popupVisible = true;
      this.isFirmUser = true;
    },
    onUpdated() {
      this.showToast({
        variant: 'success',
        title: 'Success',
        text: 'Data has been updated'
      });
    },
    async onUpdating(e) {
      const data = {
        ...e.oldData,
        ...e.newData
      };
      const postObject = this.getPostObject(data);
      e.cancel = this.isCancelled(`/edit-site/${this.data.id}`, data);
    },
    onCustomerValueChanged(event) {
      this.isSelectCustomer = true;
      if (event.value !== '') {
        this.getSite(event.value);
      }
    },
    refreshData() {
      this.dataLoading = true;
      this.error = '';
    },
    showToast({ variant = 'success', title, text, icon = 'InfoIcon' }) {
      this.$toast({
        component: ToastificationContent,
        props: {
          title,
          text,
          icon,
          variant
        }
      });
    },
    async isCancelled(path, data) {
      let response;
      try {
        response = await axios.post(path, data);
      } catch (e) {
        this.showToast({
          title: 'Error',
          variant: 'danger',
          text: e?.response?.data?.message || e?.message
        });
        return true;
      }
      if (response.status === 200) return false;
      else {
        this.showToast({
          title: 'Error',
          variant: 'danger',
          text: response?.data?.message
        });
        return true;
      }
    },
    async postCreateSiteUser() {
      let response;
      const {
        name,
        lastname,
        username,
        site: site_id,
        password
      } = this.userData;
      try {
        response = await axios.post('/create-user', {
          name,
          lastname,
          username,
          password,
          role: 'admin',
          customer_id: this.customerId,
          site_id
        });
        if (response.status === 200) {
          this.showToast({
            variant: 'success',
            title: 'Success',
            text: 'New data has been inserted'
          });
          this.popupVisible = false;
          this.siteData = {};
          this.refreshData();
        } else {
          this.showToast({
            title: 'Error',
            variant: 'danger',
            text: e?.response?.data?.message || e?.message
          });
          this.refreshData();
        }
      } catch (e) {
        this.showToast({
          title: 'Error',
          variant: 'danger',
          text: e?.response?.data?.message || e?.message
        });
      }
    },
    async postCreateFirmUser() {
      let response;
      const { name, lastname, username, password } = this.userData;
      try {
        response = await axios.post('/create-firm-user', {
          name,
          lastname,
          username,
          password,
          role: 'admin',
          customer_id: this.customerId,
          firm_id
        });
        if (response.status === 200) {
          this.showToast({
            variant: 'success',
            title: 'Success',
            text: 'New data has been inserted'
          });
          this.popupVisible = false;
          this.siteData = {};
          this.refreshData();
        } else {
          this.showToast({
            title: 'Error',
            variant: 'danger',
            text: e?.response?.data?.message || e?.message
          });
          this.refreshData();
        }
      } catch (e) {
        this.showToast({
          title: 'Error',
          variant: 'danger',
          text: e?.response?.data?.message || e?.message
        });
      }
    }
  }
};
</script>
