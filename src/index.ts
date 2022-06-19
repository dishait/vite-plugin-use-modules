import type { Plugin } from 'vite'
import { normalizePath } from './shared/base'
import { createVirtualModule } from './shared/virtual'

interface Options {
	/**
	 * 目标地址
	 * @default "src/modules"
	 */
	target?: string

	/**
	 * 自动加载模式
	 * @default false
	 */
	auto?: boolean
}

function transform(code: string, id: string) {
	if (/src\/main\.(js|ts)$/.test(id)) {
		return code
			.replace(
				/^/,
				`import { useModules } from 'virtual:modules'\n`
			)
			.replace(/(createApp\(.*?\))/, 'useModules($1)')
	}
	return code
}

export default function (
	options?: Partial<Options>
): Plugin {
	let { target = 'src/modules', auto = false } =
		options || {}
	const virtualModuleId = 'virtual:modules'
	const resolvedVirtualModuleId = '\0' + virtualModuleId

	target = normalizePath(target)

	return {
		name: 'vite-plugin-use-modules',
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
		transform: auto ? transform : undefined
	}
}
