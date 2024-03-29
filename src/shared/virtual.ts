import { isVite2 } from "./base";

/**
 * 创建虚拟 Glob 引入
 * @param glob
 * @returns
 */
export async function createVirtualGlob(glob: string) {
  return (await isVite2())
    ? `import.meta.globEager(${glob})`
    : `import.meta.glob(${glob}, { eager: true })`;
}

/**
 * 创建虚拟模块
 * @param glob
 * @returns 虚拟模块
 */
export async function createVirtualModule(glob: string) {
  return `\n
export const modules = ${await createVirtualGlob(glob)}

export const useModules = app => {
    Object.values(modules).forEach(module => {
        if (!module.default) {
            return
        }

        if (typeof module.default === 'function') {
            module.default(app)
            return
        }

        if (Array.isArray(module.default)) {
            app.use(...module.default)
            return
        }
        
        app.use(module.default)
    })
    return app
}`;
}
