import type { Ref } from 'vue'
import UploadState from '@/models/UploadState'
import { shallowRef } from 'vue'
import { v4 as uuidv4 } from 'uuid'

export default class Artifact {
  id: Ref<string | undefined>
  fileName: Ref<string>
  fileSize: Ref<number>

  meta: {
    isNew: Ref<boolean>
    isDeleted: Ref<boolean>
    instanceId: Ref<string>
    uploadProgress: Ref<number>
    uploadState: Ref<UploadState>
  }

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
    this.id = shallowRef(id)
    this.fileName = shallowRef(fileName)
    this.fileSize = shallowRef(fileSize)

    this.file = file

    this.meta = {
      isNew: shallowRef(!!id),
      isDeleted: shallowRef(false),
      instanceId: shallowRef(uuidv4()),
      uploadProgress: shallowRef(0),
      uploadState: shallowRef(UploadState.Idle)
    }
  }

  save(moduleId: string): Promise<void> {
    if (!this.meta.isNew.value) {
      return Promise.resolve()
    }

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open('POST', `/rest/v1/softwaremodules/${moduleId}/artifacts`)

      xhr.upload.onloadstart = () => {
        this.meta.uploadProgress.value = 0
        this.meta.uploadState.value = UploadState.Progress
      }

      xhr.upload.onloadend = () => {
        this.meta.uploadProgress.value = 100
        this.meta.uploadState.value = UploadState.Completed
      }

      xhr.upload.onprogress = (event) => {
        this.meta.uploadProgress.value = Math.ceil((event.loaded / event.total) * 100)
      }

      xhr.onload = () => {
        if (xhr.status === 200) {
          this.meta.uploadProgress.value = 100
          this.meta.uploadState.value = UploadState.Completed
          resolve()
        } else {
          this.meta.uploadState.value = UploadState.Failed
          reject()
        }
      }

      xhr.onerror = () => {
        this.meta.uploadState.value = UploadState.Failed
        reject()
      }

      const formData = new FormData()
      formData.append('file', this.file!)
      xhr.send(formData)
    })
  }

  async delete(moduleId: string): Promise<void> {
    const artifactId = this.id.value
    const response = await fetch(`/rest/v1/softwaremodules/${moduleId}/artifacts/${artifactId}`, {
      method: 'DELETE'
    })

    if (response.status !== 200) {
      throw new Error('Failed to delete artifact')
    }

    this.meta.isDeleted.value = true
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
