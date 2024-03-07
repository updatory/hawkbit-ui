import type DataTableFieldType from '@/models/DataTableFieldType'

export interface DataTableCell {
  id: string;
  value: any;
  type: DataTableFieldType;
  last: boolean;
}
