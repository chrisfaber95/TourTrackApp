<template>
  <div>
		<b-button variant="success" @click="logPosition">Log position</b-button>
		<b-button variant="success" @click="randomPoint">Add Random Marker</b-button>
		<b-button variant="success" @click="randomRoute">Add Random Route</b-button>
		<b-button variant="success" @click="getGeoLocation">Get Current Location</b-button>
		<form>
			<input type="text" value="" name="search"/>
			<input type="submit" value="Submit">
		</form>
		<!--<l-map ref="map" :zoom=3 :center="[53.2193835, 6.5665018]" class="mini-map">
			<l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
			<l-marker ref="markers" v-for="item in markers" v-bind:key="item.id" :lat-lng="[item.lat, item.lng]" />
		</l-map>-->
		 <div id="mini-map" class="mini-map"></div>
	</div>
</template>

<script>
import Vue from 'vue'
import L from 'leaflet'
import * as Vue2Leaflet from 'vue2-leaflet'
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch'
import 'leaflet-routing-machine'
import JQuery from 'jquery'
let $ = JQuery

Vue.component('l-map', Vue2Leaflet.LMap)
Vue.component('l-tile-layer', Vue2Leaflet.LTileLayer)
Vue.component('l-marker', Vue2Leaflet.LMarker)

export default {
  name: 'HelloWorld',
  head() {
		return {
			link: [
				{ rel: 'stylesheet', href: 'https://unpkg.com/leaflet@1.5.1/dist/leaflet.css', integrity: 'sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ==', crossorigin: '' },
				{ rel: 'stylesheet', href: 'https://unpkg.com/leaflet-geosearch@2.6.0/assets/css/leaflet.css' },
				]
		}
	}, 
	components: {
	},
	data () {
    return {
		position: [55.607741796855734, 13.018133640289308],
		draggable: true,
		popupContent: 'Sentian HQ',
		markers: [
			{ id: 0, lat: 53.2193835, lng: 6.5665018 },
			{ id: 1, lat: 52.5167747, lng: 6.0830219 },
			{ id: 2, lat: Math.floor(Math.random() * (50 - 0 + 1) + 0), lng: Math.floor(Math.random() * (100 - 0 + 1) + 0) },
			{ id: 3, lat: Math.floor(Math.random() * (50 - 0 + 1) + 0), lng: Math.floor(Math.random() * (100 - 0 + 1) + 0) },
			{ id: 4, lat: Math.floor(Math.random() * (50 - 0 + 1) + 0), lng: Math.floor(Math.random() * (100 - 0 + 1) + 0) }
		],
		latlng: null,
		lat: 0,
		lon: 0,
		map: null
    }
  },
  mounted(){
	this.geosearch()
	console.log(this.$route)
 },
 beforeMount(){
	
 },
  methods: {
		logPosition() {
		},
		randomPoint() {
			this.markers.push({ id: this.markers.length + 1, lat: Math.floor(Math.random() * (50 - 0 + 1) + 0), lng: Math.floor(Math.random() * (100 - 0 + 1) + 0) })
		},
		randomRoute() {
		},
		getGeoLocation(){
		var mapEdit = this.map;
			$.getJSON('http://ip-api.com/json', function (data, status) {
			  if(status == "success") {
				
				this.lat = data.lat
				this.lon = data.lon
				
				mapEdit.setView([this.lat, this.lon]);
				
				var marker = new L.Marker([this.lat, this.lon]);
				marker.bindPopup('current' + " - " + new Date());
				marker.addTo(mapEdit);
				
				
				this.map = mapEdit;
			  }
			});
			
		},
		geolocationFunction(position){
			console.log(position)
		},
		geosearch() {
			this.map = L.map('mini-map');
			console.log(this);
			this.map.setView([50,6], 13);
			L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
				attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
				maxZoom: 18,
				id: 'mapbox.streets'
			}).addTo(this.map);
			new GeoSearchControl({
				provider: new OpenStreetMapProvider(),                               // required
				  showMarker: true,                                   // optional: true|false  - default true
				  showPopup: false,                                   // optional: true|false  - default false
				  marker: {                                           // optional: L.Marker    - default L.Icon.Default
					icon: new L.Icon.Default(),
					draggable: false,
				  },
				  popupFormat: ({ query, result }) => result.label,   // optional: function    - default returns result label
				  maxMarkers: 1,                                      // optional: number      - default 1
				  retainZoomLevel: false,                             // optional: true|false  - default false
				  animateZoom: true,                                  // optional: true|false  - default true
				  autoClose: false,                                   // optional: true|false  - default false
				  searchLabel: 'Enter address',                       // optional: string      - default 'Enter address'
				  keepResult: false        
			}).addTo(this.map);
			
			var circle = L.circle([50,6], {
				color: 'red',
				fillColor: '#f03',
				fillOpacity: 0.5,
				radius: 500
			}).addTo(this.map);
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mini-map {
	width: 100%;
	height: 600px !important;
	max-width: 100%;
	max-height: 600px !important;
}
</style>
