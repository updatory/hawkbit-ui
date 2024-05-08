import type { Ref } from 'vue'
import UploadState from '@/models/UploadState'
import { shallowRef } from 'vue'
import AbstractModel from '@/models/AbstractModel'

export default class Artifact extends AbstractModel {
  private readonly _fileName: Ref<string>
  private readonly _fileSize: Ref<number>

  private readonly _uploadProgress: Ref<number>
  private readonly _uploadState: Ref<UploadState>

  private readonly file?: File

  private constructor({
    id,
    file,
    fileName,
    fileSize
  }: {
    id?: string
    file?: File
    fileName: string
    fileSize: number
  }) {
    super(id)

    this._fileName = shallowRef(fileName)
    this._fileSize = shallowRef(fileSize)

    this._uploadProgress = shallowRef(0)
    this._uploadState = shallowRef(UploadState.Idle)

    this.file = file
  }

  get fileName(): string {
    return this._fileName.value
  }

  get fileSize(): number {
    return this._fileSize.value
  }

  get uploadProgress(): number {
    return this._uploadProgress.value
  }

  private set uploadProgress(value: number) {
    this._uploadProgress.value = value
  }

  get uploadState(): UploadState {
    return this._uploadState.value
  }

  private set uploadState(value: UploadState) {
    this._uploadState.value = value
  }

  save(moduleId: string): Promise<void> {
    if (!this.isNew) {
      return Promise.resolve()
    }

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open('POST', `/rest/v1/softwaremodules/${moduleId}/artifacts`)

      xhr.upload.onloadstart = () => {
        this.uploadProgress = 0
        this.uploadState = UploadState.Progress
      }

      xhr.upload.onloadend = () => {
        this.uploadProgress = 100
        this.uploadState = UploadState.Completed
      }

      xhr.upload.onprogress = (event) => {
        this.uploadProgress = Math.ceil((event.loaded / event.total) * 100)
      }

      xhr.onload = () => {
        if (xhr.status === 200 || xhr.status === 201) {
          this.uploadProgress = 100
          this.uploadState = UploadState.Completed
          resolve()
        } else {
          this.uploadState = UploadState.Failed
          reject()
        }
      }

      xhr.onerror = () => {
        this.uploadState = UploadState.Failed
        reject()
      }

      const formData = new FormData()
      formData.append('file', this.file!)
      xhr.send(formData)
    })
  }

  async delete(moduleId: string): Promise<void> {
    const artifactId = this.id
    const response = await fetch(`/rest/v1/softwaremodules/${moduleId}/artifacts/${artifactId}`, {
      method: 'DELETE'
    })

    if (response.status !== 200) {
      throw new Error('Failed to delete artifact')
    }

    this.isDeleted = true
  }

  static async getAll(moduleId: string): Promise<Artifact[]> {
    const response = await fetch(`/rest/v1/softwaremodules/${moduleId}/artifacts`)

    if (response.status !== 200) {
      throw new Error('Failed to get artifacts')
    }

    const results = await response.json()
    return results.map(
      (result: any) =>
        new Artifact({
          id: result.id,
          fileName: result.providedFilename,
          fileSize: result.size
        })
    )
  }

  static fromFile(file: File) {
    return new Artifact({
      file,
      fileName: file.name,
      fileSize: file.size
    })
  }
}
