<template>
	<div class="col">
		<Navigation />
		<Datetime />
		<h1>Visited Places</h1>
		<ul>
			<li v-for="item in visited" :key="item.id">
				{{ item.value }} - {{ item.datum }} - {{ item.long }}, {{ item.lat }}
			</li>
		</ul>
		<Map />
	</div>
</template>

<script>
import Navigation from '~/components/Navigation.vue'
import Datetime from '~/components/Datetime.vue'
import Map from '~/components/Map.vue'

export default {
	components: {
		Datetime,
		Navigation,
		Map
	},
	data: function () {
		return {
			visited: [
				{
					id: 1,
					value: 'Groningen',
					datum: '05-05-2019',
					long: 6.5665018,
					lat: 53.2193835
				},
				{
					id: '2',
					value: 'Zwolle',
					datum: '05-05-2019',
					long: 6.0830219,
					lat: 52.5167747
				}
			]
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
</style>
