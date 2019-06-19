<template>
	<div class="sidebar">
		<router-link active-class="active" :to=item.slug v-for="item in nav" v-bind:key="item.id">
			<div class="sidebar-block">
				<div class="icon">
					<font-awesome-icon :icon=item.image />
				</div>
				{{item.tag}}
			</div>
		</router-link>
	</div>
</template>

<script>
import auth from '../auth'
export default {
	data: function () {
		return {
			nav: [
			{ id: 0, tag: "Dashboard", slug: "/", image: "home"},
			{ id: 1, tag: "List Visited Places", slug: "/visitedplaces", image: "camera"},
			{ id: 2, tag: "List Destination", slug: "/listdestination", image: "map-marker-alt"},
			{ id: 3, tag: "List Trips", slug: "/listroute", image: "calendar"},
			{ id: 4, tag: "Profile", slug: "/profile", image: "user"},
			{ id: 5, tag: "Login", slug: "/login", image: "user"},
			],
			user: auth.user
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
.sidebar{
	border-left: 1px solid #d3d3d3;
	background-color: #c6c6c6;
}
.sidebar-block{
	border-bottom: 1px solid #d3d3d3;
	border-right: 1px solid #d3d3d3;
	padding-top: 15px;
	padding-botton: 15px;
}

.active .sidebar-block{
	background-color: #f4f4f4;
	border-right: none;
}
</style>