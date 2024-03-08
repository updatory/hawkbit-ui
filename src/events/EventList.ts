import type DataTableRecordClicked from '@/events/DataTableRecordClicked'
import type UploadAreaFilesSelected from '@/events/UploadAreaFilesSelected'
import type ArtifactCardDeleteClicked from '@/events/ArtifactCardDeleteClicked'

export type EventList = {
  'dataTableRecordClicked' : DataTableRecordClicked;
  'uploadAreaFilesSelected': UploadAreaFilesSelected;
  'artifactCardDeleteClicked': ArtifactCardDeleteClicked;
}
