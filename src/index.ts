import type { Plugin } from 'vite'
import { createVirtualModule } from './shared/virtual'
import {
	normalizePath,
	defaultNormalize
} from './shared/base'

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

	/**
	 * 规范化
	 * @default (target) => `'${target}/*.[tj]s'`
	 */
	normalize?: (target?: string) => string
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
	let {
		auto = false,
		target = 'src/modules',
		normalize = defaultNormalize
	} = options || {}

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
				const glob = normalize(target)
				return createVirtualModule(glob)
			}
		},
		transform: auto ? transform : undefined
	}
}
