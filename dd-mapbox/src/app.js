// mapbox-gl
import mapboxgl from 'mapbox-gl'

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
      sources: apisources,
      source: '',
      location: '',
      layer: {}
    }
  },
  watch: {
    source (newSource, oldSource) {
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
      fetch(url + '/locations?format=json&pagesize=1000000')
      .then((resp) => resp.json())
      .then((data) => {
        var layer = apilayers.find(l => l.id === id)
        layer.source = parseLayerData(data.results)
        this.layer[id] = layer
        this.map.addLayer(layer)
        setupLayerEvents(this, this.map, layer)
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
      // MapBox popup, for later use
      this.map.popup = new mapboxgl.Popup({
        closeButton: false
      })
    })
  }
}

function setupLayerEvents (self, map, layer) {
  // when the mouse enters a feature of a layer
  map.on('mouseenter', layer.id, (e) => {
    // change cursor to a pointer and show popup with information
    map.getCanvas().style.cursor = 'pointer'
    map.popup.setLngLat(e.lngLat)
      .setHTML('Location: ' + e.features[0].properties.name + ' (Code: ' + e.features[0].properties.code + ')')
      .addTo(map)
  })
  // when mouse leaves a layer
  map.on('mouseleave', layer.id, () => {
    // cursors changes back to default and popup is removed
    map.getCanvas().style.cursor = ''
    map.popup.remove()
  })
  // when a location in the map is clicked
  map.on('click', layer.id, (e) => {
    // trigger the location popup
    self.location = e.features[0].properties
  })
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
