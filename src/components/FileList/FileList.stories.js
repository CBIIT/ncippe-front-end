import React from 'react'
import FileList from './FileList'

export default {
  title: 'UI/File List/File Listing',
  component: FileList,
  argTypes: {
    noItemsMsg: {
      table: {
        defaultValue: {
          summary: 'No items to display.'
        }
      }
    }
  }
}

const testResultsData = [
  {
    fileName: "New Report",
    description: "A sort report description",
    uploadedFileType: "PPE_FILETYPE_BIOMARKER_REPORT",
    uploadedBy: "877fd0f1-29dc-4a47-9468-371b91836831",
    dateUploaded: 1567751389000,
    fileGUID: "91444ed9-cd1f-43d8-8b08-f468c509a44e",
    viewedByUser: false,
  },
  {
    fileName: "One_long_report_title_that_needs_wrapping_08-28-2019",
    description: "A sort report description",
    uploadedFileType: "PPE_FILETYPE_BIOMARKER_REPORT",
    uploadedBy: "877fd0f1-29dc-4a47-9468-371b91836831",
    dateUploaded: 1567924189000,
    fileGUID: "91444ed9-cd1f-43d8-8b08-f468c509a44f",
    viewedByUser: true,
  },
  {
    fileName: "New Report",
    description: "A sort report description",
    uploadedFileType: "PPE_FILETYPE_BIOMARKER_REPORT",
    uploadedBy: "877fd0f1-29dc-4a47-9468-371b91836831",
    dateUploaded: 1555136989000,
    fileGUID: "91444ed9-cd1f-43d8-8b08-f468c509a44g",
  },
]

const Template = (args) => {
  return <FileList {...args} />
}

const FileListDemo = Template.bind({})
FileListDemo.storyName = "File Listing"
FileListDemo.args = {
  files: testResultsData,
}

const FileListNoItems = Template.bind({})
FileListNoItems.storyName = "File Listing With No Items"
FileListNoItems.args = {
  files: []
}

export { FileListDemo, FileListNoItems }