import ShallowModel from '@/models/ShallowModel'
import { v4 as uuidv4 } from 'uuid'
import { shallowRef } from 'vue'
import type { Ref } from 'vue'
import type { Optional } from '@/utils/Types'

export default class AbstractModel extends ShallowModel {
  public readonly instanceId

  private readonly _id: Ref<Optional<string>>

  private readonly _isNew: Ref<boolean>
  private readonly _isUpdated: Ref<boolean>
  private readonly _isDeleted: Ref<boolean>

  constructor(id: Optional<string>) {
    super()

    this.instanceId = uuidv4()

    this._id = shallowRef(id)

    this._isNew = shallowRef(!id)
    this._isUpdated = shallowRef(false)
    this._isDeleted = shallowRef(false)
  }

  get id(): Optional<string> {
    return this._id.value
  }

  protected set id(value: Optional<string>) {
    this._id.value = value
  }

  get isNew(): boolean {
    return this._isNew.value
  }

  protected set isNew(value: boolean) {
    this._isNew.value = value
  }

  get isUpdated(): boolean {
    return this._isUpdated.value
  }

  protected set isUpdated(value: boolean) {
    this._isUpdated.value = value
  }

  get isDeleted(): boolean {
    return this._isDeleted.value
  }

  protected set isDeleted(value: boolean) {
    this._isDeleted.value = value
  }

  async validate(): Promise<boolean> {
    return true
  }

  protected onUpdate(): void {
    this.isUpdated = true
  }
}
