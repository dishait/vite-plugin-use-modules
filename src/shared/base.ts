import { posix } from "path";
import { getPackageInfo } from "local-pkg";

/**
 * 规范化路径
 * @param path 路径
 * @returns 路径
 */
export function normalizePath(path: string) {
  path = path.startsWith("/") ? path : "/" + path;
  return posix.normalize(path);
}

/**
 * vite 2 版本判断
 * @returns
 */
export async function isVite2() {
  const info = await getPackageInfo("vite");
  if (info) {
    return /^.?2/.test(info.version);
  }
  return false;
}

/**
 * 默认规范化
 * @param target 目标
 * @returns
 */
export function defaultNormalize(target: string) {
  return `'${target}/*.[tj]s'`;
}
