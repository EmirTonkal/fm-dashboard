<template>
  <TableTemplate
    :table-name="tableName"
    :table-columns="tableColumns"
    :use-language-selector="useLanguageSelector"
    :key-expr="keyExpr"
    :use-import="useImport"
  />
</template>

<script>
import TableTemplate from './TableTemplate';

export default {
  components: {
    TableTemplate
  },
  data() {
    return {
      tableName: 'activity',
      keyExpr: 'id',
      tableColumns: [
        {
          id: 'wbs_id',
          name: this.$t('activity.wbsCode'),
          lookup: {
            table: 'wbs',
            displayExpr: 'code',
            valueExpr: 'id'
          }
        },
        {
          id: 'wbs_name',
          name: this.$t('activity.wbsName'),
          ignorePost: true
        },
        {
          id: 'wbs_mobile_name',
          name: this.$t('activity.wbsMobileName'),
          ignorePost: true
        },
        {
          id: 'code',
          name: this.$t('activity.activityCode')
        },
        {
          id: 'name',
          name: this.$t('activity.activityName')
        },
        {
          id: 'responsible',
          name: this.$t('activity.responsible')
        },
        {
          id: 'start',
          name: this.$t('activity.start'),
          dataType: 'date'
        },
        {
          id: 'finish',
          name: this.$t('activity.finish'),
          dataType: 'date'
        },
        {
          id: 'original_duration',
          name: this.$t('activity.originalDuration'),
          dataType: 'number'
        },
        {
          id: 'unit_id',
          name: this.$t('activity.um'),
          lookup: {
            table: 'unit',
            displayExpr: 'symbol',
            valueExpr: 'id'
          }
        },
        {
          id: 'total_qty',
          name: this.$t('activity.totalQty'),
          dataType: 'number'
        },
        {
          id: 'achieved_qty',
          name: this.$t('activity.achievedQty'),
          dataType: 'number'
        },
        {
          id: 'manday',
          name: 'Manday',
          dataType: 'number'
        },
        {
          id: 'boq_resource_id',
          name: this.$t('activity.boqResourceId')
        },
        {
          id: 'boq_um_unit_id',
          name: this.$t('activity.boqUM'),
          lookup: {
            table: 'unit',
            displayExpr: 'symbol',
            valueExpr: 'id'
          }
        },
        { id: 'boq_coef', name: this.$t('activity.boqCoefficient') },
        {
          id: 'wastage',
          name: this.$t('activity.wastage'),
          dataType: 'number'
        },
        {
          id: 'report_order_1',
          name: this.$t('activity.reportOrder1')
        },

        {
          id: 'report_order_1_coef',
          name: this.$t('activity.reportOrder1Coef')
        },
        {
          id: 'report_order_2',
          name: this.$t('activity.reportOrder2')
        },
        {
          id: 'report_order_2_unit_id',
          name: this.$t('activity.reportOrder2um'),
          lookup: {
            table: 'unit',
            displayExpr: 'symbol',
            valueExpr: 'id'
          }
        },
        {
          id: 'report_order_2_coef',
          name: this.$t('activity.reportOrder2Coef')
        },
        {
          id: 'report_order_3',
          name: this.$t('activity.reportOrder3')
        },
        {
          id: 'report_order_3_unit_id',
          name: this.$t('activity.reportOrder3UnitId'),
          lookup: {
            table: 'unit',
            displayExpr: 'symbol',
            valueExpr: 'id'
          }
        },
        {
          id: 'report_order_3_coef',
          name: this.$t('activity.reportOrder3Coef')
        }
      ],
      useLanguageSelector: true,
      useImport: true
    };
  }
};
</script>
