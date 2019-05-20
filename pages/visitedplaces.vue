<template>
	<div class="col">
		<h1>Visited Places</h1>
		<ul>
			<li v-for="item in visited" :key="item.id">
				{{ item.value }} - {{ item.datum }} - {{ item.long }}, {{ item.lat }}
			</li>
		</ul>
		<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
		<script>
			var loadmap = function() {
			var sm = new scribblemaps.ScribbleMap(document.getElementById('ScribbleMap'));
			$.getJSON('/visited.json', function(json) {
			for(visited in json['visited']){
			sm.draw.point([json['visited'][visited]['long'], json['visited'][visited]['lat']], 5);
			}
			});
			}
		</script>
		<script src="https://scribblemaps.com/api/js/?callback=loadmap" async />
		<div class="map">
			<div id="ScribbleMap" style="width: 800px; height: 800px" />
		</div>
	</div>
</template>

<script>

export default {
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
