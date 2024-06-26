import type { Ref } from 'vue'
import type { Optional } from '@/utils/Types'
import AbstractModel from '@/models/AbstractModel'
import { notifyUpdateRef } from '@/utils/notifyUpdateRef'
import { shallowRef } from 'vue'

export default class TargetFilter extends AbstractModel {
  private readonly _name: Ref<Optional<string>>
  private readonly _query: Ref<Optional<string>>
  private readonly _createdAt: Ref<Optional<number>>

  private readonly _nameError: Ref<Optional<string>>
  private readonly _queryError: Ref<Optional<string>>

  constructor({
    id,
    name,
    query,
    createdAt
  }: {
    id?: string
    name?: string
    query?: string
    createdAt?: number
  }) {
    super(id)

    const onUpdate = this.onUpdate.bind(this)

    this._name = notifyUpdateRef(name, onUpdate)
    this._query = notifyUpdateRef(query, onUpdate)
    this._createdAt = shallowRef(createdAt)

    this._nameError = shallowRef(undefined)
    this._queryError = shallowRef(undefined)
  }

  get name(): Optional<string> {
    return this._name.value
  }

  set name(value: Optional<string>) {
    this._name.value = value
  }

  get query(): Optional<string> {
    return this._query.value
  }

  set query(value: Optional<string>) {
    this._query.value = value
  }

  get createdAt(): Optional<number> {
    return this._createdAt.value
  }

  private set createdAt(value: Optional<number>) {
    this._createdAt.value = value
  }

  get nameError(): Optional<string> {
    return this._nameError.value
  }

  private set nameError(value: Optional<string>) {
    this._nameError.value = value
  }

  get queryError(): Optional<string> {
    return this._queryError.value
  }

  private set queryError(value: Optional<string>) {
    this._queryError.value = value
  }

  async validate(): Promise<boolean> {
    let isValid = true

    const requiredMessage = 'Required'

    this.nameError = undefined
    this.queryError = undefined

    if (!this.name) {
      this.nameError = requiredMessage
      isValid = false
    }
    if (!this.query) {
      this.queryError = requiredMessage
      isValid = false
    }

    return isValid
  }

  async save(): Promise<void> {
    if (this.isDeleted) {
      throw new Error("Can't save deleted target filter")
    }

    if (!(await this.validate())) {
      throw new Error('Target filter is not valid')
    }

    if (this.isNew) {
      await this.create()
    } else if (this.isUpdated) {
      await this.update()
    }
  }

  async delete(): Promise<void> {
    if (this.isDeleted) {
      return
    }

    const response = await fetch(`/rest/v1/targetfilters/${this.id}`, {
      method: 'DELETE'
    })

    if (response.status !== 200) {
      throw new Error('Failed to delete target filter')
    }

    this.isDeleted = true
  }

  private async update(): Promise<void> {
    const body = JSON.stringify({
      name: this.name,
      query: this.query
    })

    const response = await fetch(`/rest/v1/targetfilters/${this.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    })

    if (response.status !== 201) {
      throw new Error('Failed to update target filter')
    }

    this.isUpdated = false
  }

  private async create(): Promise<void> {
    const body = JSON.stringify({
      name: this.name,
      query: this.query
    })

    const response = await fetch('/rest/v1/targetfilters', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    })

    if (response.status !== 201) {
      if (response.status === 400) {
        const error = await response.json()
        if (error.errorCode === 'hawkbit.server.error.rest.param.rsqlParamSyntax') {
          this.queryError = 'Invalid syntax'
        }
      }
      throw new Error('Failed to create target filter')
    }

    const result = await response.json()

    this.id = result.id
    this.isNew = false
  }

  static async getById(id: string): Promise<TargetFilter> {
    const response = await fetch(`/rest/v1/softwaremodules/${id}`)

    if (response.status !== 200) {
      throw new Error('Failed to get target filter')
    }

    const result = await response.json()

    return new TargetFilter({
      id: result.id,
      name: result.name,
      query: result.query,
      createdAt: result.createdAt
    })
  }

  static async getAll(): Promise<TargetFilter[]> {
    const response = await fetch('/rest/v1/targetfilters')

    if (response.status !== 200) {
      throw new Error('Failed to get target filters')
    }

    const results = (await response.json()).content

    return results.map(
      (result: any) =>
        new TargetFilter({
          id: result.id,
          name: result.name,
          query: result.query,
          createdAt: result.createdAt
        })
    )
  }
}
