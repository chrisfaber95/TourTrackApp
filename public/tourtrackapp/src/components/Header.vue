<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col-2">
				<h1>TTA</h1>
			</div>
			<div class="col-2">
				<a href="#" v-on:click="logout">Logout</a>   
			</div>
			<div class="col-8 datetime">
				<Datetime />
			</div>
		</div>
	</div>
</template>

<script>
import Datetime from '@/components/Datetime.vue'
const API_URL = 'http://localhost:3000';
export default {
	components: {
		Datetime
	},
	data: function () {
		return {
			msg: 'Test'
		}
	},
	methods: {
	logout: function (e) {
		const url = `${API_URL}/api/logout`;
		axios.get(url)
		.then(() => {
		router.push("/")
      })
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
.datetime{
	text-align: right;
}
</style>