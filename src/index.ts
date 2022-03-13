import { Plugin, normalizePath } from 'vite'
import { createPluginName } from './shared/create'

interface Options {}

const useName = createPluginName(false)

const usePlugin = (options?: Partial<Options>): Plugin => {
	const virtualModuleId = 'virtual:modules'
	const resolvedVirtualModuleId = '\0' + virtualModuleId
	return {
		name: useName('modules'),
		resolveId(id) {
			if (id === virtualModuleId) {
				return resolvedVirtualModuleId
			}
		},
		load(id) {
			if (id === resolvedVirtualModuleId) {
				return `export const msg = "hello world!!"`
			}
		}
	}
}

export default usePlugin
