<template>
  <b-card>
    <div class="fama-table">
      <div v-if="dataLoading" class="spinner-border m-auto" role="status">
        <span class="sr-only">Loading... </span>
      </div>
      <div v-else-if="error.length !== 0" class="m-auto">
        {{ error }}
      </div>
      <div v-else-if="error.length === 0" style="width: 100%">
        <b-button
          class="mb-2"
          type="submit"
          variant="primary"
          @click="closeAllMasterDetail"
        >
          {{ $t('buttons.collapse_all') }}
          <!-- Collapse All -->
        </b-button>
        <DxButton
          id="exportButton"
          icon="exportpdf"
          :text="$t('buttons.export_pdf')"
          @click="exportGrid()"
          :visible="true"
          style="float: right"
        />

        <DxDataGrid
          id="work-table"
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
          @exporting="onExporting"
          :ref="dataGridRef"
          :on-focused-cell-changing="onFocusedCellChanging"
          :focused-row-enabled="true"
          :focused-row-index="0"
          :focused-column-index="0"
          :autoNavigateToFocusedRow="true"
        >
          <DxExport
            :enabled="true"
            :visible="true"
            :allowExportSelectedData="true"
            :customize-excel-cell="customizeExcelCell"
          />
          <DxKeyboardNavigation
            :enter-key-action="enterKeyAction"
            :enter-key-direction="enterKeyDirection"
          />
          <DxSelection mode="multiple" />
          <!-- if you selected multiple mode you can
          have a than one row -->
          <DxEditing
            :allow-updating="true"
            :allow-adding="true"
            mode="batch"
            start-edit-action="dblClick"
          />
          <DxColumn
            data-field="problem"
            :caption="$t('table.problem')"
            cell-template="cellTemplate"
          />
          <template #cellTemplate="">
            <img
              src="@/assets/images/icons/group-8.png"
              width="20px"
              height="20px"
              style="float: left"
            />
          </template>
          <DxColumn
            data-field="created_at"
            :caption="$t('table.date')"
            data-type="date"
            format="dd.MM.yyyy"
          />
          <DxColumn data-field="shift" :caption="$t('table.shift')" />
          <DxColumn data-field="sub-firm.name" :caption="$t('table.company')" />
          <DxColumn
            data-field="user.username"
            :caption="$t('table.user')"
            alignment="left"
            :allow-editing="false"
          />
          <DxColumn
            data-field="responsible"
            :caption="$t('table.responsible')"
            :visible="false"
          />
          <DxColumn
            data-field="activity.wb.code"
            caption="WBS #"
            :visible="false"
          />
          <DxColumn
            data-field="activity.wb.languages[0].wbs_translation.name"
            :caption="$t('table.wbs_name')"
          />

          <DxColumn
            data-field="activity.code"
            :caption="$t('table.activity#')"
            :visible="false"
          />
          <DxColumn
            data-field="activity.languages[0].activity_translation.name"
            :caption="$t('table.activity')"
          /><DxColumn
            data-field="quantity"
            :caption="$t('table.quantity')"
            format="#0.000"
            alignment="left"
          />
          <DxColumn
            data-field="activity.unit.symbol"
            :caption="$t('table.symbol')"
          />
          <DxColumn
            data-field="not_exists_activity"
            :caption="$t('table.not_exist_activity')"
          />
          <DxColumn data-field="null" caption="UM-NeA" />

          <DxColumn data-field="notes" :caption="$t('table.notes')" />

          <DxMasterDetail :enabled="true" template="master-detail" />
          <template #master-detail="{ data: work }">
            <DetailTemplate :template-data="work" />
          </template>

          <DxScrolling column-rendering-mode="virtual" />
          <DxPaging :page-size="10" />
          <DxPager
            :visible="true"
            :allowed-page-sizes="pageSizes"
            :display-mode="displayMode"
            :show-page-size-selector="showPageSizeSelector"
            :show-info="showInfo"
            :show-navigation-buttons="showNavButtons"
          />
          <DxFilterRow :visible="true" />
          <DxSearchPanel :visible="true" />
          <DxColumnFixing :enabled="true" />
          <DxColumnChooser :enabled="true" />
          <DxGrouping :auto-expand-all="true" />
          <DxGroupPanel :visible="true" />
          <DxLoadPanel :enabled="true" />
        </DxDataGrid>
      </div>
    </div>
  </b-card>
</template>

<script>
import axios from '@axios';
import { BCard, BButton } from 'bootstrap-vue';
import 'devextreme/dist/css/dx.light.css';
import {
  DxSelection,
  DxMasterDetail,
  DxDataGrid,
  DxColumn,
  DxEditing,
  DxScrolling,
  DxColumnFixing,
  DxSearchPanel,
  DxColumnChooser,
  DxGroupPanel,
  DxGrouping,
  DxFilterRow,
  DxPaging,
  DxPager,
  DxKeyboardNavigation,
  DxExport,
  DxLoadPanel
} from 'devextreme-vue/data-grid';
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue';
import DetailTemplate from './WorkDetail.vue';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import DxButton from 'devextreme-vue/button';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';

const dataGridRef = 'dataGrid';

export default {
  components: {
    DetailTemplate,
    DxSelection,
    BButton,
    DxMasterDetail,
    DxFilterRow,
    DxColumn,
    DxColumnFixing,
    DxDataGrid,
    DxEditing,
    DxScrolling,
    DxSearchPanel,
    BCard,
    DxColumnChooser,
    DxGroupPanel,
    DxGrouping,
    DxPaging,
    DxPager,
    DxKeyboardNavigation,
    DxExport,
    DxButton,
    DxLoadPanel
  },
  data() {
    return {
      data: [],
      dataLoading: true,
      error: '',
      displayModes: [
        { text: "Display Mode 'full'", value: 'full' },
        { text: "Display Mode 'compact'", value: 'compact' }
      ],
      displayMode: 'full',
      pageSizes: [15, 25, 50, 100],
      showPageSizeSelector: true,
      showInfo: true,
      showNavButtons: true,
      enterKeyActions: ['startEdit', 'moveFocus'],
      enterKeyDirections: ['none', 'column', 'row'],
      enterKeyDirection: 'row',
      enterKeyAction: 'moveFocus',
      dataGridRef
    };
  },
  mounted() {
    this.refreshData();
  },
  computed: {
    dataGrid: function () {
      return this.$refs[dataGridRef].instance;
    }
  },
  methods: {
    refreshData() {
      this.dataLoading = true;
      this.error = '';
      axios
        .get('/list-work')
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
    closeAllMasterDetail() {
      this.$refs['dataGrid'].instance.collapseAll(-1);
    },
    onExporting(e) {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet('Main sheet');
      exportDataGrid({
        component: e.component,
        worksheet: worksheet,
        customizeCell: function (options) {
          const excelCell = options;
          excelCell.font = { name: 'Arial', size: 12 };
          excelCell.alignment = { horizontal: 'left' };
        }
      }).then(function () {
        workbook.xlsx.writeBuffer().then(function (buffer) {
          saveAs(
            new Blob([buffer], { type: 'application/octet-stream' }),
            'DataGrid.xlsx'
          );
        });
      });
      e.cancel = true;
    },
    exportGrid() {
      const doc = new jsPDF();
      exportDataGridToPdf({
        jsPDFDocument: doc,
        component: this.dataGrid
      }).then(() => {
        doc.save('Work.pdf');
      });
    },
    onFocusedCellChanging(e) {
      e.isHighlighted = true;
    },
    filterSelection({ value }) {
      this.selectionChangedBySelectBox = true;

      let prefix = value;

      if (!prefix) {
        return;
      } else if (prefix === 'All') {
        this.selectedRowKeys = this.employees.map((employee) => employee.ID);
      } else {
        this.selectedRowKeys = this.employees
          .filter((employee) => employee.Prefix === prefix)
          .map((employee) => employee.ID);
      }

      this.prefix = prefix;
    },
    clearSelection() {
      const dataGrid = this.$refs[this.dataGridRefName].instance;

      dataGrid.clearSelection();
    },
    customizeExcelCell(options) {
      var gridCell = options.gridCell;
      if (!gridCell) {
        return;
      }

      if (gridCell.rowType === 'data') {
        if (gridCell.data.OrderDate < new Date(2014, 2, 3)) {
          options.font.color = '#AAAAAA';
        }
        if (gridCell.data.SaleAmount > 15000) {
          if (gridCell.column.dataField === 'OrderNumber') {
            options.font.bold = true;
          }
          if (gridCell.column.dataField === 'SaleAmount') {
            options.backgroundColor = '#FFBB00';
            options.font.color = '#000000';
          }
        }
      }

      if (gridCell.rowType === 'group') {
        if (gridCell.groupIndex === 0) {
          options.backgroundColor = '#BEDFE6';
        }
        if (gridCell.groupIndex === 1) {
          options.backgroundColor = '#C9ECD7';
        }
        if (gridCell.column.dataField === 'Employee') {
          options.value = `${gridCell.value} (${gridCell.groupSummaryItems[0].value} items)`;
          options.font.bold = false;
        }
        if (gridCell.column.dataField === 'SaleAmount') {
          options.value = gridCell.groupSummaryItems[0].value;
          options.numberFormat = '&quot;Max: &quot;$0.00';
        }
      }

      if (
        gridCell.rowType === 'groupFooter' &&
        gridCell.column.dataField === 'SaleAmount'
      ) {
        options.value = gridCell.value;
        options.numberFormat = '&quot;Sum: &quot;$0.00';
        options.font.italic = true;
      }

      if (
        gridCell.rowType === 'totalFooter' &&
        gridCell.column.dataField === 'SaleAmount'
      ) {
        options.value = gridCell.value;
        options.numberFormat = '&quot;Total Sum: &quot;$0.00';
      }
    }
  }
};
</script>

<style lang="scss">
@import './tables.scss';
.dx-master-detail-cell {
  background-color: #ffc107 !important;
}

.dx-datagrid-rowsview .dx-row-focused.dx-data-row .dx-command-edit .dx-link,
.dx-datagrid-rowsview .dx-row-focused.dx-data-row > td:not(.dx-focused),
.dx-datagrid-rowsview .dx-row-focused.dx-data-row > tr > td:not(.dx-focused) {
  background-color: #ffc107;
  color: #fff;
  border-bottom: none;
}
</style>
