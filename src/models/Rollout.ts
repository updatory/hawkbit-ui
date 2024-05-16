import AbstractModel from '@/models/AbstractModel'
import type { Ref } from 'vue'
import { shallowRef } from 'vue'
import type { Optional } from '@/utils/Types'
import Distribution from '@/models/Distribution'
import RolloutType from '@/models/RolloutType'
import { isBlank } from '@/utils/Validation'
import TargetFilter from '@/models/TargetFilter'

export default class Rollout extends AbstractModel {
  private readonly _name: Ref<Optional<string>>
  private readonly _type: Ref<RolloutType>
  private readonly _description: Ref<Optional<string>>
  private readonly _startAt: Ref<Optional<number>>
  private readonly _forceTime: Ref<Optional<number>>
  private readonly _targetFilter: Ref<Optional<TargetFilter>>
  private readonly _distribution: Ref<Optional<Distribution>>
  private readonly _createdAt: Ref<Optional<number>>

  private readonly _nameError: Ref<Optional<string>>
  private readonly _targetFilterError: Ref<Optional<string>>
  private readonly _distributionError: Ref<Optional<string>>

  constructor({
    id,
    name,
    type,
    description,
    startAt,
    forceTime,
    targetFilter,
    distribution,
    createdAt
  }: {
    id?: string
    name?: string
    type?: RolloutType
    description?: string
    startAt?: number
    forceTime?: number
    targetFilter?: TargetFilter
    distribution?: Distribution
    createdAt?: number
  }) {
    super(id)

    this._name = shallowRef(name)
    this._type = shallowRef(type || RolloutType.Soft)
    this._description = shallowRef(description)
    this._startAt = shallowRef(startAt)
    this._forceTime = shallowRef(forceTime)
    this._targetFilter = shallowRef(targetFilter)
    this._distribution = shallowRef(distribution)
    this._createdAt = shallowRef(createdAt)

    this._nameError = shallowRef(undefined)
    this._targetFilterError = shallowRef(undefined)
    this._distributionError = shallowRef(undefined)
  }

  get name(): Optional<string> {
    return this._name.value
  }

  set name(value: string) {
    this._name.value = value
  }

  get type(): RolloutType {
    return this._type.value
  }

  set type(value: RolloutType) {
    this._type.value = value
  }

  get description(): Optional<string> {
    return this._description.value
  }

  set description(value: string) {
    this._description.value = value
  }

  get startAt(): Optional<number> {
    return this._startAt.value
  }

  set startAt(value: number) {
    this._startAt.value = value
  }

  get forceTime(): Optional<number> {
    return this._forceTime.value
  }

  set forceTime(value: number) {
    this._forceTime.value = value
  }

  get targetFilter(): Optional<TargetFilter> {
    return this._targetFilter.value
  }

  set targetFilter(value: TargetFilter) {
    this._targetFilter.value = value
  }

  get distribution(): Optional<Distribution> {
    return this._distribution.value
  }

  set distribution(value: Distribution) {
    this._distribution.value = value
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

  get targetFilterError(): Optional<string> {
    return this._targetFilterError.value
  }

  private set targetFilterError(value: Optional<string>) {
    this._targetFilterError.value = value
  }

  get distributionError(): Optional<string> {
    return this._distributionError.value
  }

  private set distributionError(value: Optional<string>) {
    this._distributionError.value = value
  }

  async validate(): Promise<boolean> {
    let isValid = true

    const requiredMessage = 'Required'

    this.nameError = undefined

    if (isBlank(this.name)) {
      this.nameError = requiredMessage
      isValid = false
    }
    if (!this.targetFilter) {
      this.targetFilterError = requiredMessage
      isValid = false
    }
    if (!this.distribution) {
      this.distributionError = requiredMessage
      isValid = false
    }

    return isValid
  }

  async save(): Promise<void> {
    if (this.isDeleted) {
      throw new Error("Can't save deleted rollout")
    }

    if (!(await this.validate())) {
      throw new Error('Rollout is not valid')
    }

    const body = JSON.stringify([
      {
        name: this.name,
        type: this.type,
        description: this.description,
        startAt: this.startAt,
        forceTime: this.forceTime,
        targetFilter: this.targetFilter!.query,
        distribution: this.distribution!.id
      }
    ])

    const response = await fetch('/rest/v1/rollouts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    })

    if (response.status !== 201) {
      throw new Error('Failed to create rollout')
    }

    const results = await response.json()

    this.id = results[0].id
    this.isNew = false
  }

  async delete(): Promise<void> {
    if (this.isDeleted) {
      return
    }

    const response = await fetch(`/rest/v1/rollouts/${this.id}`, {
      method: 'DELETE'
    })

    if (response.status !== 200) {
      throw new Error('Failed to delete rollout')
    }

    this.isDeleted = true
  }

  static async getById(id: string): Promise<Rollout> {
    const response = await fetch(`/rest/v1/softwaremodules/${id}`)

    if (response.status !== 200) {
      throw new Error('Failed to get rollout')
    }

    const result = await response.json()

    const targetFilter = new TargetFilter({ query: result.targetFilterQuery })
    const distribution = await Distribution.getById(result.distributionSetId)

    return new Rollout({
      id: result.id,
      name: result.name,
      type: result.type,
      description: result.description,
      createdAt: result.createdAt,
      targetFilter,
      distribution
    })
  }

  static async getAll(): Promise<Rollout[]> {
    const response = await fetch('/rest/v1/rollouts')

    if (response.status !== 200) {
      throw new Error('Failed to get rollouts')
    }

    const results = (await response.json()).content

    return results.map(
      (result: any) =>
        new Rollout({
          id: result.id,
          name: result.name,
          type: result.type,
          description: result.description,
          createdAt: result.createdAt
        })
    )
  }
}
