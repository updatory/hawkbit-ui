export default interface Module {
  id: string;
  name: string;
  version: string;
  type: string;
  vendor: string;
  description: string;
  encrypted: boolean;
  createdAt: number;
}
