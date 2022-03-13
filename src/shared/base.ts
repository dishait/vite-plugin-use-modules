import { posix } from 'path'

/**
 * 规范化路径
 * @param path 路径
 * @returns 路径
 */
export const normalizePath = (path: string): string => {
	path = path.startsWith('/') ? path : '/' + path
	return posix.normalize(path)
}
