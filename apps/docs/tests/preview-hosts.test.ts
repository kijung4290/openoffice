import { describe, expect, it } from 'vitest'
import { previewHosts } from '../preview-hosts'

describe('preview hosts', () => {
  it('uses the current runtime host without allowing its siblings', () => {
    expect(previewHosts('https://5173-example123.e2b.app')).toEqual([
      'local--docs.previews.kosuke.ai',
      '5173-example123.e2b.app',
    ])
    expect(previewHosts('https://session--docs.previews.kosuke.ai')).toContain(
      'session--docs.previews.kosuke.ai',
    )
  })
  it('rejects unrelated origins, credentials, ports and malformed URLs', () => {
    for (const url of [
      undefined,
      'bad',
      'http://5173-example.e2b.app',
      'https://5173-example.e2b.app.evil.test',
      'https://example.e2b.app',
      'https://user@5173-example.e2b.app',
      'https://5173-example.e2b.app:444',
    ]) {
      expect(previewHosts(url)).toEqual(['local--docs.previews.kosuke.ai'])
    }
  })
})
