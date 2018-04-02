// mapbox-gl
import mapboxgl from 'mapbox-gl'

// api sources digitale delta
import {
  apisources
} from './apisources.js'
import {
  apilayers
} from './apilayers.js'

// components
import DataDialog from './components/data-dialog'

// app instance
export default {
  data () {
    return {
      selected: '',
      layer: {},
      showDataDialog: true   // for testing
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
    // handle selection of an api source
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
        this.layer[id] = layer
        this.map.addLayer(layer)
        setupLayerEvents(this.map, layer)
      })
      .catch(function (err) {
        console.log('error loading data: ' + err)
      })
    }
  },
  name: 'App',
  components: {
    'data-dialog': DataDialog
  },
  mounted () {
    this.$nextTick(() => {
      this.map = this.$refs.map.map
      // MapBox popup, for later use
      this.map.popup = new mapboxgl.Popup({
        closeButton: false
      })
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

function setupLayerEvents (map, layer) {
  // when the mouse enters a feature of a layer
  map.on('mouseenter', layer.id, (e) => {
    // change cursor to a pointer and show popup with information
    map.getCanvas().style.cursor = 'pointer'
    var props = e.features[0].properties
    map.popup.setLngLat(e.lngLat)
      .setHTML('Location: ' + props.name + ' (Code: ' + props.code + ')')
      .addTo(map)
  })
  // when mouse leaves a layer
  map.on('mouseleave', layer.id, () => {
    // cursors changes back to default and popup is removed
    map.getCanvas().style.cursor = ''
    map.popup.remove()
  })
}
