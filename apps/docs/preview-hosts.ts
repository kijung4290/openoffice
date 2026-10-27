// Only explicit runtime URLs on known preview domains may extend Vite's host list.
export function previewHosts(previewUrl?: string): string[] {
  const hosts = ['local--docs.previews.kosuke.ai']
  if (!previewUrl) return hosts
  try {
    const url = new URL(previewUrl)
    if (
      url.protocol === 'https:' &&
      !url.username &&
      !url.password &&
      !url.port &&
      (/^[a-z0-9-]+--docs\.previews\.kosuke\.ai$/.test(url.hostname) ||
        /^5173-[a-z0-9]+\.e2b\.app$/.test(url.hostname))
    ) {
      hosts.push(url.hostname)
    }
  } catch {
    // Missing or malformed preview configuration leaves the defaults intact.
  }
  return hosts
}
