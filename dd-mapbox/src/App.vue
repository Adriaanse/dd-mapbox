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
          <v-mapbox-navigation-control></v-mapbox-navigation-control>
        </v-mapbox>
        <data-dialog :visible="showDataDialog" @close="showDataDialog=false"></data-dialog>
      </v-content>
      <v-footer app></v-footer>
    </v-app>
</template>

<script src="./app-vue.js"></script>

<style >
  @import 'mapbox-gl/dist/mapbox-gl.css';
  #map {
    height: 100%;
    width: 100%;
  }
</style>
