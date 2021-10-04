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
      tableName: 'wbs-sub-boq',
      keyExpr: 'id',
      tableColumns: [
        {
          id: 'id',
          name: 'ID',
          allowEdit: false
        },
        {
          id: 'sub_boq_code',
          name: this.$t('wbsSubBoq.subBoqCode'),
          allowEdit: false
        },
        {
          id: 'sub_boq_description',
          name: this.$t('wbsSubBoq.subBoqDescription')
        },
        {
          id: 'unit_id',
          name: this.$t('wbsSubBoq.unit'),
          lookup: {
            table: 'unit',
            displayExpr: 'symbol',
            valueExpr: 'id'
          }
        },
        {
          id: 'description',
          name: this.$t('wbsSubBoq.description')
        },
        {
          id: 'boq.boq_code',
          name: this.$t('wbsSubBoq.boqResourceCode')
        },
        {
          id: 'quantity_inc',
          name: 'Quantity INC'
        },
        {
          id: 'report_order_1',
          name: this.$t('wbsSubBoq.reportOrder1')
        },
        {
          id: 'report_order_1_unit_id',
          name: this.$t('wbsSubBoq.reportOrder1um'),
          lookup: {
            table: 'unit',
            displayExpr: 'symbol',
            valueExpr: 'id'
          }
        },
        {
          id: 'report_order_1_coef',
          name: this.$t('wbsSubBoq.reportOrder1Coef')
        },
        {
          id: 'report_order_2',
          name: this.$t('wbsSubBoq.reportOrder2')
        },
        {
          id: 'report_order_2_unit_id',
          name: this.$t('wbsSubBoq.reportOrder2um'),
          lookup: {
            table: 'unit',
            displayExpr: 'symbol',
            valueExpr: 'id'
          }
        },
        {
          id: 'report_order_2_coef',
          name: this.$t('wbsSubBoq.reportOrder2Coef')
        },
        {
          id: 'report_order_3',
          name: this.$t('wbsSubBoq.reportOrder3')
        },
        {
          id: 'report_order_3_unit_id',
          name: this.$t('wbsSubBoq.reportOrder3um'),
          lookup: {
            table: 'unit',
            displayExpr: 'symbol',
            valueExpr: 'id'
          }
        },
        {
          id: 'report_order_3_coef',
          name: this.$t('wbsSubBoq.reportOrder3Coef')
        }
      ],
      useLanguageSelector: true,
      useImport: true
    };
  }
};
</script>
<style lang="scss"></style>
