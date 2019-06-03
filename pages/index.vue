<template>
	<div>
		<Weather />
		<Calendar />
		<Forecast />
	</div>
</template>

<script>
import Weather from '~/components/Weather.vue'
import Forecast from '~/components/Forecast.vue'
import Calendar from '~/components/Calendar.vue'

export default {
	components: {
		Weather,
		Forecast,
		Calendar
	},
	middleware: 'notAuthenticated'
}
</script>

<style>
html, body {
	background-color: #292929;
	color: aqua;
	font-family: 'Cousine', monospace;
	font-size: 1rem;
	height: 100vh;
	-webkit-user-select: none; /* Safari */
	-moz-user-select: none; /* Firefox */
	-ms-user-select: none; /* IE10+/Edge */
	user-select: none; /* Standard */
}

.withBackground {
	background-color: #333333;
	background-color: rgba(41, 41, 41, 0.3);
	border-radius: 0.3rem;
	width: fit-content;
}

@media (max-width: 575.98px) {
	html, body {
		font-size: 0.9rem;
	}
}
@media (max-width: 320px) {
	html, body {
		font-size: 0.8rem;
	}
}
</style>
