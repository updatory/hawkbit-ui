import type Module from '@/models/Module'
import type ModuleType from '@/models/ModuleType'

export default class ModuleService {
  public async create(newModule: Partial<Module>): Promise<Module> {
    const body = JSON.stringify([newModule]);

    const response = await fetch('/rest/v1/softwaremodules', {
      method: 'POST',
      body,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return this.toModules(await response.json())[0];
  }

  public async delete(id: string): Promise<void> {
    await fetch(`/rest/v1/softwaremodules/${id}`, {
      method: 'DELETE',
    });
  }

  public async getTypes(): Promise<ModuleType[]> {
    const response = await fetch('/rest/v1/softwaremoduletypes');
    return this.toModuleTypes((await response.json()).content);
  }

  public async update(id: string, module: Partial<Module>): Promise<void> {
    const body = JSON.stringify(module);
    await fetch(`/rest/v1/softwaremodules/${id}`, {
      method: 'PUT',
      body,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public async getById(id: string): Promise<Module> {
    const response = await fetch(`/rest/v1/softwaremodules/${id}`);
    return this.toModule(await response.json());
  }

  public async getAll(): Promise<Module[]> {
    const response = await fetch('/rest/v1/softwaremodules');
    return this.toModules((await response.json()).content);
  }

  private toModules(results: any[]): Module[] {
    return results.map(result => this.toModule(result));
  }

  private toModule(result: any): Module {
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
  }

  private toModuleTypes(results: any[]): ModuleType[] {
    return results.map(result => this.toModuleType(result));
  }

  private toModuleType(result: any): ModuleType {
    return {
      id: result.key,
      name: result.name,
    };
  }
}
