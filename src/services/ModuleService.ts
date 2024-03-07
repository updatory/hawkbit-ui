import type Module from '@/models/Module'

export default class ModuleService {
  public async create(newModule: Partial<Module>): Promise<void> {
    await fetch('/rest/v1/softwaremodules', {
      method: 'POST',
      body: JSON.stringify([newModule]),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public async getById(id: string): Promise<Module> {
    const response = await fetch(`/rest/v1/softwaremodules/${id}`);
    const result = await response.json();
    return this.toModule(result);
  }

  public async getAll(): Promise<Module[]> {
    const response = await fetch('/rest/v1/softwaremodules');
    const results = await response.json();
    return results.content?.map((result: any) => this.toModule(result));
  }

  private toModule(json: any): Module {
    return {
      id: json.id,
      name: json.name,
      version: json.version,
      type: json.type,
      vendor: json.vendor,
      description: json.description,
      encrypted: json.encrypted,
      createdAt: json.createdAt,
    };
  }
}
