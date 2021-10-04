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
        <DxDataGrid
          id="unit-table"
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
          key-expr="id"
          exporting="exportGrid"
        >
          <DxSelection mode="single" />

          <DxColumn data-field="id" caption="ID" />
          <DxColumn data-field="symbol" :caption="$t('table.symbol')" />
          <DxColumn data-field="name" :caption="$t('table.name')" />

          <DxFilterRow :visible="true" />
          <DxSearchPanel :visible="true" />
          <DxColumnFixing :enabled="true" />
          <DxColumnChooser :enabled="true" />
          <DxScrolling mode="standard" />
          <DxGrouping :context-menu-enabled="true" />
          <DxGroupPanel :visible="true" />
          <DxPaging :page-size="10" />
        </DxDataGrid>
      </div>
    </div>
  </b-card>
</template>

<script>
import axios from '@axios';
import { BCard } from 'bootstrap-vue';
import {
  DxSelection,
  DxDataGrid,
  DxColumn,
  DxScrolling,
  DxColumnFixing,
  DxSearchPanel,
  DxColumnChooser,
  DxGroupPanel,
  DxGrouping,
  DxFilterRow,
  DxPaging
} from 'devextreme-vue/data-grid';

import ToastificationContent from '@core/components/toastification/ToastificationContent.vue';

export default {
  components: {
    DxSelection,
    DxFilterRow,
    DxColumn,
    DxColumnFixing,
    DxDataGrid,
    DxScrolling,
    DxSearchPanel,
    BCard,
    DxColumnChooser,
    DxGroupPanel,
    DxGrouping,
    DxPaging
  },
  data() {
    return {
      data: [],
      dataLoading: true,
      error: ''
    };
  },
  mounted() {
    this.refreshData();
  },
  methods: {
    refreshData() {
      this.dataLoading = true;
      this.error = '';
      axios
        .get('/list-unit')
        .then((response) => {
          if (response.status === 200) {
            this.data = response?.data?.result || [];
            this.dataLoading = false;
          } else {
            this.error = response?.data?.message || 'Unexpected API error';
            this.dataLoading = false;
          }
        })
        .catch((e) => {
          this.error = e?.response?.data?.message || e?.message;
          this.dataLoading = false;
        });
    },
    showToast({ variant = 'success', title, text, icon = 'XIcon' }) {
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
    closeAllMasterDetail() {
      this.$refs['data-grid'].instance.collapseAll(-1);
    }
  }
};
</script>

<style lang="scss">
@import './tables.scss';
.dx-master-detail-cell {
  background-color: bisque !important;
}
</style>
