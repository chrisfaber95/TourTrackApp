<template>
	<div>
		<p class="time">
			{{ time }}
		</p>
		<p class="date">
			{{ date }}
		</p>
	</div>
</template>

<script>
import moment from 'moment'
export default {
	data: function () {
		return {
			time: moment().format('LTS'),
			date: moment().format('MMM Do YY'),
			moment: moment
		}
	},
	mounted() {
		this.interval = setInterval(this.updateTime, 1000)
	},
	beforeDestroy() {
		clearInterval(this.interval)
	},
	methods: {
		updateTime() {
			this.time = moment().format('LTS')
			this.date = moment().format('MMM Do YY')
		}
	}
}
</script>

<style scoped>
@media (max-width: 575.98px) {
	.time {
		font-size: 2rem;
		color: aqua;
	}
}
.time {
	font-size: 2rem;
	display: inline-block;
}
.date {
	font-size: 1.3rem;
	display: inline-block;
}
</style>