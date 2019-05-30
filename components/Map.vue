<template>
	<div>
		<b-button variant="danger" @click="logPosition">Log position</b-button>
		<b-button variant="danger" @click="randomPoint">Add Random Marker</b-button>
		<no-ssr placeholder="Loading...">
			<l-map v-bind:"map" :zoom=3 :center="[53.2193835, 6.5665018]" class="mini-map">
				<l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
				<l-marker v-for="item in markers" v-bind:key="item.id" :lat-lng="[item.lat, item.lng]" />
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

export default {
	name: 'leaflet-map',
	head() {
		return {
			link: [
				{ rel: 'stylesheet', href: 'https://unpkg.com/leaflet@1.5.1/dist/leaflet.css', integrity: 'sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ==', crossorigin: '' },
				{ rel: 'stylesheet', href: 'https://unpkg.com/leaflet-geosearch@2.6.0/assets/css/leaflet.css' }
			]
		}
	},
	components: {
		VGeosearch
	},
	data: function () {
		return {
			map: new L.Map(),
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
			}
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
			console.log(this.L.Map)
		},
		randomPoint() {
			this.markers.push({ id: this.markers.length + 1, lat: Math.floor(Math.random() * (50 - 0 + 1) + 0), lng: Math.floor(Math.random() * (100 - 0 + 1) + 0) })
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
