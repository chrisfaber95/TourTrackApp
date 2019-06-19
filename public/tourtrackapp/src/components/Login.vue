<template>
   <div>
        <h2>Login</h2>
        <form v-on:submit="submit">
            <input type="text" name="email" v-model="credentials.username" /><br>
            <input type="password" name="password" v-model="credentials.password" /><br>    
            <input type="submit" value="Login" />    
        </form>    
    </div>
</template>

<script>
import router from "../router"
import auth from '../auth'    	
import axios from "axios"    
const API_URL = 'http://localhost:3000';
    export default {    
        name: "Login",
		data(){
			return{
			credentials: {
				username: '',
				password: ''
			},
			error: ''
			}
		},
		component:{
			auth
		},
        methods: {    
            submit() {
				this.credentials.username = "user@email.com"
				this.credentials.password = "password"
				var credentials = {
				  username: this.credentials.username,
				  password: this.credentials.password
				}
				// We need to pass the component's this context
				// to properly make use of http in the auth service
				auth.login(this, credentials, 'dashboard')
			  
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
