<template>
    <v-app>
    <v-toolbar app>
      <v-flex xs4 pt-4 pl-2>
        <v-select name="sourceselect" v-model="selected" v-bind:items="selection" overflow label="Digital Delta Nodes"/>
      </v-flex>
    </v-toolbar>
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
          <v-mapbox-geocoder></v-mapbox-geocoder>
          <v-mapbox-navigation-control></v-mapbox-navigation-control>
        </v-mapbox>
      </v-content>
      <v-footer app></v-footer>
    </v-app>
</template>

<script src="./app-vue.js"></script>

<style >
  @import 'mapbox-gl/dist/mapbox-gl.css';
  @import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
  #map {
  height: 100%;
  width: 100%;
  }
</style>
