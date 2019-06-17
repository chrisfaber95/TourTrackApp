<template>
  <div id="app">
	<div class="container-fluid" id="header">
		<Header />
	</div>
    <div class="container-fluid" id="main-view">
		<div class="row">
			<div class="col-3" id="navigation">
				<Nav />
			</div>
			<div class="col-9">
				<router-view/>
			</div>
		</div>
	</div>
  </div>
</template>

<script>
import Nav from '@/components/Navigation.vue'
import Header from '@/components/Header.vue'

export default {
  name: 'App',
  components:{
	Nav,
	Header
  }
}
</script>

<style src='leaflet/dist/leaflet.css'>
    /* global styles */
</style>
<style src='leaflet-geosearch/assets/css/leaflet.css'>
    /* global styles */
</style> 

<style>
html, body{
	height: 100%;
	max-height: 100%;
	overflow-y: hidden;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
	height: 100%;
	max-height: 100%;
}
#header{
	height: 5%;
	max-height: 5%;
	background-color: #000000;
	color: white;
}
#navigation{
	padding: 0;
}
#main-view{
	height: 95%;
	max-height: 95%;
	margin-top: 20px;
	margin-bottom: -20px;
}
#main-view .row{
	margin-left: 40px;
	margin-right: 40px;
	margin-bottom: -20px;
	background-color: #f4f4f4;
	padding: 0;
	height: 100%;
	max-height: 100%;
}
</style>
