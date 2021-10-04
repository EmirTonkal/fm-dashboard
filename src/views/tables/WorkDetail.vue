<template>
  <div style="display: flex">
    <div
      v-if="
        loadPersonnelData ||
        loadMaterialData ||
        loadMachineData ||
        loadProblemData
      "
      class="spinner-border m-auto"
      role="status"
    >
      <span class="sr-only">Loading...</span>
    </div>
    <div v-else>
      <DxTabPanel>
        <DxItem :title="$t('table.personnel')" template="personnel-tab" />
        <template #personnel-tab>
          <DxDataGrid
            id="work-personnel-table"
            ref="data-grid-personnel"
            width="100%"
            :data-source="workPersonnel"
            :show-borders="true"
            :allow-column-reordering="true"
            :allow-column-resizing="true"
            column-resizing-mode="widget"
            :column-auto-width="true"
            :show-column-lines="true"
            :show-row-lines="true"
            :row-alternation-enabled="true"
            :hover-state-enabled="true"
            key-expr="id"
          >
            >
            <DxColumn
              data-field="created_at"
              data-type="date"
              :caption="$t('table.date')"
              format="dd.MM.yyyy"
              class="bold-detail"
            /><!-- <DxColumn
              data-field="null"
              caption="Pers. Group Code"
              :visible="false"
            /><DxColumn
              data-field="null"
              caption="Pers. Code"
              :visible="false"
            /> -->
            <!-- if you have a pers. code, make a active -->
            <DxColumn data-field="type" :caption="$t('table.description')" />
            <DxColumn
              data-field="count"
              caption="NO"
              alignment="center"
              format="0"
            />
            <DxColumn
              data-field="hour"
              :caption="$t('table.hour')"
              alignment="center"
              format="0.00"
              :customize-text="customizeText"
            />
            <DxColumn data-field="notes" :caption="$t('table.notes')" />

            <DxColumnChooser :enabled="true" mode="dragAndDrop" />
            <DxSearchPanel :visible="true" style="margin-right: 20px" />
          </DxDataGrid>
        </template>
        <DxItem :title="$t('table.material')" template="material-tab" />
        <template #material-tab>
          <DxDataGrid
            id="work-material-table"
            ref="data-grid-personnel"
            width="100%"
            :data-source="workMaterial"
            :show-borders="true"
            :allow-column-reordering="true"
            :allow-column-resizing="true"
            column-resizing-mode="widget"
            :column-auto-width="true"
            :show-column-lines="true"
            :show-row-lines="true"
            :row-alternation-enabled="true"
            :hover-state-enabled="true"
            key-expr="id"
          >
            <DxColumn
              data-field="created_at"
              data-type="date"
              :caption="$t('table.date')"
              format="dd.MM.yyyy"
            /><!-- <DxColumn
              data-field="null"
              caption="Mat. Group Code"
              :visible="false"
            /><DxColumn
              data-field="null"
              caption="Pers. Code"
              :visible="false"
            /> -->
            <!-- <DxColumn data-field="null" caption="Material Group" /> -->
            <!-- if you have a material detail, make a active -->
            <DxColumn
              data-field="matereial"
              :caption="$t('table.material')"
            /><DxColumn
              data-field="quantity"
              :caption="$t('table.quantity')"
              format="#.000"
            /><!-- <DxColumn data-field="null" caption="UM" /> -->

            <DxColumn
              data-field="description"
              :caption="$t('table.description')"
            />

            <DxColumn data-field="notes" :caption="$t('table.notes')" />

            <DxColumnChooser :enabled="true" mode="dragAndDrop" />
            <DxSearchPanel :visible="true" />
          </DxDataGrid>
        </template>
        <DxItem :title="$t('table.machine')" template="machine-tab" />
        <template #machine-tab>
          <DxDataGrid
            id="work-machine-table"
            ref="data-grid-personnel"
            width="100%"
            :data-source="workMachine"
            :show-borders="true"
            :allow-column-reordering="true"
            :allow-column-resizing="true"
            column-resizing-mode="widget"
            :column-auto-width="true"
            :show-column-lines="true"
            :show-row-lines="true"
            :row-alternation-enabled="true"
            :hover-state-enabled="true"
            key-expr="id"
          >
            <DxColumn
              data-field="created_at"
              data-type="date"
              :caption="$t('table.date')"
              format="dd.MM.yyyy"
            />
            <DxColumn data-field="type" :caption="$t('table.machine')" />
            <!-- <DxColumn data-field="null" caption="Machine Group" /> -->
            <DxColumn data-field="count" caption="NO" format="0" />
            <DxColumn
              data-field="hour"
              :caption="$t('table.hour')"
              format="#.00"
            />
            <DxColumn data-field="notes" :caption="$t('table.notes')" />

            <DxColumnChooser :enabled="true" mode="dragAndDrop" />
            <DxSearchPanel :visible="true" />
          </DxDataGrid>
        </template>
        <DxItem :title="$t('table.problem')" template="problem-tab" />
        <template #problem-tab>
          <DxDataGrid
            id="work-problem-table"
            ref="data-grid-personnel"
            width="100%"
            :data-source="workProblem"
            :show-borders="true"
            :allow-column-reordering="true"
            :allow-column-resizing="true"
            column-resizing-mode="widget"
            :column-auto-width="false"
            :show-column-lines="true"
            :show-row-lines="true"
            :row-alternation-enabled="true"
            :hover-state-enabled="true"
            key-expr="id"
            :row-auto-height="true"
          >
            <DxColumn
              data-field="created_at"
              data-type="date"
              :caption="$t('table.date')"
              format="dd.MM.yyyy"
            />
            <DxColumn data-field="problem" caption="Problem" />
            <DxColumn
              data-field="explanation"
              :caption="$t('table.explanation')"
              :cell-hint-enabled="true"
              :visible="true"
              cell-template="exp-cell"
            />
            <template #exp-cell="{ data }">
              <!-- <div v-for="items in workProblem" :key="items.id">
                {{ items.explanation }}
              </div> -->
              <div
                style="
                  height: auto;
                  overflow-wrap: break-word;
                  white-space: normal;
                "
              >
                {{ test(data) }}
              </div>
            </template>

            <DxColumn data-field="actions" :caption="$t('table.actions')" />
            <DxColumn
              data-field="is_resolved"
              :caption="$t('table.is_resolved')"
            />
            <DxColumn
              data-field="resolved_at"
              data-type="date"
              :caption="$t('table.resolved_at')"
              format="dd.MM.yyyy"
            />
            <DxColumnChooser :enabled="true" mode="dragAndDrop" />
            <DxSearchPanel :visible="true" />
          </DxDataGrid>
        </template>
      </DxTabPanel>
    </div>
  </div>
</template>

<script>
import axios from '@axios';
import { DxTabPanel, DxItem } from 'devextreme-vue/tab-panel';
import {
  DxDataGrid,
  DxColumn,
  DxColumnChooser,
  DxSearchPanel
} from 'devextreme-vue/data-grid';
import 'devextreme/dist/css/dx.light.css';
import { data } from 'vue-echarts';

export default {
  components: {
    DxTabPanel,
    DxItem,
    DxDataGrid,
    DxColumn,
    DxColumnChooser,
    DxSearchPanel
  },
  props: {
    templateData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      work: this.templateData.data,
      loadPersonnelData: true,
      loadMaterialData: true,
      loadMachineData: true,
      loadProblemData: true,
      workPersonnel: [],
      workMaterial: [],
      workMachine: [],
      workProblem: [],
      error: '',
      defaultVisible: false
    };
  },
  mounted() {
    this.getPersonnelData();
    this.getMaterialData();
    this.getMachineData();
    this.getProblemData();
  },
  methods: {
    getPersonnelData() {
      axios
        .get(`/list-work-personnel/${this.work.id}`)
        .then((response) => {
          if (response.status === 200) {
            this.workPersonnel = response?.data?.result || [];
            this.loadPersonnelData = false;
          } else {
            this.error = response?.data?.message || 'Unexpected API error';
            this.loadPersonnelData = false;
          }
        })
        .catch((e) => {
          this.error = e?.response?.data?.message || e?.message;
          this.loadPersonnelData = false;
        });
    },
    getMaterialData() {
      axios
        .get(`/list-work-material/${this.work.id}`)
        .then((response) => {
          if (response.status === 200) {
            this.workMaterial = response?.data?.result || [];
            this.loadMaterialData = false;
          } else {
            this.error = response?.data?.message || 'Unexpected API error';
            this.loadMaterialData = false;
          }
        })
        .catch((e) => {
          this.error = e?.response?.data?.message || e?.message;
          this.loadMaterialData = false;
        });
    },
    getMachineData() {
      axios
        .get(`/list-work-machine/${this.work.id}`)
        .then((response) => {
          if (response.status === 200) {
            this.workMachine = response?.data?.result || [];
            this.loadMachineData = false;
          } else {
            this.error = response?.data?.message || 'Unexpected API error';
            this.loadMachineData = false;
          }
        })
        .catch((e) => {
          this.error = e?.response?.data?.message || e?.message;
          this.loadMachineData = false;
        });
    },
    getProblemData() {
      axios
        .get(`/list-work-problem/${this.work.id}`)
        .then((response) => {
          if (response.status === 200) {
            this.workProblem = response?.data?.result || [];
            this.loadProblemData = false;
          } else {
            this.error = response?.data?.message || 'Unexpected API error';
            this.loadProblemData = false;
          }
        })
        .catch((e) => {
          this.error = e?.response?.data?.message || e?.message;
          this.loadProblemData = false;
        });
    },
    test(data) {
      console.log(data);
      return data.value;
    }
  }
};
</script>
<style>
.dx-cell-focus-disabled {
  font-weight: bold;
}

/* .dx-item-content {
  margin-right: 20px; 
} */
</style>
