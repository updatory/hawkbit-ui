import { getCurrentInstance } from 'vue'
import type { Emitter } from 'mitt'
import type { EventList } from '@/events/EventList'

export default function useEmitter(): Emitter<EventList> {
  const internalInstance = getCurrentInstance();
  if (!internalInstance) throw new Error('useEmitter called when there is no active instance');
  return internalInstance.appContext.config.globalProperties.emitter as Emitter<EventList>;
}

