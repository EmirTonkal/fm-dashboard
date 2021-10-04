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
        <DxChart ref="chart">
          <DxTooltip :enabled="true" />
          <DxAdaptiveLayout :width="450" />
          <DxSize :height="200" />
          <DxCommonSeriesSettings type="bar" />
        </DxChart>

        <DxPivotGrid
          id="pivotgrid"
          ref="grid"
          :data-source="dataSource"
          :allow-sorting-by-summary="true"
          :allow-filtering="true"
          :show-borders="true"
          :show-column-grand-totals="false"
          :show-row-grand-totals="false"
          :show-row-totals="false"
          :show-column-totals="false"
        >
          <DxFieldChooser :enabled="true" :height="400" />
        </DxPivotGrid>
      </div>
    </div>
  </b-card>
</template>

<script>
import {
  DxChart,
  DxAdaptiveLayout,
  DxCommonSeriesSettings,
  DxSize,
  DxTooltip
} from 'devextreme-vue/chart';

import { DxPivotGrid, DxFieldChooser } from 'devextreme-vue/pivot-grid';
import axios from '@axios';
import { BCard } from 'bootstrap-vue';
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue';

/**
 * 
 * activityName: "Dolgu Bölüm 2"
    notes: "asdasdads"
    quantity: 1212
    shift: "G"
    wbsName: "Dolgu"
    work_date: "2021-07-01"
 */
export default {
  components: {
    BCard,
    DxChart,
    DxAdaptiveLayout,
    DxCommonSeriesSettings,
    DxSize,
    DxTooltip,
    DxPivotGrid,
    DxFieldChooser
  },
  data() {
    return {
      dataLoading: true,
      error: '',
      dataSource: {
        fields: [
          {
            caption: 'Activity Name',
            dataField: 'activityName'
          },
          {
            caption: 'Wbs Name',
            dataField: 'wbsName'
          },
          {
            caption: 'Date',
            dataField: 'work_date',
            dataType: 'date'
          },
          {
            caption: 'Quantity',
            dataField: 'quantity'
          },
          {
            dataField: 'id',
            visible: false
          }
        ],
        store: null
      }
    };
  },
  mounted() {
    this.getWorkData();
    setTimeout(() => {
      const pivotGrid = this.$refs.grid.instance;
      const chart = this.$refs.chart.instance;
      pivotGrid.bindChart(chart);
    }, 3000);
  },
  methods: {
    getWorkData() {
      this.dataLoading = true;
      this.error = '';
      axios
        .get('/list-work-by-pivot')
        .then((response) => {
          if (response.status === 200) {
            this.dataSource.store = response?.data?.result || [];
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
    }
  }
};
</script>

<style lang="scss">
@import '../tables/tables.scss';
</style>
