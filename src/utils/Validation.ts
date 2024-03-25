export function isBlank(value?: string): boolean {
  return !value || value.trim() === ''
}
