export default [
  {
    title: 'navbar.home',
    route: 'home',
    icon: 'HomeIcon'
  },
  {
    title: 'navbar.tables',
    icon: 'ListIcon',
    children: [
      {
        title: 'navbar.boq',
        route: 'table-boq'
      },
      {
        title: 'navbar.subBoq',
        route: 'table-sub-boq'
      },
      {
        title: 'navbar.wbsSubBoq',
        route: 'table-wbs-sub-boq'
      },
      {
        title: 'navbar.wbs',
        route: 'table-wbs'
      },
      {
        title: 'navbar.activity',
        route: 'table-activity'
      },
      {
        title: 'navbar.material',
        route: 'table-material'
      },
      {
        title: 'navbar.unit',
        route: 'table-unit'
      },
      {
        title: 'navbar.work',
        route: 'table-work'
      },
      {
        title: 'navbar.subContractor',
        route: 'table-sub-contractor'
      },
      {
        title: 'navbar.subContractorUser',
        route: 'table-sub-contractor-user'
      },
      {
        title: 'navbar.user',
        route: 'table-user'
      },
      {
        title: 'navbar.organizationChart',
        route: 'table-organization-chart'
      }
    ]
  },
  {
    title: 'navbar.reports',
    icon: 'FeatherIcon',
    children: [
      {
        title: 'navbar.pivot',
        route: 'report-pivot'
      }
    ]
  }
];
