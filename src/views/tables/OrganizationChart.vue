<template>
  <div class="container">
    <div id="tree">
      <GChart
        :settings="{
          packages: ['orgchart'],
          callback: () => {
            this.drawChart();
          }
        }"
        type="OrgChart"
        :data="chartData"
      />
    </div>
  </div>
</template>

<script>
import { GChart } from 'vue-google-charts';

export default {
  components: {
    GChart
  },
  data() {
    return {
      chartData: null,
      items: [{}]
    };
  },
  methods: {
    drawChart() {
      this.chartData = new google.visualization.DataTable();
      this.chartData.addColumn('string', 'Name');
      this.chartData.addColumn('string', 'Manager');
      this.chartData.addColumn('string', 'ToolTip');

      this.chartData.addRows([
        [
          {
            v: 'CEO',
            f:
              'CEO<button style="color:red; font-style:italic" class="ceo-plus">+</button>'
          },
          '',
          ''
        ],
        [
          {
            v: 'CTO',
            f:
              'CTO<button style="color:red; font-style:italic" class="cto-plus">+</button>'
          },
          'CEO',
          'VP'
        ],
        ['CMD', 'CEO', ''],
        ['Project Manager', 'CTO', ''],
        ['Emir', 'Project Manager', '']
      ]);

      var chart = new google.visualization.OrgChart(
        document.getElementById('tree')
      );
      chart.draw(this.chartData, { allowHtml: true });
    },
    add: function (item) {
      this.items.push(item);
    }
  },
  mounted: function () {
    this.add({ no: '1', name: 'Tom Tom', gender: 'male' });
    this.add({ no: '2', name: 'Marcos Huck', gender: 'male' });
  }
};
</script>

<style>
table {
  border-collapse: inherit;
  border-spacing: 0;
}
</style>
