import { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
	routes: [
		{
			name: 'home',
			path: '/',
			component: () => import('../pages/home.vue')
		},
		{
			name: 'about',
			path: '/about',
			component: () => import('../pages/about.vue')
		}
	],
	history: createWebHistory()
})

export default (app: App) => app.use(router)
