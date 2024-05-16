import type { Ref } from 'vue'
import type { Optional } from '@/utils/Types'
import AbstractModel from '@/models/AbstractModel'
import { notifyUpdateRef } from '@/utils/notifyUpdateRef'

export default class TargetFilter extends AbstractModel {
  private readonly _name: Ref<Optional<string>>
  private readonly _query: Ref<Optional<string>>

  constructor({ id, name, query }: { id?: string; name?: string; query?: string }) {
    super(id)

    const onUpdate = this.onUpdate.bind(this)

    this._name = notifyUpdateRef(name, onUpdate)
    this._query = notifyUpdateRef(query, onUpdate)
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

    if (response.status !== 200) {
      throw new Error('Failed to update target filter')
    }

    this.isUpdated = false
  }

  private async create(): Promise<void> {
    const body = JSON.stringify([
      {
        name: this.name,
        query: this.query
      }
    ])

    const response = await fetch('/rest/v1/targetfilters', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    })

    if (response.status !== 201) {
      throw new Error('Failed to create target filter')
    }

    const results = await response.json()

    this.id = results[0].id
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
      query: result.query
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
          query: result.query
        })
    )
  }
}
