<template>
  <b-card>
    <div class="fama-table">
      <div v-if="dataLoading" class="spinner-border m-auto" role="status">
        <span class="sr-only">Loading...</span>
      </div>
      <div v-else-if="error.length !== 0" class="m-auto">
        {{ error }}
      </div>
      <div v-else-if="error.length === 0" style="width: 100%">
        <div class="d-flex justify-content-between">
          <b-form-file
            v-if="useImport"
            v-model="file"
            class="select-file"
            plain
          ></b-form-file>
          <div class="d-flex justify-content-end w-120">
            <b-button
              v-if="useImport"
              class="btn-import mr-1"
              variant="danger"
              @click="handleImport"
            >
              {{ $t('buttons.import') }}
            </b-button>
            <div v-if="useLanguageSelector" class="language-container">
              <b-dropdown :text="selectedLanguage.name">
                <b-dropdown-item
                  v-for="lang in languages"
                  :key="lang.code"
                  @click="onLanguageSelect(lang)"
                >
                  {{ lang.name }}
                </b-dropdown-item>
              </b-dropdown>
            </div>
          </div>
        </div>
        <DxDataGrid
          :id="tableName"
          ref="data-grid"
          width="100%"
          :show-borders="true"
          :data-source="data"
          :allow-column-reordering="true"
          :allow-column-resizing="true"
          column-resizing-mode="widget"
          :column-auto-width="true"
          :show-column-lines="true"
          :show-row-lines="true"
          :row-alternation-enabled="true"
          :hover-state-enabled="true"
          :selection="{ mode: 'single' }"
          :key-expr="keyExpr"
          exporting="exportGrid"
          @row-inserted="onInserted"
          @row-updated="onUpdated"
          @row-removed="onRemoved"
          @row-inserting="onInserting"
          @row-updating="onUpdating"
          @row-removing="onRemoving"
          @init-new-row="onInitNewRow"
        >
          <DxEditing
            :allow-updating="true"
            :allow-deleting="true"
            :allow-adding="true"
            mode="row"
            :select-text-on-edit-start="true"
            :use-icons="true"
          />
          <DxColumn
            v-for="col in tableColumns"
            :key="col.id"
            :caption="col.name"
            :data-field="col.id"
            :allow-editing="col.allowEdit"
            :data-type="col.dataType || 'string'"
          >
            <DxLookup
              v-if="col.lookup"
              :data-source="lookupSource[col.lookup.table]"
              :display-expr="col.lookup.displayExpr"
              :value-expr="col.lookup.valueExpr"
            />
          </DxColumn>
          <DxFilterRow :visible="true" />
          <DxSearchPanel :visible="true" />
          <DxColumnFixing :enabled="true" />
          <DxColumnChooser :enabled="true" />
          <DxScrolling mode="standard" />
          <DxExport :enabled="true" :visible="true" />
          <DxGrouping :context-menu-enabled="true" />
          <DxGroupPanel :visible="true" />
        </DxDataGrid>
      </div>
    </div>
    <b-modal
      ref="import-modal"
      centered
      title="Import"
      ok-only
      :ok-title="$t('buttons.ok')"
    >
      <b-card-text>{{ $t('general.importStarted') }}</b-card-text>
      <b-card-text>{{ importResult }}</b-card-text>
      <div class="d-flex justify-content-center">
        <b-spinner v-if="importResult.length === 0" />
      </div>
    </b-modal>
  </b-card>
</template>

<script>
import axios from '@axios';
import {
  BCard,
  BDropdown,
  BDropdownItem,
  BFormFile,
  BButton,
  BModal,
  BCardText,
  BSpinner
} from 'bootstrap-vue';
import {
  DxDataGrid,
  DxColumn,
  DxEditing,
  DxScrolling,
  DxExport,
  DxColumnFixing,
  DxFilterRow,
  DxSearchPanel,
  DxLookup,
  DxColumnChooser,
  DxGroupPanel,
  DxGrouping
} from 'devextreme-vue/data-grid';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue';
import { data } from 'vue-echarts';

export default {
  components: {
    DxColumnFixing,
    DxDataGrid,
    DxColumn,
    DxEditing,
    DxScrolling,
    DxExport,
    DxFilterRow,
    DxSearchPanel,
    BCard,
    BDropdown,
    BDropdownItem,
    DxLookup,
    BFormFile,
    BButton,
    BModal,
    BCardText,
    BSpinner,
    DxColumnChooser,
    DxGroupPanel,
    DxGrouping
  },
  props: {
    tableName: {
      type: String,
      required: true
    },
    tableColumns: {
      type: Array,
      required: true
    },
    useLanguageSelector: {
      type: Boolean,
      default: false
    },
    useImport: {
      type: Boolean,
      default: false
    },
    keyExpr: {
      type: String,
      default: 'id'
    }
  },
  data() {
    return {
      lookupSource: {},
      data: [],
      languages: [],
      selectedLanguage: {},
      dataLoading: true,
      error: '',
      importResult: '',
      file: null
    };
  },
  computed: {
    dataGrid: function () {
      return this.$refs['data-grid'].instance;
    }
  },
  mounted() {
    this.refreshData();
  },
  methods: {
    handleImport() {
      if (!this.file) {
        this.showToast({
          variant: 'danger',
          title: 'Error',
          text: 'Please choose file first.'
        });
        return;
      }
      onClick: () => {
        const { name, username, password, lastname } = this.userData;
        if (!name || !username || !password || !lastname) {
          this.showToast({
            variant: 'error',
            title: 'Error',
            text: 'Please, fill all items'
          });
          return;
        }
        this.isFirmUser ? this.postCreateFirmUser() : this.postCreateSiteUser();
      };
      const formData = new FormData();
      formData.append('file', this.file);
      this.importResult = '';
      this.$refs['import-modal'].show();
      /* this.showToast({
        variant: 'info',
        icon: 'InfoIcon',
        text: 'Table is being imported...'
      }); */
      axios
        .post(`import-${this.tableName}`, formData)
        .then((response) => {
          if (response.status === 200) {
            this.importResult = this.$t('general.importSuccess');
            /*  this.showToast({
              variant: 'success',
              text: 'Table has been successfully imported.'
            }); */
            this.refreshData();
          } else {
            this.importResult = this.$t('general.importError');
            /* this.showToast({
              variant: 'danger',
              text: 'Import error.'
            }); */
          }
        })
        .catch((err) => {
          console.log(err.response);
          this.importResult = err?.response?.data || err?.message;
          /* this.showToast({
            variant: 'danger',
            text: err?.response?.data?.message || err?.message
          }); */
        });
    },
    onLanguageSelect(lang) {
      this.selectedLanguage = lang;
      localStorage.dbLanguage = lang.code;
      this.refreshData();
    },
    onInserted() {
      this.showToast({
        variant: 'success',
        title: 'Success',
        text: 'New data has been inserted'
      });
      this.refreshData();
    },
    onUpdated() {
      this.showToast({
        variant: 'success',
        title: 'Success',
        text: 'Data has been updated'
      });
    },
    onRemoved() {
      this.showToast({
        variant: 'success',
        title: 'Success',
        text: 'Selected data has been deleted'
      });
    },
    onInitNewRow() {
      this.dataGrid.clearGrouping();
    },
    async onInserting(e) {
      const postObject = this.getPostObject(e.data);
      e.cancel = this.isCancelled(`/create-${this.tableName}`, postObject);
    },
    async onUpdating(e) {
      const data = {
        ...e.oldData,
        ...e.newData
      };
      const postObject = this.getPostObject(data);
      e.cancel = this.isCancelled(
        `/edit-${this.tableName}/${data.id}`,
        postObject
      );
    },
    async onRemoving(e) {
      e.cancel = this.isCancelled(`/delete-${this.tableName}/${e.data.id}`);
    },
    refreshData() {
      this.dataLoading = true;
      this.error = '';
      axios
        .get(`/list-${this.tableName}`)
        .then((response) => {
          if (response.status === 200) {
            this.data = response?.data?.result || [];
          } else {
            this.error = response?.data?.message || 'Unexpected API error';
            this.dataLoading = false;
          }
          return this.getLookupData();
        })
        .then(() => {
          if (this.useLanguageSelector) {
            return axios.get('/list-language');
          } else {
            return Promise.resolve(1);
          }
        })
        .then((response) => {
          if (response === 1) {
            this.dataLoading = false;
          } else {
            this.languages = response?.data?.result;
            const selected = this.languages.find(
              (x) => x?.code === localStorage.dbLanguage
            );
            this.selectedLanguage = selected;
            this.dataLoading = false;
          }
        })
        .catch((e) => {
          this.error = e?.response?.data?.message || e?.message;
          this.dataLoading = false;
        });
    },
    async getLookupData() {
      const temp = this.tableColumns
        .filter((col) => col.lookup)
        .map((col) => col.lookup.table);
      const tables = [...new Set(temp)];
      for (const table of tables) {
        const {
          data: { result }
        } = await axios.get(`list-${table}`);
        this.lookupSource[table] = result;
      }
    },
    exportGrid(e) {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet('Main sheet');
      exportDataGrid({
        worksheet,
        component: e.component
      }).then(function () {
        workbook.xlsx.writeBuffer().then(function (buffer) {
          saveAs(
            new Blob([buffer], { type: 'application/octet-stream' }),
            `${e.element.id}.xlsx`
          );
        });
      });
      e.cancel = true;
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
    getPostObject(data) {
      const keys = this.tableColumns
        .filter((col) => col.id !== 'id' && !col.ignorePost)
        .map((col) => col.id);
      const obj = {};
      keys.forEach((key) => {
        if (key === 'sub_firms[0].id') {
          obj['sub_firm_id'] = data['sub_firms[0]'].id;
        }
        obj[key] = data[key];
      });
      return obj;
    }
  }
};
</script>

<style lang="scss">
@import './tables.scss';

.btn {
  margin-bottom: 10% !important;
  margin-right: 1% !important;
}
</style>
