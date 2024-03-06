import type DataFieldType from '@/models/DataFieldType'

export default interface DataField {
  name: string;
  description: string;
  type: DataFieldType;
}
