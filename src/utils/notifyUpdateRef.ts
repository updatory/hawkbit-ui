import { customRef } from 'vue'
import type { Ref } from 'vue'

export function notifyUpdateRef<T>(value: T, onUpdate: Function): Ref<T> {
  return customRef<T>((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newValue) {
        value = newValue
        onUpdate()
        trigger()
      }
    }
  })
}
