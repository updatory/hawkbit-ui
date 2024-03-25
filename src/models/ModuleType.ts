export default class ModuleType {
  key: string
  name: string

  constructor(key: string, name: string) {
    this.key = key
    this.name = name
  }

  static async getAll(): Promise<ModuleType[]> {
    const response = await fetch('/rest/v1/softwaremoduletypes')

    if (response.status !== 200) {
      return Promise.reject()
    }

    const results = (await response.json()).content

    return results.map((result: any) => new ModuleType(result.key, result.name))
  }
}
