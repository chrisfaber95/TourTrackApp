<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col-2">
				<h1>TTA</h1>
			</div>
			<div class="col-10 datetime">
				<Datetime />
			</div>
		</div>
	</div>
</template>

<script>
import Datetime from '~/components/Datetime.vue'

export default {
	components: {
		Datetime
	},
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
.datetime{
	text-align: right;
}
</style>
