// api sources digitale delta
import {
  apisources
} from './apisources.js'
import {
  apilayers
} from './apilayers.js'

// app instance
export default {
  data () {
    return {
      selected: '',
      layer: {}
    }
  },
  computed: {
    selection: function () {
      var ids = []
      apisources.forEach((src) => {
        ids.push(src.id)
      })
      return ids
    }
  },
  watch: {
    selected (newSource, oldSource) {
      if (oldSource) {
        this.map.setLayoutProperty(oldSource, 'visibility', 'none')
      }
      if (this.layer[newSource]) {
        this.map.setLayoutProperty(newSource, 'visibility', 'visible')
      } else {
        this.addLayer(newSource)
      }
    }

  },
  methods: {
    addLayer (id) {
      // load api data and add it as layer to the map
      var url = apisources.find(s => s.id === id).baseurl
      fetch(url + '/locations?pagesize=100000')
      .then((resp) => resp.json())
      .then((data) => {
        var layer = apilayers.find(l => l.id === id)
        layer.source = parseLayerData(data.results)
        this.$refs.map.map.addLayer(layer)
        this.layer[id] = layer
      })
      .catch(function (err) {
        console.log('error loading data: ' + err)
      })
    }
  },
  name: 'App',
  components: {
  },
  mounted () {
    this.$nextTick(() => {
      this.map = this.$refs.map.map
    })
  }
}

function parseLayerData (apidata) {
  // re-format the api data to geojson
  var geojsonarray = []
  apidata.forEach((item) => {
    geojsonarray.push({
      'type': 'Feature',
      'geometry': item.geometry,
      'properties': {
        'uuid': item.uuid,
        'url': item.url,
        'code': item.code,
        'name': item.name
      }
    })
  })
  // MapBox data source format
  var source = {
    'type': 'geojson',
    'data': {
      'type': 'FeatureCollection',
      'features': geojsonarray
    }
  }
  return source
}
