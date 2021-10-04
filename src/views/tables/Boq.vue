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
      tableName: 'boq',
      keyExpr: 'id',
      tableColumns: [
        {
          id: 'id',
          name: 'ID',
          allowEdit: false
        },
        {
          id: 'site_id',
          name: this.$t('boq.siteName'),
          lookup: {
            table: 'site',
            displayExpr: 'name',
            valueExpr: 'id'
          }
        },
        {
          id: 'sort_order',
          name: this.$t('boq.sortOrder')
        },
        {
          id: 'sort_order_description',
          name: this.$t('boq.sortOrderDescription')
        },
        {
          id: 'section_code',
          name: this.$t('boq.sectionCode')
        },
        {
          id: 'section_name',
          name: this.$t('boq.sectionName')
        },
        {
          id: 'boq_code',
          name: this.$t('boq.boqCode')
        },
        {
          id: 'boq_name',
          name: this.$t('boq.boqName')
        },
        {
          id: 'report_order_1',
          name: this.$t('boq.boqReportOrder1')
        },
        {
          id: 'report_order_2',
          name: this.$t('boq.boqReportOrder2')
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
          name: this.$t('boq.unit'),
          lookup: {
            table: 'unit',
            displayExpr: 'symbol',
            valueExpr: 'id'
          }
        },
        {
          id: 'quantity',
          name: this.$t('boq.qty'),
          dataType: 'number'
        },
        {
          id: 'price1',
          name: this.$t('boq.price1'),
          dataType: 'number'
        },
        {
          id: 'currency_id_1',
          name: this.$t('boq.currency1'),
          lookup: {
            table: 'currency',
            displayExpr: 'symbol',
            valueExpr: 'id'
          }
        },
        {
          id: 'price2',
          name: this.$t('boq.price2'),
          dataType: 'number'
        },
        {
          id: 'currency_id_2',
          name: this.$t('boq.currency2'),
          lookup: {
            table: 'currency',
            displayExpr: 'symbol',
            valueExpr: 'id'
          }
        },
        {
          id: 'price3',
          name: this.$t('boq.price3'),
          dataType: 'number'
        },
        {
          id: 'currency_id_3',
          name: this.$t('boq.currency3'),
          lookup: {
            table: 'currency',
            displayExpr: 'symbol',
            valueExpr: 'id'
          }
        },
        {
          id: 'discount',
          name: this.$t('boq.discount'),
          dataType: 'number'
        }
      ],
      useLanguageSelector: true,
      useImport: true
    };
  }
};
</script>
