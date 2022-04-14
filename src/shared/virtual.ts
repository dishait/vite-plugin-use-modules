/**
 * 创建虚拟模块
 * @param target 目标
 * @returns 虚拟模块
 */
export const createVirtualModule = (target: string) => {
	return `export const modules = import.meta.globEager('${target}/*.[tj]s')\n
export const useModules = app => {
    Object.values(modules).forEach(module => {
        if (typeof module.default === 'function') {
            module.default(app)
        }
    })
    return app
}`
}
