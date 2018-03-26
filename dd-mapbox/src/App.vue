<template>
    <v-app>
      <v-toolbar app></v-toolbar>
      <v-content>
        <v-mapbox 
          access-token="pk.eyJ1IjoiYWRyaWFhbnNlIiwiYSI6ImNqYXd4YnZ5dzc4dzMycW53b3lhMXZ6eDkifQ.bbG-PKhVspm-Mkh9zhO8hQ"
          map-style="mapbox://styles/mapbox/light-v9"
          :center="[5.5, 52.078]"
          :zoom="6.5"
          :pitch="0"
          :bearing="0"
          id="map"
          ref="map">
        </v-mapbox>
      </v-content>
      <v-footer app></v-footer>
    </v-app>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  name: 'App',
  components: {
  }
}
</script>

<style >
  @import 'mapbox-gl/dist/mapbox-gl.css';
  #map {
  height: 100%;
  width: 100%;
  }
</style>
