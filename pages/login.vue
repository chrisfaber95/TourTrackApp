<template>
	<div>
	</div>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined

export default {
	middleware: 'notAuthenticated',
	methods: {
		postLogin() {
			setTimeout(() => { // we simulate the async request with timeout.
				const auth = {
					accessToken: 'someStringGotFromApiServiceWithAjax'
				}
				this.$store.commit('setAuth', auth) // mutating to store for client rendering
				Cookie.set('auth', auth) // saving token in cookie for server rendering
				this.$router.push('/')
			}, 1000)
		}
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
