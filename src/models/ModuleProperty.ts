import type { Ref } from 'vue'
import { shallowRef } from 'vue'
import { notifyUpdateRef } from '@/utils/notifyUpdateRef'
import { v4 as uuidv4 } from 'uuid'

export default class ModuleProperty {
  key: Ref<string | undefined>
  value: Ref<string | undefined>
  targetVisible: Ref<boolean>

  meta: {
    isNew: Ref<boolean>
    isUpdated: Ref<boolean>
    isDeleted: Ref<boolean>
    instanceId: Ref<string>
    validation: {
      key: Ref<string | undefined>
      value: Ref<string | undefined>
    }
  }

  constructor({
    key,
    value,
    targetVisible
  }: {
    key?: string
    value?: string
    targetVisible?: boolean
  }) {
    const onUpdate = this.onUpdate.bind(this)

    this.key = notifyUpdateRef(key, onUpdate)
    this.value = notifyUpdateRef(value, onUpdate)
    this.targetVisible = notifyUpdateRef(targetVisible || false, onUpdate)

    this.meta = {
      isNew: shallowRef(!key),
      isUpdated: shallowRef(false),
      isDeleted: shallowRef(false),
      instanceId: shallowRef(uuidv4()),
      validation: {
        key: shallowRef(undefined),
        value: shallowRef(undefined)
      }
    }
  }

  private onUpdate(): void {
    this.meta.isUpdated.value = true
  }

  validate(): boolean {
    let isValid = true

    const requiredMessage = 'Required'

    if (!this.key.value) {
      this.meta.validation.key.value = requiredMessage
      isValid = false
    }

    if (!this.value.value) {
      this.meta.validation.value.value = requiredMessage
      isValid = false
    }

    return isValid
  }

  async save(moduleId: string): Promise<void> {
    if (this.meta.isNew.value) {
      await this.create(moduleId)
    } else if (this.meta.isUpdated.value) {
      await this.delete(moduleId)
      await this.create(moduleId)
    }
  }

  private async create(moduleId: string): Promise<void> {
    const body = JSON.stringify({
      key: this.key.value,
      value: this.value.value,
      targetVisible: this.targetVisible.value
    })

    const response = await fetch(`/rest/v1/softwaremodules/${moduleId}/metadata`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    })

    if (response.status !== 200) {
      throw new Error('Failed to create property')
    }

    this.meta.isNew.value = false
  }

  async delete(moduleId: string): Promise<void> {
    const propertyKey = this.key.value
    const response = await fetch(`/rest/v1/softwaremodules/${moduleId}/metadata/${propertyKey}`, {
      method: 'DELETE'
    })

    if (response.status !== 200) {
      throw new Error('Failed to delete property')
    }

    this.meta.isDeleted.value = true
  }
}
