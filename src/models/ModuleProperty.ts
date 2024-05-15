import type { Ref } from 'vue'
import { notifyUpdateRef } from '@/utils/notifyUpdateRef'
import AbstractModel from '@/models/AbstractModel'
import type { Optional } from '@/utils/Types'
import { shallowRef } from 'vue'

export default class ModuleProperty extends AbstractModel {
  private readonly _key: Ref<Optional<string>>
  private readonly _value: Ref<Optional<string>>
  private readonly _targetVisible: Ref<boolean>

  private readonly _keyError: Ref<Optional<string>>
  private readonly _valueError: Ref<Optional<string>>

  constructor({
    key,
    value,
    targetVisible
  }: {
    key?: string
    value?: string
    targetVisible?: boolean
  }) {
    super(key)

    const onUpdate = this.onUpdate.bind(this)

    this._key = notifyUpdateRef(key, onUpdate)
    this._value = notifyUpdateRef(value, onUpdate)
    this._targetVisible = notifyUpdateRef(targetVisible || false, onUpdate)

    this._keyError = shallowRef(undefined)
    this._valueError = shallowRef(undefined)
  }

  get key(): Optional<string> {
    return this._key.value
  }

  set key(value: string) {
    this._key.value = value
  }

  private get originalKey(): Optional<string> {
    return this.id
  }

  private set originalKey(value: Optional<string>) {
    this.id = value
  }

  get value(): Optional<string> {
    return this._value.value
  }

  set value(value: string) {
    this._value.value = value
  }

  get targetVisible(): boolean {
    return this._targetVisible.value
  }

  set targetVisible(value: boolean) {
    this._targetVisible.value = value
  }

  get keyError(): Optional<string> {
    return this._keyError.value
  }

  private set keyError(value: Optional<string>) {
    this._keyError.value = value
  }

  get valueError(): Optional<string> {
    return this._valueError.value
  }

  private set valueError(value: Optional<string>) {
    this._valueError.value = value
  }

  async validate(): Promise<boolean> {
    let isValid = true

    const requiredMessage = 'Required'

    this.keyError = undefined
    this.valueError = undefined

    if (!this.key) {
      this.keyError = requiredMessage
      isValid = false
    }

    if (!this.value) {
      this.valueError = requiredMessage
      isValid = false
    }

    return Promise.resolve(isValid)
  }

  async save(moduleId: string): Promise<void> {
    if (this.isDeleted) {
      throw new Error("Can't save deleted property")
    }

    if (this.isNew) {
      await this.create(moduleId)
    } else if (this.isUpdated && this.originalKey === this.key) {
      await this.update(moduleId)
    } else if (this.isUpdated && this.originalKey !== this.key) {
      // Create first and delete after to change has been made
      await this.create(moduleId)
      await this.delete(moduleId)
    }

    this.isNew = false
    this.isUpdated = false
    this.isDeleted = false

    this.originalKey = this.key
  }

  async delete(moduleId: string): Promise<void> {
    if (!this.isNew && !this.isDeleted) {
      const key = this.originalKey

      const response = await fetch(`/rest/v1/softwaremodules/${moduleId}/metadata/${key}`, {
        method: 'DELETE'
      })

      if (response.status !== 200) {
        throw new Error('Failed to delete property')
      }
    }

    this.isDeleted = true
  }

  private async create(moduleId: string): Promise<void> {
    const body = JSON.stringify([
      {
        key: this.key,
        value: this.value,
        targetVisible: this.targetVisible
      }
    ])

    const response = await fetch(`/rest/v1/softwaremodules/${moduleId}/metadata`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    })

    if (response.status !== 200 && response.status !== 201) {
      const message = await response.json()

      if (message.errorCode === 'hawkbit.server.error.repo.entitiyAlreayExists') {
        this.keyError = 'Not unique'
        throw new Error('Property already exists with the same key')
      } else {
        throw new Error('Failed to create property')
      }
    }
  }

  private async update(moduleId: string): Promise<void> {
    const key = this.originalKey

    const body = JSON.stringify({
      value: this.value,
      targetVisible: this.targetVisible
    })

    const response = await fetch(`/rest/v1/softwaremodules/${moduleId}/metadata/${key}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    })

    if (response.status !== 200) {
      throw new Error('Failed to update property')
    }
  }

  static async getAll(moduleId: string): Promise<ModuleProperty[]> {
    const response = await fetch(`/rest/v1/softwaremodules/${moduleId}/metadata`)

    if (response.status !== 200) {
      throw new Error('Failed to get modules')
    }

    const results = (await response.json()).content

    return results.map(
      (result: any) =>
        new ModuleProperty({
          key: result.key,
          value: result.value,
          targetVisible: result.targetVisible
        })
    )
  }
}
