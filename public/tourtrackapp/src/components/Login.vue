<template>
   <div>
        <h2>Login</h2>
        <form v-on:submit="login">
            <input type="text" name="email" /><br>
            <input type="password" name="password" /><br>    
            <input type="submit" value="Login" />    
        </form>    
    </div>
</template>

<script>
import router from "../router"        	
import axios from "axios"    
const API_URL = 'http://localhost:3000';
    export default {    
        name: "Login",    
        methods: {    
            login: (e) => {    
                e.preventDefault()   
                let email = "user@email.com"
                let password = "password"
                let login = () => {
                    let data = {
                        email: email,
                        password: password
                    }
					const url = `${API_URL}/api/user`;
					axios.get(url, data)
                        .then((response) => {
                            console.log("Logged in")
                            router.push("/dashboard")
                        })
                        .catch((errors) => {
                            console.log("Cannot login")
                        })
                }
                login()
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
