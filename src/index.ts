import { Plugin, normalizePath } from 'vite'
import { createPluginName } from './shared/create'

interface Options {}

const useName = createPluginName()

const usePlugin = (options?: Partial<Options>): Plugin => {
	return {
		name: useName('name')
	}
}

export default usePlugin
