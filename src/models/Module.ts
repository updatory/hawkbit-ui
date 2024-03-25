import type { Ref } from 'vue'
import { shallowReactive, shallowRef } from 'vue'
import { isBlank } from '@/utils/Validation'
import { v4 as uuidv4 } from 'uuid'
import Artifact from '@/models/Artifact'
import { removeItem } from '@/utils/Array'
import { notifyUpdateRef } from '@/utils/notifyUpdateRef'
import type ModuleProperty from '@/models/ModuleProperty'

export default class Module {
  id: Ref<string | undefined>
  name: Ref<string | undefined>
  version: Ref<string | undefined>
  type: Ref<string | undefined>
  vendor: Ref<string | undefined>
  description: Ref<string | undefined>
  encrypted: Ref<boolean>
  createdAt: Ref<number | undefined>

  artifacts: Ref<Artifact[]>
  properties: Ref<ModuleProperty[]>

  meta: {
    isNew: Ref<boolean>
    isUpdated: Ref<boolean>
    isDeleted: Ref<boolean>
    instanceId: Ref<string>
    validation: {
      name: Ref<string | undefined>
      type: Ref<string | undefined>
      version: Ref<string | undefined>
    }
  }

  private artifactDeleteQueue: Artifact[] = []
  private propertyDeleteQueue: ModuleProperty[] = []

  constructor({
    id,
    name,
    version,
    type,
    vendor,
    description,
    encrypted,
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
    encrypted?: boolean
    createdAt?: number
    artifacts?: Artifact[]
    properties?: ModuleProperty[]
  }) {
    const onUpdate = this.onUpdate.bind(this)

    this.id = shallowRef(id)
    this.name = shallowRef(name)
    this.version = shallowRef(version)
    this.type = shallowRef(type)
    this.encrypted = shallowRef(encrypted || false)
    this.vendor = notifyUpdateRef(vendor, onUpdate)
    this.description = notifyUpdateRef(description, onUpdate)
    this.createdAt = shallowRef(createdAt)

    this.artifacts = shallowRef(shallowReactive(artifacts || []))
    this.properties = shallowRef(shallowReactive(properties || []))

    this.meta = {
      isNew: shallowRef(!id),
      isUpdated: shallowRef(false),
      isDeleted: shallowRef(false),
      instanceId: shallowRef(uuidv4()),
      validation: {
        name: shallowRef(undefined),
        type: shallowRef(undefined),
        version: shallowRef(undefined)
      }
    }
  }

  private onUpdate(): void {
    this.meta.isUpdated.value = true
  }

  addProperty(property: ModuleProperty): void {
    this.properties.value.push(property)
  }

  removeProperty(property: ModuleProperty): void {
    this.propertyDeleteQueue.push(property)
    removeItem(this.properties.value, property)
  }

  addArtifact(artifact: Artifact): void {
    this.artifacts.value.push(artifact)
  }

  removeArtifact(artifact: Artifact): void {
    this.artifactDeleteQueue.push(artifact)
    removeItem(this.artifacts.value, artifact)
  }

  validate(): boolean {
    let isValid = true

    const requiredMessage = 'Required'

    if (isBlank(this.name.value)) {
      this.meta.validation.name.value = requiredMessage
      isValid = false
    }
    if (isBlank(this.type.value)) {
      this.meta.validation.type.value = requiredMessage
      isValid = false
    }
    if (isBlank(this.version.value)) {
      this.meta.validation.version.value = requiredMessage
      isValid = false
    }

    return isValid
  }

  private async create(): Promise<void> {
    const body = JSON.stringify([
      {
        name: this.name.value,
        version: this.version.value,
        type: this.type.value,
        vendor: this.vendor.value,
        description: this.description.value,
        // encrypted: this.encrypted.value
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

    this.id.value = results[0].id
    this.meta.isNew.value = false
  }

  private async update(): Promise<void> {
    const body = JSON.stringify({
      vendor: this.vendor.value,
      description: this.vendor.value
    })

    const response = await fetch(`/rest/v1/softwaremodules/${this.id.value}`, {
      method: 'PUT',
      body,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.status !== 200) {
      throw new Error('Failed to update module')
    }
  }

  async save(): Promise<void> {
    if (this.meta.isNew.value) {
      await this.create()
    } else if (this.meta.isUpdated.value) {
      await this.update()
    }

    while (this.artifactDeleteQueue.length > 0) {
      const artifact = this.artifactDeleteQueue[0]
      if (artifact) {
        await artifact.delete(this.id.value!)
        this.artifactDeleteQueue.shift()
      }
    }

    while (this.propertyDeleteQueue.length > 0) {
      const property = this.propertyDeleteQueue[0]
      if (property) {
        await property.delete(this.id.value!)
        this.propertyDeleteQueue.shift()
      }
    }

    for (const artifact of this.artifacts.value) {
      await artifact.save(this.id.value!)
    }

    for (const property of this.properties.value) {
      await property.save(this.id.value!)
    }
  }

  static async getById(id: string): Promise<Module> {
    const response = await fetch(`/rest/v1/softwaremodules/${id}`)

    if (response.status !== 200) {
      throw new Error('Failed to get module')
    }

    const result = await response.json()

    const artifacts = await Artifact.getAll(id)

    return new Module({
      id: result.id,
      name: result.name,
      version: result.version,
      type: result.type,
      vendor: result.vendor,
      description: result.description,
      encrypted: result.encrypted,
      createdAt: result.createdAt,
      artifacts
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
          encrypted: result.encrypted,
          createdAt: result.createdAt
        })
    )
  }
}
