/**
 * 获取资源文件路径
 *
 * @param url 资源文件路径，只需传入assets下的路径即可，例如：images/error/404.png
 * @returns 返回资源文件在本地文件系统中的路径
 */
export function getAssetsFile(url: string) {
  return new URL(`../assets/${url}`, import.meta.url).href
}
