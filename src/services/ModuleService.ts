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

  public async getAll(): Promise<Module[]> {
    const response = await fetch('/rest/v1/softwaremodules');
    const results = await response.json();
    return results.content?.map((result: any) => {
      return {
        id: result.id,
        name: result.name,
        version: result.version,
        type: result.type,
        vendor: result.vendor,
        description: result.description,
        encrypted: result.encrypted,
        createdAt: result.createdAt,
      };
    });
  }
}
