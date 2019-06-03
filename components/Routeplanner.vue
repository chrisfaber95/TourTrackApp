<template>
	<div>
		<b-button variant="danger" @click="logPosition">Log position</b-button>
		<b-button variant="danger" @click="randomPoint">Add Random Marker</b-button>
		<b-button variant="danger" @click="randomRoute">Add Random Route</b-button>
		<form>
			<input type="text" value="" name="search"/>
			<input type="submit" value="Submit">
		</form>
		<no-ssr placeholder="Loading...">
			<l-map ref="map" :zoom=3 :center="[53.2193835, 6.5665018]" class="mini-map">
				<l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
				<l-marker ref="markers" v-for="item in markers" v-bind:key="item.id" :lat-lng="[item.lat, item.lng]" />
				<v-geosearch :options="geosearchOptions" />
			</l-map>
		</no-ssr>
	</div>
</template>
<script>
import 'leaflet/dist/leaflet.css'
import { OpenStreetMapProvider } from 'leaflet-geosearch'
import L from 'leaflet'
import VGeosearch from 'vue2-leaflet-geosearch'
import 'leaflet-routing-machine'

export default {
	name: 'leaflet-map',
	head() {
		return {
			link: [
				{ rel: 'stylesheet', href: 'https://unpkg.com/leaflet@1.5.1/dist/leaflet.css', integrity: 'sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ==', crossorigin: '' },
				{ rel: 'stylesheet', href: 'https://unpkg.com/leaflet-geosearch@2.6.0/assets/css/leaflet.css' },
				{ rel: 'stylesheet', href: 'https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.css' }
			]
		}
	},
	components: {
		VGeosearch
	},
	data: function () {
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
			geosearchOptions: { // Important part Here
				provider: new OpenStreetMapProvider(),
				style: 'bar',
				showPopup: true,
				marker: {
					icon: new L.Icon.Default(),
					draggable: true
				},
				popupFormat: ({ query, result }) => result.label
			},
			route: null
		}
	},
	mounted() {
	},
	beforeUpdate() {
	},
	created() {
	},
	methods: {
		logPosition() {
		},
		randomPoint() {
			this.markers.push({ id: this.markers.length + 1, lat: Math.floor(Math.random() * (50 - 0 + 1) + 0), lng: Math.floor(Math.random() * (100 - 0 + 1) + 0) })
		},
		randomRoute() {
			const map = this.$refs.map.mapObject
			this.line = L.Routing.control({
				waypoints: [
					L.latLng(53.2193835, 6.5665018),
					L.latLng(52.5167747, 6.0830219)
				],
				routeWhileDragging: true
			}).addTo(map)
			console.log(this.$refs.map)
			this.route = this.line
			console.log(this.route)
			/* console.log(this.$refs.markers[1].mapObject._latlng.lat) */
		}
	}
}
</script>

<style scoped>
@media (max-width: 575.98px) {
	.time {
		font-size: 4rem;
		color: aqua;
	}
}
.mini-map {
	width: 100%;
	height: 600px !important;
	max-width: 100%;
	max-height: 600px !important;
}
</style>
