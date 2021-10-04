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
      tableName: 'sub-contractor',
      tableColumns: [
        {
          id: 'id',
          name: 'ID',
          allowEdit: false
        },
        {
          id: 'code',
          name: this.$t('subContractor.code')
        },
        {
          id: 'name',
          name: this.$t('subContractor.name')
        }
      ],
      useLanguageSelector: false,
      useImport: false
    };
  }
};
</script>
