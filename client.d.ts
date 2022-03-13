declare module 'virtual:modules' {
	export let modules: {
		[key: string]: any
	}

	export let useModules: <R, T extends any[]>(...T) => R
}
