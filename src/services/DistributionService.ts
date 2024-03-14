import type Distribution from '@/models/Distribution'

export default class DistributionService {
  public async getAll(): Promise<Distribution[]> {
    const response = await fetch('/rest/v1/distributionsets');
    return this.toDistributions((await response.json()).content);
  }

  private toDistributions(results: any[]): Distribution[] {
    return results.map(result => this.toDistribution(result));
  }

  private toDistribution(result: any): Distribution {
    return {
      id: result.id,
      type: result.type,
      name: result.name,
      version: result.version,
      description: result.description,
      createdAt: result.createdAt,
    };
  }
}
