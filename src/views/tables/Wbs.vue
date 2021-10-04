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
      tableName: 'wbs',
      keyExpr: 'id',
      tableColumns: [
        {
          id: 'code',
          name: this.$t('wbs.wbsCode')
        },
        {
          id: 'name',
          name: this.$t('wbs.wbsName')
        },
        {
          id: 'mobile_name',
          name: this.$t('wbs.wbsMobileName')
        },
        {
          id: 'site_id',
          name: this.$t('wbs.siteName'),
          allowEdit: false,
          lookup: {
            table: 'site',
            displayExpr: 'name',
            valueExpr: 'id'
          }
        }
      ],
      useLanguageSelector: true,
      useImport: false
    };
  }
};
</script>
