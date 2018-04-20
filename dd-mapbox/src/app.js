// mapbox-gl API
import mapboxgl from 'mapbox-gl'

// custom chartjs component
import SeriesChart from './components/SeriesChart'

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
      api: null,
      years: [],
      year: 2018,
      location: '',
      parameters: [],
      parameter: '',
      seriesData: null,
      layer: {},
      wait: false
    }
  },
  watch: {
    source (newSource, oldSource) {
      // load selected api source
      app.clearLocation()
      app.api = apisources.find(s => s.id === newSource)
      if (app.api.year) {
        app.year = app.api.year
      }
      if (oldSource && app.layer[oldSource]) {
        map.setLayoutProperty(oldSource, 'visibility', 'none')
      }
      if (app.layer[newSource]) {
        map.setLayoutProperty(newSource, 'visibility', 'visible')
      } else {
        app.loadLocations(newSource)
      }
    },
    parameter (newParameter, oldParameter) {
      // load selected parameter
      app.loadParameter(app.parameters.find(p => p.uuid === newParameter))
    }
  },
  methods: {
    setCursor (cursor) {
      if (!app.wait) {
        document.body.style.cursor = cursor
        map.getCanvas().style.cursor = cursor
      }
    },
    clearLocation () {
      app.location = ''
      app.parameter = ''
      app.parameters = []
    },
    loadLocations (id) {
      // load api data and add it as layer to the map
      app.setCursor('wait')
      app.wait = true
      var url = `${app.api.baseUrl}/locations`
      if (app.api.locationsParameters) url += '?' + app.api.locationsParameters
      fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
          var layer = Object.assign({}, apilayers.find(l => id.match(l.id)))
          layer.id = id
          layer.source = parseLayerData(data.results)
          app.layer[id] = layer
          map.addLayer(layer)
          setupLayerEvents(layer)
          app.wait = false
          app.setCursor('')
        })
        .catch(function (err) {
          alert('Error loading data: ' + err)
          app.wait = false
          app.setCursor('')
        })
    },
    openLocation (location) {
      // open data popup for selected location
      app.setCursor('wait')
      app.wait = true
      var url = `${app.api.baseUrl}/timeseries?${app.api.searchTerm}=${location.code}`
      if (app.api.seriesParameters) url += '&' + app.api.seriesParameters
      fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
          app.location = location
          app.parameters = parseParameters(data.results)
          app.wait = false
          app.setCursor('')
        })
        .catch((err) => {
          alert('Error loading data: ' + err)
          app.clearLocation()
          app.wait = false
          app.setCursor('')
        })
    },
    loadParameter (parameter) {
      // for now load only the first series for selected observation type
      if (parameter && parameter.series && parameter.series.length > 0) {
        app.setCursor('wait')
        app.wait = true
        var series = parameter.series[0]
        var start = (app.year) ? `${app.year}-01-01T00:00:00Z` : series.start
        var end = (app.year) ? `${app.year}-12-31T23:59:59Z` : series.end
        var url = `${app.api.baseUrl}/timeseries/${series.uuid}/data?start=${start}&end=${end}`
        if (app.api.dataParameters) url += '&' + app.api.dataParameters
        fetch(url)
          .then((resp) => resp.json())
          .then((data) => {
            plotParameter(data, parameter)
            app.wait = false
            app.setCursor('')
          })
          .catch((err) => {
            alert('error loading data: ' + err)
            app.wait = false
            app.setCursor('')
          })
      }
    }
  },
  name: 'App',
  components: {
    'series-chart': SeriesChart
  },
  mounted () {
    // define app at module scope, for convenience
    app = this

    // years from 2010 to current
    for (var year = new Date().getFullYear(); year >= 2009; year--) {
      app.years.push(year)
    }

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
    if (item.geometry) {
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
    }
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
  // extract list of available series, gouped per observation type
  var params = []
  apidata.forEach(data => {
    var ot = data.observationType
    if (!ot.qualifier) {
      ot.qualifier = ''
    }
    var p = params.find(p => p.uuid === ot.uuid)
    if (!p) {
      ot.name = ot.quantity + ' ' + ot.qualifier + ' (' + ot.parameterCode + ')'
      ot.series = [ data ]
      params.push(ot)
    } else {
      p.series.push(data)
    }
  })
  if (params.length === 0) {
    params.push({
      uuid: '',
      name: 'No data available',
      series: []
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

function plotParameter (data, parameter, elementId) {
  // create time series chart and insert in element with given id
  var xy = []
  // limit to last 1000 points ?
  if (data.length > 1000) data = data.slice(data.length - 1000)
  data.forEach((event) => {
    var date = null
    // be ware of timestamp field name inconsistency !
    if (event.timeStamp) {
      date = new Date(event.timeStamp)
    } else if (event.timestamp) {
      date = new Date(event.timestamp)
    }
    if (date && event.value) {
      xy.push({
        x: date,
        y: event.value
      })
    }
  })
  app.seriesData = xy
}
