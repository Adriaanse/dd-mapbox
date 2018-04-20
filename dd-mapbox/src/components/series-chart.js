import Chart from 'chart.js'

export default {
  data () {
    return {
      canvas: null,
      chart: null,
      options: {
        scales: {
          xaxes: [{
            type: 'time',
            display: true
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
      this.chart = new Chart(this.canvas, {
        type: 'line',
        data: {
          labels: [],
          datasets: [{ data: this.data }]
        },
        options: this.options
      })
    }
  },
  mounted () {
    // vue generated id is used as ref
    this.canvas = this.$refs[this._uid]

    // load initial dataset ?
    if (this.data) this.loadChartJS()
  }
}
