<template>
  <div>
  <b-button variant="success" @click="getGeoLocation">Get Current Location</b-button>
	<Map ref='mapComp' />	
	<b-button variant="success" @click="setupTrip">Setup Route</b-button>
	<b-button variant="success" @click="logRoute">log Current Route</b-button>
	<b-button id="addVisited-button" @click="addBegin" variant="success" style='display:hidden'>Add as Begin</b-button>
	<b-button id="addVisited-button" @click="addEnd" variant="success" style='display:hidden'>Add as End</b-button>
  </div>
</template>

<script>
import Map from '@/components/RoutePlanner.vue'
import axios from 'axios'
const API_URL = 'http://localhost:3000';
export default {


  name: 'Trips',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
	  currentMarker: null,
	  currentBegin: null,
	  currentEnd: null,
	  currentTrip: null,
	  allTrips: null
    }
  },
  components:{
	Map
  },
  created(){
	this.getTrips()
  },
  methods:{
  getUserData: function() {    
		let self = this
		const url = `${API_URL}/user`;
		axios.get(url) 
		.then((response) => {    
			console.log(response)    
			self.$set(this, "user", response.data.user)    
		})    
		.catch((errors) => {    
			console.log(errors)    
			router.push("/")    
		})    
	},
	getTrips: function() {
		const url = `${API_URL}/api/gettrip/all`;
		axios.get(url)
		.then((response) => {
			this.allTrips = response.data.docs;
			console.log(this.allTrips);
			this.$children[0].getMapData();
		})
		.catch((errors) => {
			console.log(errors)
		})
	},
	getTripById: function(id) {
		const url = `${API_URL}/api/gettrip/id`;
		axios.get(url, {
			params: id		
		})
		.then((response) => {
			console.log(response)
		})
		.catch((errors) => {
			console.log(errors)
		})
	},
	addTrip: function() {
		console.log(this.currentMarker);
		const url = `${API_URL}/api/addtrip`;
		axios.post(url, this.currentMarker)
		.then((response) => {
			console.log(response)
		})
		.catch((errors) => {
			console.log(errors)
		})
	},
	getGeoLocation: function(){
		this.$refs.mapComp.getGeoLocation();
	},
	getMapData: function(child){
		this.child = child;
		this.child.setMapData(this.allTrips);
	},
	randomRoute: function(){
		this.$refs.mapComp.randomRoute();
	},
	logRoute: function(){
		this.$refs.mapComp.logRoute();
	},
	addCurrentRoute: function(data){
		this.currentTrip = data;
		console.log(this.currentTrip);
		this.addTrip();
	},
	addVisitedMarker: function(data){
		this.currentMarker = data;
		console.log(this.currentMarker);
	},
	addVisited: function(data){
		this.currentMarker = data;
		console.log(this.currentMarker);
	},
	addEnd: function(){
	console.log(this.currentMarker);
		this.currentEnd = this.currentMarker;
		console.log(this.currentEnd);
	},
	addBegin: function(){
		this.currentBegin = this.currentMarker;
		console.log(this.currentBegin);
	},
	setupTrip: function(){
		this.$refs.mapComp.setupRoute(this.currentBegin, this.currentEnd);
	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
