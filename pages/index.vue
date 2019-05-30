<template>
	<div class="container-fluid pt-2">
		<Header />
		<div class="row">
			<div class="col-2">
				<Navigation />
			</div>
			<div class="col-10">
				<Datetime />
				<Weather />
				<Calendar />
				<Forecast />
			</div>
		</div>
	</div>
</template>

<script>
import Datetime from '~/components/Datetime.vue'
import Header from '~/components/Header.vue'
import Weather from '~/components/Weather.vue'
import Forecast from '~/components/Forecast.vue'
import Calendar from '~/components/Calendar.vue'
import Navigation from '~/components/Navigation.vue'

export default {
	components: {
		Header,
		Datetime,
		Weather,
		Forecast,
		Calendar,
		Navigation
	}
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
