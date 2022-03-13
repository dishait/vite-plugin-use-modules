import { Plugin, normalizePath } from 'vite'
import { createPluginName } from './shared/create'

interface Options {}

const useName = createPluginName(false)

const usePlugin = (options?: Partial<Options>): Plugin => {
	return {
		name: useName('modules')
	}
}

export default usePlugin
