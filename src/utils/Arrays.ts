export function removeItem<T>(array: T[], item: T): void {
  const index = array.indexOf(item)
  if (index > -1) {
    array.splice(index, 1)
  }
}
