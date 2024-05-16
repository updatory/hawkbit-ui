import type { Ref } from 'vue'
import { shallowReactive, shallowRef } from 'vue'
import { isBlank } from '@/utils/Validation'
import Artifact from '@/models/Artifact'
import { removeItem } from '@/utils/Arrays'
import { notifyUpdateRef } from '@/utils/notifyUpdateRef'
import ModuleProperty from '@/models/ModuleProperty'
import type { Optional } from '@/utils/Types'
import AbstractModel from '@/models/AbstractModel'

export default class Module extends AbstractModel {
  private readonly _name: Ref<Optional<string>>
  private readonly _version: Ref<Optional<string>>
  private readonly _type: Ref<Optional<string>>
  private readonly _vendor: Ref<Optional<string>>
  private readonly _description: Ref<Optional<string>>
  private readonly _createdAt: Ref<Optional<number>>

  private readonly _artifacts: Artifact[]
  private readonly _properties: ModuleProperty[]

  private readonly _nameError: Ref<Optional<string>>
  private readonly _typeError: Ref<Optional<string>>
  private readonly _versionError: Ref<Optional<string>>

  private artifactDeleteQueue: Artifact[] = []
  private propertyDeleteQueue: ModuleProperty[] = []

  constructor({
    id,
    name,
    version,
    type,
    vendor,
    description,
    createdAt,
    artifacts,
    properties
  }: {
    id?: string
    name?: string
    version?: string
    type?: string
    vendor?: string
    description?: string
    createdAt?: number
    artifacts?: Artifact[]
    properties?: ModuleProperty[]
  }) {
    super(id)

    const onUpdate = this.onUpdate.bind(this)

    this._name = shallowRef(name)
    this._version = shallowRef(version)
    this._type = shallowRef(type)
    this._vendor = notifyUpdateRef(vendor, onUpdate)
    this._description = notifyUpdateRef(description, onUpdate)
    this._createdAt = shallowRef(createdAt)

    this._artifacts = shallowReactive(artifacts || [])
    this._properties = shallowReactive(properties || [])

    this._nameError = shallowRef(undefined)
    this._typeError = shallowRef(undefined)
    this._versionError = shallowRef(undefined)
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

  get vendor(): Optional<string> {
    return this._vendor.value
  }

  set vendor(value: string) {
    this._vendor.value = value
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

  get artifacts(): Artifact[] {
    return this._artifacts
  }

  get properties(): ModuleProperty[] {
    return this._properties
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

  addProperty(property: ModuleProperty): void {
    this.properties.push(property)
  }

  removeProperty(property: ModuleProperty): void {
    this.propertyDeleteQueue.push(property)
    removeItem(this.properties, property)
  }

  addArtifact(artifact: Artifact): void {
    this.artifacts.push(artifact)
  }

  removeArtifact(artifact: Artifact): void {
    this.artifactDeleteQueue.push(artifact)
    removeItem(this.artifacts, artifact)
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

    for (const property of this.properties) {
      isValid = (await property.validate()) ? isValid : false
    }

    return isValid
  }

  private async create(): Promise<void> {
    const body = JSON.stringify([
      {
        name: this.name,
        version: this.version,
        type: this.type,
        vendor: this.vendor,
        description: this.description,
        encrypted: false
      }
    ])

    const response = await fetch('/rest/v1/softwaremodules', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    })

    if (response.status !== 201) {
      throw new Error('Failed to create module')
    }

    const results = await response.json()

    this.id = results[0].id
    this.isNew = false
  }

  private async update(): Promise<void> {
    const body = JSON.stringify({
      vendor: this.vendor,
      description: this.vendor
    })

    const response = await fetch(`/rest/v1/softwaremodules/${this.id}`, {
      method: 'PUT',
      body,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.status !== 200 && response.status !== 201) {
      throw new Error('Failed to update module')
    }

    this.isUpdated = false
  }

  async save(): Promise<void> {
    if (this.isDeleted) {
      throw new Error("Can't save deleted module")
    }

    if (!(await this.validate())) {
      throw new Error('Module is not valid')
    }

    if (this.isNew) {
      await this.create()
    } else if (this.isUpdated) {
      await this.update()
    }

    while (this.artifactDeleteQueue.length > 0) {
      const artifact = this.artifactDeleteQueue[0]
      if (artifact) {
        await artifact.delete(this.id!)
        this.artifactDeleteQueue.shift()
      }
    }

    while (this.propertyDeleteQueue.length > 0) {
      const property = this.propertyDeleteQueue[0]
      if (property) {
        await property.delete(this.id!)
        this.propertyDeleteQueue.shift()
      }
    }

    for (const property of this.properties) {
      await property.save(this.id!)
    }

    for (const artifact of this.artifacts) {
      await artifact.save(this.id!)
    }
  }

  async delete(): Promise<void> {
    if (this.isDeleted) {
      return
    }

    const response = await fetch(`/rest/v1/softwaremodules/${this.id}`, {
      method: 'DELETE'
    })

    if (response.status !== 200) {
      throw new Error('Failed to delete target filter')
    }

    this.isDeleted = true
  }

  static async getById(id: string): Promise<Module> {
    const response = await fetch(`/rest/v1/softwaremodules/${id}`)

    if (response.status !== 200) {
      throw new Error('Failed to get module')
    }

    const result = await response.json()

    const artifacts = await Artifact.getAll(id)
    const properties = await ModuleProperty.getAll(id)

    return new Module({
      id: result.id,
      name: result.name,
      version: result.version,
      type: result.type,
      vendor: result.vendor,
      description: result.description,
      createdAt: result.createdAt,
      artifacts,
      properties
    })
  }

  static async getAll(): Promise<Module[]> {
    const response = await fetch('/rest/v1/softwaremodules')

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
