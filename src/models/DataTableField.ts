import type DataTableFieldType from '@/models/DataTableFieldType'

export default interface DataTableField {
  name: string;
  title: string;
  type: DataTableFieldType;
}
