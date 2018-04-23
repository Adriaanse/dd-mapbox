// note: ChartJS requires MomentJS for time-axes suppoert
// eslint-disable-next-line no-unused-vars
import moment from 'moment'
import Chart from 'chart.js'

export default {
  data () {
    return {
      canvas: null,
      chart: null,
      options: {
        animation: false,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true,
            type: 'time',
            time: {
              displayFormats: {
                month: 'D MMM',
                week: 'D'
              },
              tooltipFormat: 'HH:mm DD/MM/YY'
            }
          }]
        }
      }
    }
  },
  props: ['data'],
  watch: {
    data () {
      this.loadChartJS()
    }
  },
  methods: {
    loadChartJS () {
      if (this.chart) this.chart.destroy()
      if (this.data) {
        this.chart = new Chart(this.canvas, {
          type: 'line',
          data: {
            labels: [],
            datasets: [{
              fill: false,
              data: this.data
            }]
          },
          options: this.options
        })
      }
    }
  },
  mounted () {
    // vue generated id is used as ref
    this.canvas = this.$refs[this._uid]

    // load initial dataset ?
    if (this.data) this.loadChartJS()
  }
}
