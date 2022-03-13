import type { Plugin } from 'vite'
import { normalizePath } from './shared/base'
import { createPluginName } from './shared/create'
import { createVirtualModule } from './shared/virtual'

interface Options {
	/**
	 * @description 目标地址
	 * @default "src/modules"
	 */
	target?: string
}

const useName = createPluginName(false)

const usePlugin = (options?: Partial<Options>): Plugin => {
	let { target = 'src/modules' } = options || {}
	const virtualModuleId = 'virtual:modules'
	const resolvedVirtualModuleId = '\0' + virtualModuleId

	target = normalizePath(target)
	return {
		name: useName('modules'),
		resolveId(id) {
			if (id === virtualModuleId) {
				return resolvedVirtualModuleId
			}
		},
		load(id) {
			if (id === resolvedVirtualModuleId) {
				return createVirtualModule(target)
			}
		}
	}
}

export default usePlugin
