export function kebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()
}

export function randomString(length: number): string {
  const dec2hex = (dec: number) => {
    return dec.toString(16).padStart(2, '0')
  }

  const bytes = new Uint8Array(length / 2)
  window.crypto.getRandomValues(bytes)

  return Array.from(bytes, dec2hex).join('')
}
