<template>
    <v-app>
    <v-toolbar app>
      <v-flex xs4 pt-4 pl-2>
        <v-select v-model="source" v-bind:items="sources" item-text="id" item-value="id" overflow label="Digital Delta Nodes"/>
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
        <v-card id="data-card" v-show="location">
          <v-card-title>{{'Location: ' + location.name + ' (' + location.code + ')'}}</v-card-title>
          <v-card-text>
            <v-flex>
              <v-select v-model="parameter" v-bind:items="parameters" item-text="name" item-value="uuid" overflow label="Parameters"/>
            </v-flex>
            <v-flex></v-flex>
          </v-card-text>
          <v-card-actions><v-btn flat @click="location=''">Close</v-btn></v-card-actions>
        </v-card>
      </v-content>
      <v-footer app></v-footer>
    </v-app>
</template>

<script src="./app.js"></script>

<style >
  @import 'mapbox-gl/dist/mapbox-gl.css';
  @import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
  
  #map {
    height: 100%;
    width: 100%;
  }

  #data-card {
    position: absolute;
    top: 80px;
    left: 10px;
    height: 50%;
    width: 50%;
  }

</style>
