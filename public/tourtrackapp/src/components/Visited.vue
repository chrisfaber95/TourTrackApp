<template>
  <div>
	<b-button variant="success" @click="getGeoLocation" v-if="user.authenticated">Get Current Location</b-button>
	<Map ref='mapComp' />
	<b-button v-if="user.authenticated" id="addVisited-button" variant="success" @click="addVisited" style='display:hidden'>Add to Visited</b-button>
	<b-button v-if="user.authenticated" id="addVisited-button" variant="success" @click="addDestination" style='display:hidden'>Add to Destination</b-button>
	<div class="visited-list">
		<div class="row" v-for="item in currentVisited" v-bind:key="item.id">
			<div class="col-6">
				{{item.name}}
			</div>
			<div class="col-4">
				{{item.visited}}
			</div>
			<div class="col-2">
				<b-button  v-if="!item.visited || user.authenticated" @click="updateVisited(item)"></b-button>
			</div>
		</div>
	</div>
  </div>
</template>

<script>
import Map from '@/components/RoutePlanner.vue'
import auth from '../auth'
import axios from 'axios'
const API_URL = 'http://localhost:3000';
export default {


  name: 'Visited',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
	  currentMarker: null,
	  currentVisited: null,
	  child: null,
	  user: auth.user
    }
  },
  components:{
	Map
  },
  created(){
	this.getVisited()
  },
  mounted(){
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
	getVisited: function() {
		const url = `${API_URL}/api/getvisited/all`;
		axios.get(url)
		.then((response) => {
			this.currentVisited = response.data.docs;
			this.$children[0].getMapData();
		})
		.catch((errors) => {
			console.log(errors)
		})
	},
	updateVisited: function(item) {
		console.log(item);
		/*const url = `${API_URL}/api/getvisited/all`;
		axios.put(url)
		.then((response) => {
			this.currentVisited = response.data.docs;
			this.$children[0].getMapData();
		})
		.catch((errors) => {
			console.log(errors)
		})*/
	},
	getVisitedById: function(id) {
		const url = `${API_URL}/api/getvisited/id`;
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
	addVisited: function() {
		console.log(this.currentMarker);
		this.$set(this.currentMarker, "visited", true);
		const url = `${API_URL}/api/addvisited`;
		axios.post(url, this.currentMarker)
		.then((response) => {
			console.log(response)
		})
		.catch((errors) => {
			console.log(errors)
		})
	},
	addDestination: function() {
		console.log(this.currentMarker);
		this.$set(this.currentMarker, "visited", false);
		const url = `${API_URL}/api/addvisited`;
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
	addVisitedMarker: function(data){
		this.currentMarker = data;
	},
	getMapData: function(child){
		this.child = child;
		this.child.setMapData(this.currentVisited);
	}
  },    
	mounted() {
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

.visited-list{
	overflow-y: scroll;
}
.visited-list .row{
	margin-bottom: 5px !important;
}
</style>
