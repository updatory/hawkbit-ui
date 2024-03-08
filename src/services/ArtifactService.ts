import type Artifact from '@/models/Artifact'

export default class ArtifactService {
  public async create(moduleId: string, file: File): Promise<Artifact> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`/rest/v1/softwaremodules/${moduleId}/artifacts`, {
      method: 'POST',
      body: formData,
    });

    return this.toArtifact(await response.json());
  }

  public async remove(moduleId: string, artifactId: string): Promise<void> {
    await fetch(`/rest/v1/softwaremodules/${moduleId}/artifacts/${artifactId}`, {
      method: 'DELETE',
    });
  }

  public async getAll(moduleId: string): Promise<Artifact[]> {
    const response = await fetch(`/rest/v1/softwaremodules/${moduleId}/artifacts`);
    return this.toArtifacts(await response.json());
  }

  private toArtifacts(results: any[]): Artifact[] {
    return results.map(result => this.toArtifact(result));
  }

  private toArtifact(result: any): Artifact {
    return {
      id: result.id,
      providedFilename: result.providedFilename,
      size: result.size
    };
  }
}
