import AbstractModel from '@/models/AbstractModel'
import type { Ref } from 'vue'
import type { Optional } from '@/utils/Types'
import { shallowReactive, shallowRef } from 'vue'
import { notifyUpdateRef } from '@/utils/notifyUpdateRef'
import { isBlank } from '@/utils/Validation'
import Module from '@/models/Module'
import { removeItem } from '@/utils/Arrays'

export default class Distribution extends AbstractModel {
  private readonly _name: Ref<Optional<string>>
  private readonly _version: Ref<Optional<string>>
  private readonly _description: Ref<Optional<string>>
  private readonly _createdAt: Ref<Optional<number>>

  private readonly _modules: Module[]

  private readonly _nameError: Ref<Optional<string>>
  private readonly _versionError: Ref<Optional<string>>
  private readonly _modulesError: Ref<Optional<string>>

  constructor({
    id,
    name,
    version,
    description,
    createdAt,
    modules
  }: {
    id?: string
    name?: string
    version?: string
    vendor?: string
    description?: string
    createdAt?: number
    modules?: Module[]
  }) {
    super(id)

    const onUpdate = this.onUpdate.bind(this)

    this._name = shallowRef(name)
    this._version = shallowRef(version)
    this._description = notifyUpdateRef(description, onUpdate)
    this._createdAt = shallowRef(createdAt)

    this._modules = shallowReactive(modules || [])

    this._nameError = shallowRef(undefined)
    this._versionError = shallowRef(undefined)
    this._modulesError = shallowRef(undefined)
  }

  get name(): Optional<string> {
    return this._name.value
  }

  set name(value: string) {
    this._name.value = value
  }

  get version(): Optional<string> {
    return this._version.value
  }

  set version(value: string) {
    this._version.value = value
  }

  get description(): Optional<string> {
    return this._description.value
  }

  set description(value: string) {
    this._description.value = value
  }

  get createdAt(): Optional<number> {
    return this._createdAt.value
  }

  private set createdAt(value: number) {
    this._createdAt.value = value
  }

  get modules(): Module[] {
    return this._modules
  }

  get nameError(): Optional<string> {
    return this._nameError.value
  }

  private set nameError(value: Optional<string>) {
    this._nameError.value = value
  }

  get versionError(): Optional<string> {
    return this._versionError.value
  }

  private set versionError(value: Optional<string>) {
    this._versionError.value = value
  }

  private set modulesError(value: Optional<string>) {
    this._modulesError.value = value
  }

  get modulesError(): Optional<string> {
    return this._modulesError.value
  }

  addModule(module: Module): void {
    for (const existingModule of this.modules) {
      if (existingModule.id === module.id) {
        return
      }
    }

    this.modules.push(module)
    this.isUpdated = true
  }

  removeModule(module: Module): void {
    removeItem(this.modules, module)
    this.isUpdated = true
  }

  async validate(): Promise<boolean> {
    let isValid = true

    const requiredMessage = 'Required'

    this.nameError = undefined
    this.versionError = undefined
    this.modulesError = undefined

    if (isBlank(this.name)) {
      this.nameError = requiredMessage
      isValid = false
    }
    if (isBlank(this.version)) {
      this.versionError = requiredMessage
      isValid = false
    }
    if (this.modules.length === 0) {
      this.modulesError = requiredMessage
      isValid = false
    }

    return isValid
  }

  private async create(): Promise<void> {
    const body = JSON.stringify([
      {
        name: this.name,
        version: this.version,
        type: 'os_app',
        description: this.description,
        modules: this.modules.map((module) => {
          return { id: module.id }
        })
      }
    ])

    const response = await fetch('/rest/v1/distributionsets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    })

    if (response.status !== 201) {
      throw new Error('Failed to create distribution')
    }

    const results = await response.json()

    this.id = results[0].id
  }

  private async update(): Promise<void> {
    const body = JSON.stringify({
      description: this.description
    })

    const response = await fetch(`/rest/v1/distributionsets/${this.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    })

    if (response.status !== 200) {
      throw new Error('Failed to update distribution')
    }
  }

  private async updateModules(): Promise<void> {
    const body = JSON.stringify(
      this.modules.map((module) => {
        return { id: module.id }
      })
    )

    const response = await fetch(`/rest/v1/distributionsets/${this.id}/assignedSM`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    })

    if (response.status !== 200) {
      throw new Error('Failed to add module assignments')
    }
  }

  async save(): Promise<void> {
    if (this.isDeleted) {
      throw new Error("Can't save deleted distribution")
    }

    if (!(await this.validate())) {
      throw new Error('Distribution is not valid')
    }

    if (this.isNew) {
      await this.create()
      this.isNew = false
      this.isUpdated = false
    } else if (this.isUpdated) {
      await this.update()
      await this.updateModules()
      this.isUpdated = false
    }
  }

  async delete(): Promise<void> {
    if (this.isDeleted) {
      return
    }

    const response = await fetch(`/rest/v1/distributionsets/${this.id}`, {
      method: 'DELETE'
    })

    if (response.status !== 200) {
      throw new Error('Failed to delete distribution')
    }

    this.isDeleted = true
  }

  static async getById(id: string): Promise<Distribution> {
    const response = await fetch(`/rest/v1/distributionsets/${id}`)

    if (response.status !== 200) {
      throw new Error('Failed to get distribution')
    }

    const result = await response.json()

    const modules = []
    for (const { id } of result.modules) {
      modules.push(await Module.getById(id))
    }

    return new Distribution({
      id: result.id,
      name: result.name,
      version: result.version,
      vendor: result.vendor,
      description: result.description,
      createdAt: result.createdAt,
      modules
    })
  }

  static async getAll(): Promise<Distribution[]> {
    const response = await fetch('/rest/v1/distributionsets')

    if (response.status !== 200) {
      throw new Error('Failed to get modules')
    }

    const results = (await response.json()).content

    return results.map(
      (result: any) =>
        new Module({
          id: result.id,
          name: result.name,
          version: result.version,
          vendor: result.vendor,
          description: result.description,
          createdAt: result.createdAt
        })
    )
  }
}
