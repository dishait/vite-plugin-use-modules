import type { Plugin } from 'vite'
import MagicString from 'magic-string'
import { normalizePath } from './shared/base'
import { createPluginName } from './shared/create'
import { createVirtualModule } from './shared/virtual'

interface Options {
	/**
	 * @description 目标地址
	 * @default "src/modules"
	 */
	target?: string

	/**
	 * @description 自动加载
	 * @default false
	 */
	auto?: boolean
}

const useName = createPluginName(false)

const usePlugin = (options?: Partial<Options>): Plugin => {
	let { target = 'src/modules', auto = false } =
		options || {}
	const virtualModuleId = 'virtual:modules'
	const resolvedVirtualModuleId = '\0' + virtualModuleId

	target = normalizePath(target)

	function transform(code: string, id: string) {
		if (/src\/main\.(js|ts)$/.test(id)) {
			const s = new MagicString(code)
			s.prependLeft(
				0,
				`import { useModules } from 'virtual:modules'\n`
			)
			s.replace(/(createApp\(.*?\))/, 'useModules($1)')
			return s.toString()
		}
		return code
	}

	return {
		name: useName('use-modules'),
		resolveId(id) {
			if (id === virtualModuleId) {
				return resolvedVirtualModuleId
			}
		},
		load(id) {
			if (id === resolvedVirtualModuleId) {
				return createVirtualModule(target)
			}
		},
		// @ts-ignore
		transform: auto ? transform : undefined
	}
}

export default usePlugin
