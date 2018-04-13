// mapbox-gl
import mapboxgl from 'mapbox-gl'

// api sources digitale delta
import {
  apisources
} from './apisources.js'
import {
  apilayers
} from './apilayers.js'

// module scope variables
var app
var map

// app instance
export default {
  data () {
    return {
      sources: apisources,
      source: '',
      location: '',
      parameters: [],
      parameter: '',
      layer: {},
      wait: false
    }
  },
  watch: {
    source (newSource, oldSource) {
      if (oldSource) {
        map.setLayoutProperty(oldSource, 'visibility', 'none')
      }
      if (this.layer[newSource]) {
        map.setLayoutProperty(newSource, 'visibility', 'visible')
      } else {
        app.addLayer(newSource)
      }
    },
    parameter (newParameter, oldParameter) {
      console.log(newParameter)
    }
  },
  methods: {
    setCursor (cursor) {
      if (!app.wait) {
        document.body.style.cursor = cursor
        map.getCanvas().style.cursor = cursor
      }
    },
    addLayer (source) {
      // load api data and add it as layer to the map
      app.setCursor('wait')
      app.wait = true
      var api = apisources.find(s => s.id === source)
      var url = api.baseUrl + '/locations'
      if (api.options) url += '?' + api.options
      fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        var layer = apilayers.find(l => l.id === source)
        layer.source = parseLayerData(data.results)
        app.layer[source] = layer
        map.addLayer(layer)
        setupLayerEvents(layer)
        app.wait = false
        app.setCursor('')
      })
      .catch(function (err) {
        console.log('error loading data: ' + err)
        app.wait = false
        app.setCursor('')
      })
    },
    openLocation (location) {
      // open data popup for selected location
      app.setCursor('wait')
      app.wait = true
      app.location = location
      var api = apisources.find(s => s.id === this.source)
      fetch(api.baseUrl + '/timeseries?' + api.searchTerm + '=' + location.code + '&pagesize=10000')
      .then((resp) => resp.json())
      .then((data) => {
        app.parameters = parseParameters(data.results)
        app.wait = false
        app.setCursor('')
      })
      .catch(function (err) {
        console.log('error loading data: ' + err)
        app.parameters = parseParameters([])
        app.wait = false
        app.setCursor('')
      })
    }
  },
  name: 'App',
  components: {
  },
  mounted () {
    // app at module scope
    app = this
    // wait for vue to load
    app.$nextTick(() => {
      map = app.$refs.map.map
      // MapBox popup, for later use
      map.popup = new mapboxgl.Popup({
        closeButton: false
      })
    })
  }
}

function setupLayerEvents (layer) {
  // when the mouse enters a feature of a layer
  map.on('mouseenter', layer.id, (e) => {
    // change cursor to a pointer and show popup with information
    app.setCursor('pointer')
    map.popup.setLngLat(e.lngLat)
      .setHTML('Location: ' + e.features[0].properties.name + ' (Code: ' + e.features[0].properties.code + ')')
      .addTo(map)
  })
  // when mouse leaves a layer
  map.on('mouseleave', layer.id, () => {
    // cursors changes back to default and popup is removed
    app.setCursor('')
    map.popup.remove()
  })
  // when a location in the map is clicked
  map.on('click', layer.id, (e) => {
    // open the location popup
    app.openLocation(e.features[0].properties)
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

function parseParameters (apidata) {
  // extract list of available series per observation type
  var params = []
  apidata.forEach(data => {
    var ot = data.observationType
    if (!ot.qualifier) {
      ot.qualifier = ''
    }
    var p = params.find(p => p.uuid === ot.uuid)
    if (!p) {
      ot.name = ot.quantity + ' ' + ot.qualifier + ' (' + ot.parameterCode + ')'
      ot.series = [ data.uuid ]
      params.push(ot)
    } else {
      p.series.push(data.uuid)
    }
  })
  if (params.length === 0) {
    params.push({
      uuid: '',
      name: 'No data available'
    })
  }
  // add series count per parameter
  params.forEach((p) => {
    p.name = p.name + ' x ' + p.series.length
  })
  // sort by name
  params.sort((a, b) => {
    return (a.parameterCode > b.parameterCode) ? 1 : (a.parameterCode < b.parameterCode) ? -1 : 0
  })
  return params
}
