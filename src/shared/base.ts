import { posix } from 'path'
import { getPackageInfo } from 'local-pkg'

/**
 * 规范化路径
 * @param path 路径
 * @returns 路径
 */
export const normalizePath = (path: string): string => {
	path = path.startsWith('/') ? path : '/' + path
	return posix.normalize(path)
}

/**
 * vite 2 版本判断
 * @returns
 */
export const isVite2 = async () => {
	const info = await getPackageInfo('vite')
	if (info) {
		return /.?2/.test(info.version)
	}
	return false
}
