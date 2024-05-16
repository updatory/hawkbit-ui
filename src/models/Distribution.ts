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
  private readonly _type: Ref<Optional<string>>
  private readonly _description: Ref<Optional<string>>
  private readonly _createdAt: Ref<Optional<number>>

  private readonly _modules: Module[]

  private readonly _nameError: Ref<Optional<string>>
  private readonly _typeError: Ref<Optional<string>>
  private readonly _versionError: Ref<Optional<string>>
  private readonly _modulesError: Ref<Optional<string>>

  private moduleAddQueue: Module[] = []
  private moduleDeleteQueue: Module[] = []

  constructor({
    id,
    name,
    version,
    type,
    description,
    createdAt,
    modules
  }: {
    id?: string
    name?: string
    version?: string
    type?: string
    vendor?: string
    description?: string
    createdAt?: number
    modules?: Module[]
  }) {
    super(id)

    const onUpdate = this.onUpdate.bind(this)

    this._name = shallowRef(name)
    this._version = shallowRef(version)
    this._type = shallowRef(type)
    this._description = notifyUpdateRef(description, onUpdate)
    this._createdAt = shallowRef(createdAt)

    this._modules = shallowReactive(modules || [])

    this._nameError = shallowRef(undefined)
    this._typeError = shallowRef(undefined)
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

  get type(): Optional<string> {
    return this._type.value
  }

  set type(value: string) {
    this._type.value = value
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

  get typeError(): Optional<string> {
    return this._typeError.value
  }

  private set typeError(value: Optional<string>) {
    this._typeError.value = value
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
    if (!this.isNew) {
      this.moduleAddQueue.push(module)
    }
    this.modules.push(module)
  }

  removeModule(module: Module): void {
    if (!this.isNew) {
      this.moduleDeleteQueue.push(module)
    }

    removeItem(this.modules, module)
  }

  async validate(): Promise<boolean> {
    let isValid = true

    const requiredMessage = 'Required'

    this.nameError = undefined
    this.typeError = undefined
    this.versionError = undefined

    if (isBlank(this.name)) {
      this.nameError = requiredMessage
      isValid = false
    }
    if (isBlank(this.type)) {
      this.typeError = requiredMessage
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
        type: this.type,
        description: this.description,
        modules: this.modules.map((module) => {
          module.id
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
    this.isNew = false
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

    this.isUpdated = false
  }

  private async processModuleAddQueue(): Promise<void> {
    const body = JSON.stringify(
      this.moduleAddQueue.map((module) => {
        module.id
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

    this.moduleAddQueue = []
  }

  private async processModuleDeleteQueue(): Promise<void> {
    while (this.moduleDeleteQueue.length > 0) {
      const module = this.moduleDeleteQueue[0]
      if (module) {
        const response = await fetch(
          `/rest/v1/distributionsets/${this.id}/assignedSM/${module.id}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )

        if (response.status !== 200) {
          throw new Error('Failed to delete module assignment')
        }

        this.moduleDeleteQueue.shift()
      }
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
    } else if (this.isUpdated) {
      await this.update()
      await this.processModuleDeleteQueue()
      await this.processModuleAddQueue()
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

    const modules = result.modules.map(({ id }: { id: string }) => Module.getById(id))

    return new Distribution({
      id: result.id,
      name: result.name,
      version: result.version,
      type: result.type,
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
          type: result.type,
          vendor: result.vendor,
          description: result.description,
          createdAt: result.createdAt
        })
    )
  }
}
