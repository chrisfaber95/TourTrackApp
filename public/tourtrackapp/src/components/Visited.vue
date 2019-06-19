<template>
  <div>
	<Map />
  </div>
</template>

<script>
import Map from '@/components/RoutePlanner.vue'
import axios from 'axios'
const API_URL = 'http://localhost:3000';
export default {


  name: 'Visited',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components:{
	Map
  },
  methods:{
  getUserData: function() {    
		let self = this
		const url = `${API_URL}/api/user`;
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
		const url = `${API_URL}/api/getvisited`;
		axios.get(url)
			.then((response) => {
				console.log(response)
			})
			.catch((errors) => {
				console.log(errors)
			})
	},
	addVisited: function(data) {
	console.log(data);
		const url = `${API_URL}/addvisited`;
		axios.post(url, data)
			.then((response) => {
				console.log(response)
			})
			.catch((errors) => {
				console.log(errors)
			})
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
</style>
