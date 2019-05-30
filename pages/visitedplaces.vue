<template>
	<div>
		<div class="container-fluid">
			<h1>Visited Places</h1>
		</div>
		<div class="row">
			<div class="col-6">
				<ul>
					<li v-for="item in visited" :key="item.id">
						{{ item.value }} - {{ item.datum }} - {{ item.long }}, {{ item.lat }}
					</li>
				</ul>
			</div>
			<div class="col-6">
				<Map />
			</div>
		</div>
	</div>
</template>

<script>
import Map from '~/components/Map.vue'

export default {
	components: {
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
