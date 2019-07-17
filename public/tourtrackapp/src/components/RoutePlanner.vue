<template>
  <div>
		<b-button variant="success" @click="logPosition">Log position</b-button>
		<b-button variant="success" @click="randomPoint">Add Random Marker</b-button>
		<b-button variant="success" @click="consoleRoute">console</b-button>
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
import axios from 'axios'
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
				{ rel: 'stylesheet', href: '/node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.css' },
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
		map: null,
		currentRoute: null,
		currentMarker: null,
		mapdata: null,
		route: null
    }
  },
  mounted(){
  	this.geosearch()
 },
 created(){
 },
  methods: {
		logPosition() {
		},
		getMapData(){
			const parent = this.$parent;
			parent.getMapData(this);
		},
		setMapData(data){
			this.mapdata = data;
			console.log(this.mapdata);
			
			switch(this.$route.path){
				case "/visitedplaces":
					for(const item in this.mapdata){
						console.log(this.mapdata[item]);
						if(this.mapdata[item].lat != undefined || this.mapdata[item].lon != undefined){
							var customColor = new L.Icon({
								  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
								  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
								  iconSize: [25, 41],
								  iconAnchor: [12, 41],
								  popupAnchor: [1, -34],
								  shadowSize: [41, 41]
							});
							if ( this.mapdata[item].visited == false){
							  var customColor = new L.Icon({
									  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
									  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
									  iconSize: [25, 41],
									  iconAnchor: [12, 41],
									  popupAnchor: [1, -34],
									  shadowSize: [41, 41]
								});
							}
							var marker = new L.Marker([this.mapdata[item].lat, this.mapdata[item].lon], {icon: customColor});
							marker.addTo(this.map);
						}
					}
					break;
				case "/listroute":
					for(const item in this.mapdata){
						console.log(this.mapdata[item]);
						this.addRoute(this.mapdata[item].waypoints);
						//marker.addTo(this.map);
					}
					break;
				default:
					break;
			}
		},
		randomPoint() {
			this.markers.push({ id: this.markers.length + 1, lat: Math.floor(Math.random() * (50 - 0 + 1) + 0), lng: Math.floor(Math.random() * (100 - 0 + 1) + 0) })
		},
		getGeoLocation(){
		var mapEdit = this.map;
		const parent = this.$parent
			$.getJSON('http://ip-api.com/json', function (data, status) {
			  if(status == "success") {
				console.log(data)
				this.lat = data.lat
				this.lon = data.lon
				
				mapEdit.setView([this.lat, this.lon]);
				
				var marker = new L.Marker([this.lat, this.lon]);
				marker.bindPopup('current' + " - " + new Date());
				marker.addTo(mapEdit);
				
				
				this.map = mapEdit;
				
				const sendData = {
					"name" : data.city,
					"lat" : this.lat,
					"lon" : this.lon,
					"date" : new Date()
				}
				console.log(sendData);
				console.log(parent);
				parent.addVisited(sendData);
				
			  }
			});
		},
		geolocationFunction(position){
			console.log(position)
		},
		geosearch() {
			this.map = L.map('mini-map');
			this.map.setView([52.7,6.3], 10);
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
				  popupFormat: ({ query, result }) =>  this.addMarker(result),    // optional: function    - default returns result label
				  maxMarkers: 1,                                      // optional: number      - default 1
				  retainZoomLevel: false,                             // optional: true|false  - default false
				  animateZoom: true,                                  // optional: true|false  - default true
				  autoClose: false,                                   // optional: true|false  - default false
				  searchLabel: 'Enter address',                       // optional: string      - default 'Enter address'
				  keepResult: false        
			}).addTo(this.map);
			var circle = L.circle([52.7,6.3], {
				color: 'red',
				fillColor: '#f03',
				fillOpacity: 0.5,
				radius: 500
			}).addTo(this.map);
		},
		addMarker(result){ 
			const parent = this.$parent;
			const sendData = {
					"name" : result.label,
					"lat" : result.y,
					"lon" : result.x,
					"date" : new Date()
				}
			console.log(sendData);
			parent.addVisitedMarker(sendData);
		},
		logLocation(){
			console.log(this.currentMarker);
		},
		wait(){
			if(this.mapdata != null){
				for(let i = 0; i < this.mapData; ++i){
				console.log(this.mapData);
					var marker = new L.Marker([this.mapData[i].lat, this.mapData[i].lon]);
				}
			}
			else{
				setTimeout(this.wait, 500);
			}
		},
		randomRoute() {
			var mapEdit = this.map;
			this.route = L.Routing.control({
				waypoints: [
					L.latLng(53.2193835, 6.5665018),
					L.latLng(52.5167747, 6.0830219)
				],
				routeWhileDragging: false
			}).addTo(mapEdit);
			console.log(this.route);
			this.currentRoute = this.route;
		},
		setupRoute(begin, end) {
			var mapEdit = this.map;
			this.route = L.Routing.control({
				waypoints: [
					L.latLng(begin.lat, begin.lon),
					L.latLng(end.lat, end.lon)
				],
				routeWhileDragging: false
			}).addTo(mapEdit);
			console.log(this.route);
			this.currentRoute = this.route;
		},
		addRoute(waypoints){
		console.log(waypoints);
			var mapEdit = this.map;
			this.route = L.Routing.control({
				waypoints: waypoints,
				routeWhileDragging: false
			}).addTo(mapEdit);
			console.log(this.route);
			this.currentRoute = this.route;
		},
		logRoute(){
			var data = {
				waypoints: [
				],
				date: new Date()
			};
			if(this.currentRoute._selectedRoute != null){
				for(const item in this.currentRoute._selectedRoute.waypoints){
				console.log(this.currentRoute._selectedRoute.waypoints[item]);
					const point = {
						lat: this.currentRoute._selectedRoute.waypoints[item].latLng.lat,
						lng: this.currentRoute._selectedRoute.waypoints[item].latLng.lng
					}
					data.waypoints.push(point);
				}
			}
			else{
				if(this.currentRoute != null){
					for(const item in this.currentRoute._router.options.waypoints){
						console.log(this.currentRoute._router.options.waypoints[item]);
						const point = {
							lat: this.currentRoute._router.options.waypoints[item].lat,
							lng: this.currentRoute._router.options.waypoints[item].lng
						}
						data.waypoints.push(point);
					}
				}
				else{
					alert("No Route added");
				}
			}
			
			const parent = this.$parent;
			parent.addCurrentRoute(data);
		},
		consoleRoute(){
			console.log(this.route);
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mini-map {
	width: 100%;
	height: 60% !important;
	max-width: 100%;
	max-height: 60% !important;
	min-height: 400px !important;
}

.leaflet-routing-container {
    display: none;
}
</style>
<style>
.leaflet-routing-container {
    display: none;
}
</style>
