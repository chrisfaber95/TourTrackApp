<template>
  <div>
	<h1>Welcome</h1>
  </div>
</template>

<script>
import axios from 'axios';
import auth from '../auth'
const API_URL = 'http://localhost:3000';

export default {
  name: 'Public',
  data () {
    return {
      
    }
  },
  components:{
  },
  methods:{
	getDestinations() {
		const url = `${API_URL}/api/destinations`;
		axios.get(url)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
	},
	getUserData: function() {
		if(auth.user.authenticated){
			let self = this
			const url = `${API_URL}/checkuser`;
			axios.post(url, localStorage.getItem('myCat')) 
				.then((response) => {    
					console.log(response)    
					//self.$set(this, "user", response.data.user)  
					//var cat = localStorage.getItem('myCat');				
				})    
				.catch((errors) => {    
					console.log(errors)    
					auth.user.authenticated = false
					router.push("/login")    
				})
		}
		else{
			router.push("/login")
		}
	}    
  },    
	mounted() {
		getUserData()
	} ,
    route: {
      // Check the users auth status before
      // allowing navigation to the route
      canActivate() {
        return auth.user.authenticated 
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
