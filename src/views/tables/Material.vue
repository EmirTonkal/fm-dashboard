<template>
  <TableTemplate
    :table-name="tableName"
    :table-columns="tableColumns"
    :use-language-selector="useLanguageSelector"
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
      tableName: 'material',
      tableColumns: [
        {
          id: 'id',
          name: 'ID',
          allowEdit: false
        },
        {
          id: 'group_id',
          name: this.$t('material.groupName'),
          lookup: {
            table: 'material-group',
            valueExpr: 'id',
            displayExpr: 'name'
          }
        },
        {
          id: 'unit_id',
          name: this.$t('material.unit'),
          lookup: {
            table: 'unit',
            valueExpr: 'id',
            displayExpr: 'symbol'
          }
        },
        {
          id: 'code',
          name: this.$t('material.code')
        },
        {
          id: 'name',
          name: this.$t('material.name')
        }
      ],
      useLanguageSelector: true,
      useImport: true
    };
  }
};
</script>
