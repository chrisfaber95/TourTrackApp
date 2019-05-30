const pkg = require('./package')

module.exports = {
	mode: 'universal',

	/*
  ** Headers of the page
  */
	head: {
		htmlAttrs: {
			lang: 'en'
		},
		title: pkg.name,
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' },
			{ hid: 'description', name: 'description', content: pkg.description }
		],
		script: [
			{ src: 'https://apis.google.com/js/api.js' }
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
			{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Cousine:400,500,700' }
		]
	},

	/*
	** PWA manifest file
	*/
	manifest: {
		name: pkg.name,
		short_name: pkg.name,
		lang: 'en-GB',
		background_color: '#292929',
		theme_color: '#292929',
		description: pkg.description,
		display: 'standalone'
	},

	/*
  ** Customize the progress-bar color
  */
	loading: { color: '#fff' },

	/*
  ** Global CSS
  */
	css: [
	],

	/*
  ** Plugins to load before mounting the App
  */
	plugins: [
		{src: '~/plugins/leaflet.js', ssr: false}
	],

	/*
  ** Nuxt.js modules
  */
	modules: [
		// Doc: https://axios.nuxtjs.org/usage
		'@nuxtjs/axios',
		// Doc: https://bootstrap-vue.js.org/docs/
		'bootstrap-vue/nuxt',
		'@nuxtjs/dotenv',
		'@nuxtjs/pwa'
	],
	/*
  ** Axios module configuration
  */
	axios: {
		// See https://github.com/nuxt-community/axios-module#options
	},

	/*
  ** Build configuration
  */
	build: {
		/*
    ** You can extend webpack config here
    */
		extend(config, ctx) {
			// Run ESLint on save
			if (ctx.isDev && ctx.isClient) {
				config.module.rules.push({
					enforce: 'pre',
					test: /\.(js|vue)$/,
					loader: 'eslint-loader',
					exclude: /(node_modules)/
				})
			}
		}
	},
	serverMiddleware: [
		// API middleware
		'~/server/api/index.js'
	]
}
