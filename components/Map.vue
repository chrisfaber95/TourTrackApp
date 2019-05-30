<template>
	<div>
		<b-button variant="danger" @click="logPosition">Log position</b-button>
		<b-button variant="danger" @click="randomPoint">Add Random Marker</b-button>
		<no-ssr placeholder="Loading...">
			<l-map :zoom=3 :center="[53.2193835, 6.5665018]" class="mini-map">
				<l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
				<l-marker v-for="item in markers" v-bind:key="item.id" :lat-lng="[item.lat, item.lng]" />
			</l-map>
		</no-ssr>
	</div>
</template>
<script>
import 'leaflet/dist/leaflet.css'
export default {
	name: 'leaflet-map',
	head() {
		return {
			link: [
				{ rel: 'stylesheet', href: 'https://unpkg.com/leaflet@1.5.1/dist/leaflet.css', integrity: 'sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ==', crossorigin: '' }
			]
		}
	},
	components: {
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
			]
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
			console.log(this.position)
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
	width: 400px;
	height: 600px !important;
	max-width: 400px;
	max-height: 600px !important;
}
</style>
