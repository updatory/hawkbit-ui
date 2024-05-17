import AbstractModel from '@/models/AbstractModel'
import type { Ref } from 'vue'
import type { Optional } from '@/utils/Types'
import { shallowRef } from 'vue'
import { notifyUpdateRef } from '@/utils/notifyUpdateRef'
import { randomString } from '@/utils/Strings'

export default class Target extends AbstractModel {
  private readonly _name: Ref<Optional<string>>
  private readonly _description: Ref<Optional<string>>
  private readonly _securityToken: Ref<Optional<string>>
  private readonly _createdAt: Ref<Optional<number>>

  private readonly _idError: Ref<Optional<string>>
  private readonly _nameError: Ref<Optional<string>>
  private readonly _securityTokenError: Ref<Optional<string>>

  constructor({
    id,
    name,
    description,
    securityToken,
    createdAt
  }: {
    id?: string
    name?: string
    description?: string
    securityToken?: string
    createdAt?: number
  }) {
    super(id)

    const onUpdate = this.onUpdate.bind(this)

    this._name = notifyUpdateRef(name, onUpdate)
    this._description = notifyUpdateRef(description, onUpdate)
    this._securityToken = notifyUpdateRef(securityToken, onUpdate)
    this._createdAt = shallowRef(createdAt)

    this._idError = shallowRef(undefined)
    this._nameError = shallowRef(undefined)
    this._securityTokenError = shallowRef(undefined)
  }

  get name(): Optional<string> {
    return this._name.value
  }

  set name(value: string) {
    this._name.value = value
  }

  get description(): Optional<string> {
    return this._description.value
  }

  set description(value: string) {
    this._description.value = value
  }

  get securityToken(): Optional<string> {
    return this._securityToken.value
  }

  set securityToken(value: string) {
    this._securityToken.value = value
  }

  get createdAt(): Optional<number> {
    return this._createdAt.value
  }

  private set createdAt(value: number) {
    this._createdAt.value = value
  }

  get nameError(): Optional<string> {
    return this._nameError.value
  }

  private set nameError(value: Optional<string>) {
    this._nameError.value = value
  }

  get idError(): Optional<string> {
    return this._idError.value
  }

  private set idError(value: Optional<string>) {
    this._idError.value = value
  }

  get securityTokenError(): Optional<string> {
    return this._securityTokenError.value
  }

  private set securityTokenError(value: Optional<string>) {
    this._securityTokenError.value = value
  }

  generateId(): void {
    this.id = randomString(40)
  }

  generateSecurityToken(): void {
    this.securityToken = randomString(40)
  }

  async validate(): Promise<boolean> {
    let isValid = true

    const requiredMessage = 'Required'

    this.nameError = undefined
    this.idError = undefined
    this.securityTokenError = undefined

    if (!this.name) {
      this.nameError = requiredMessage
      isValid = false
    }
    if (!this.id) {
      this.idError = requiredMessage
      isValid = false
    }
    if (!this.securityToken) {
      this.securityTokenError = requiredMessage
      isValid = false
    }

    return isValid
  }

  async save(): Promise<void> {
    if (this.isDeleted) {
      throw new Error('Cannot save a deleted target')
    }

    if (!(await this.validate())) {
      throw new Error('Target is not valid')
    }

    if (this.isNew) {
      await this.create()
    } else if (this.isUpdated) {
      await this.update()
    }
  }

  private async create(): Promise<void> {
    const body = JSON.stringify([
      {
        name: this.name,
        description: this.description,
        controllerId: this.id,
        securityToken: this.securityToken
      }
    ])

    const response = await fetch('/rest/v1/targets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    })

    if (response.status !== 200 && response.status !== 201) {
      throw new Error('Failed to create target')
    }

    const result = await response.json()

    this.id = result.controllerId
    this.isNew = false
  }

  private async update(): Promise<void> {
    const body = JSON.stringify({
      name: this.name,
      description: this.description,
      controllerId: this.id,
      securityToken: this.securityToken
    })

    const response = await fetch(`/rest/v1/targets/${this.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    })

    if (response.status !== 200) {
      throw new Error('Failed to update target')
    }

    this.isUpdated = false
  }

  async delete(): Promise<void> {
    if (this.isDeleted) {
      return
    }

    const response = await fetch(`/rest/v1/targets/${this.id}`, {
      method: 'DELETE'
    })

    if (response.status !== 200) {
      throw new Error('Failed to delete target')
    }

    this.isDeleted = true
  }

  static async getById(id: string): Promise<Target> {
    const response = await fetch(`/rest/v1/targets/${id}`)

    if (response.status !== 200) {
      throw new Error('Failed to get target')
    }

    const result = await response.json()

    return new Target({
      id: result.controllerId,
      name: result.name,
      description: result.description,
      securityToken: result.securityToken,
      createdAt: result.createdAt
    })
  }

  static async getAll(): Promise<Target[]> {
    const response = await fetch('/rest/v1/targets')

    if (response.status !== 200) {
      throw new Error('Failed to get targets')
    }

    const results = (await response.json()).content

    return results.map(
      (result: any) =>
        new Target({
          id: result.controllerId,
          name: result.name,
          description: result.description,
          securityToken: result.securityToken,
          createdAt: result.createdAt
        })
    )
  }
}
