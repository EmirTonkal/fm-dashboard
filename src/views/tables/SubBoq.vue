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
      tableName: 'sub-boq',
      keyExpr: 'id',
      tableColumns: [
        {
          id: 'id',
          name: 'ID',
          allowEdit: false
        },
        {
          id: 'section_code',
          name: this.$t('subBoq.sectionCode')
        },
        {
          id: 'section_name',
          name: this.$t('subBoq.sectionName')
        },
        {
          id: 'boq.boq_code',
          name: this.$t('subBoq.connectionBoq')
        },
        {
          id: 'boq_code',
          name: this.$t('subBoq.boqCode')
        },
        {
          id: 'boq_name',
          name: this.$t('subBoq.boqName')
        },
        {
          id: 'report_order_1',
          name: this.$t('subBoq.boqReportOrder1')
        },
        {
          id: 'report_order_2',
          name: this.$t('subBoq.boqReportOrder2')
        },
        {
          id: 'report_order_unit_id',
          name: 'R.O.UM',
          lookup: {
            table: 'unit',
            displayExpr: 'symbol',
            valueExpr: 'id'
          }
        },
        {
          id: 'report_order_coef',
          name: 'R.O.Coef'
        },
        {
          id: 'unit_id',
          name: this.$t('subBoq.unit'),
          lookup: {
            table: 'unit',
            displayExpr: 'symbol',
            valueExpr: 'id'
          }
        },
        {
          id: 'quantity',
          name: this.$t('subBoq.qty'),
          dataType: 'number'
        },
        {
          id: 'price1',
          name: this.$t('subBoq.price1'),
          dataType: 'number'
        },
        {
          id: 'currency_id_1',
          name: this.$t('subBoq.currency1'),
          lookup: {
            table: 'currency',
            displayExpr: 'symbol',
            valueExpr: 'id'
          }
        },
        {
          id: 'price2',
          name: this.$t('subBoq.price2'),
          dataType: 'number'
        },
        {
          id: 'currency_id_2',
          name: this.$t('subBoq.currency2'),
          lookup: {
            table: 'currency',
            displayExpr: 'symbol',
            valueExpr: 'id'
          }
        },
        {
          id: 'price3',
          name: this.$t('subBoq.price3'),
          dataType: 'number'
        },
        {
          id: 'currency_id_3',
          name: this.$t('subBoq.currency3'),
          lookup: {
            table: 'currency',
            displayExpr: 'symbol',
            valueExpr: 'id'
          }
        },
        {
          id: 'discount',
          name: this.$t('subBoq.discount'),
          dataType: 'number'
        }
      ],
      useLanguageSelector: true,
      useImport: true
    };
  }
};
</script>
