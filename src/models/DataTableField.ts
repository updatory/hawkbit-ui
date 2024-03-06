import type DataTableFieldType from '@/models/DataTableFieldType'

export default interface DataTableField {
  id: string;
  description: string;
  type: DataTableFieldType;
}
