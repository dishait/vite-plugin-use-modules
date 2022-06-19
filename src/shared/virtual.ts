import { isVite2 } from './base'

/**
 * 创建虚拟 Glob 引入
 * @param target 目标
 * @returns
 */
export const createVirtualGlob = async (target: string) => {
	return (await isVite2())
		? `import.meta.globEager('${target}/*.[tj]s')`
		: `import.meta.glob('${target}/*.[tj]s', { eager: true })`
}

/**
 * 创建虚拟模块
 * @param target 目标
 * @returns 虚拟模块
 */
export const createVirtualModule = async (
	target: string
) => {
	return `export const modules = ${await createVirtualGlob(
		target
	)}\n
export const useModules = app => {
    Object.values(modules).forEach(module => {
        if (typeof module.default === 'function') {
            module.default(app)
        }
    })
    return app
}`
}
