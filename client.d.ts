declare module 'virtual:modules' {
	import type { App } from 'vue'
	export let modules: {
		[key: string]: any
	}

	export let useModules: (app: App) => App
}
