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
      tableName: 'site-sub-contractor-user',
      keyExpr: 'id',
      tableColumns: [
        {
          id: 'id',
          name: 'ID',
          allowEdit: false
        },
        {
          id: 'name',
          name: this.$t('subContractorUser.name')
        },
        {
          id: 'lastname',
          name: this.$t('subContractorUser.lastName')
        },
        {
          id: 'username',
          name: this.$t('subContractorUser.username')
        },
        {
          id: 'sub_firms[0].id',
          name: this.$t('subContractorUser.subContractorName'),
          ignorePost: false,
          lookup: {
            table: 'sub-contractor',
            displayExpr: 'name',
            valueExpr: 'id'
          }
        },
        {
          id: 'password',
          name: this.$t('subContractorUser.password')
        }
      ],
      useLanguageSelector: false,
      useImport: false
    };
  }
};
</script>
