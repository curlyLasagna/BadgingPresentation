import { randomBytes, webcrypto } from 'node:crypto'
import { readFile, rename, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { encryptHTML } from 'pagecrypt/core'

const root = fileURLToPath(new URL('..', import.meta.url))
const indexPath = join(root, 'index.html')
const imagePath = join(root, 'hack_inst.png')
const tempPath = join(root, 'index.html.pagecrypt-tmp')

let html = await readFile(indexPath, 'utf8')
if (html.includes('<pre class="hidden" data-i=') && html.includes('<title>Protected Page</title>')) {
  const oldPassword = process.env.PAGECRYPT_OLD_PASSWORD
  if (!oldPassword) throw new Error('index.html is already protected. Set PAGECRYPT_OLD_PASSWORD to change its password, or rebuild the plain HTML.')
  const payload = html.match(/<pre class="hidden" data-i="([^"]+)">([^<]+)<\/pre>/)
  if (!payload) throw new Error('PageCrypt payload was not found.')
  const bytes = Buffer.from(payload[2], 'base64')
  const baseKey = await webcrypto.subtle.importKey('raw', new TextEncoder().encode(oldPassword), 'PBKDF2', false, ['deriveKey'])
  const key = await webcrypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: bytes.subarray(0, 32), iterations: Number(payload[1]), hash: 'SHA-256' },
    baseKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt'],
  )
  html = new TextDecoder().decode(await webcrypto.subtle.decrypt(
    { name: 'AES-GCM', iv: bytes.subarray(32, 48) }, key, bytes.subarray(48),
  ))
}

const imageReference = 'src="./hack_inst.png"'
const selfContainedHTML = html.includes(imageReference)
  ? html.replaceAll(imageReference, `src="data:image/png;base64,${(await readFile(imagePath)).toString('base64')}"`)
  : html

const password = process.env.PAGECRYPT_PASSWORD || randomBytes(24).toString('base64url')
const protectedHTML = await encryptHTML(selfContainedHTML, password)
await writeFile(tempPath, protectedHTML, { mode: 0o644 })
await rename(tempPath, indexPath)

console.log('Protected index.html with PageCrypt.')
if (!process.env.PAGECRYPT_PASSWORD) console.log(`Password: ${password}`)
