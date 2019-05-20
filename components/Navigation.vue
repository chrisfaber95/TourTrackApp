<template>
	<div class="col">
		<ol>
			<li><nuxt-link to="/">Home</nuxt-link></li>
			<li><nuxt-link to="/visitedplaces">List Visited Places</nuxt-link></li>
			<li><nuxt-link to="/newdestination">New Destination</nuxt-link></li>
			<li><nuxt-link to="/listdestination">List Destination</nuxt-link></li>
			<li><nuxt-link to="/newroute">New Trip</nuxt-link></li>
			<li><nuxt-link to="/listroute">List Trips</nuxt-link></li>
			<li><nuxt-link to="/profile">Profile</nuxt-link></li>
		</ol>
	</div>
</template>

<script>

export default {
	data: function () {
		return {
			msg: 'Test'
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
