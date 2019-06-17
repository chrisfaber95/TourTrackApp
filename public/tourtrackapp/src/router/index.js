import Vue from 'vue'
import Router from 'vue-router'
import PublicView from '@/components/Public'
import Dashboard from '@/components/Dashboard'
import Visited from '@/components/Visited'
import Destinations from '@/components/Destinations'
import Trips from '@/components/Trips'
import Profile from '@/components/Profile'
import Login from '@/components/Login'
import Public from '@/components/Public'
import RoutePlanner from '@/components/RoutePlanner'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Public
    },
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: Dashboard
	},
	{
		path: '/visitedplaces',
		name: 'List Visited Places',
		component: Visited
	},
	{
		path: '/listdestination',
		name: 'List Destination',
		component: Destinations
	},
	{
		path: '/listroute',
		name: 'List Trips',
		component: Trips
	},
	{
		path: '/profile',
		name: 'Profile',
		component: Profile
	},
	{
		path: '/login',
		name: 'Login',
		component: Login
	}
  ],
  linkActiveClass: "active", // active class for non-exact links.
  linkExactActiveClass: "active" // active class for *exact* links.
})
