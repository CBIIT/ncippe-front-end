import React from 'react'
import FileListItem from './FileListItem'

export default {
  title: 'Components/File List/File List Item',
  component: FileListItem,
  argTypes: {
    file: {
      control: null,
      table: {
        defaultValue: {
          summary: '{}'
        }
      }
    },
    noBadge: {
      table: {
        defaultValue: {
          summary: false
        }
      }
    },
    eventName: {
      table: {
        defaultValue: {
          summary: 'VIEW_DOCUMENT_ITEM'
        }
      }
    },
    fileName: {
      description: 'The name of the file',
      table: {
        category: 'file',
        defaultValue: {
          summary: 'undefined'
        }
      }
    },
    dateUploaded: {
      description: 'The `timestamp` date when this file was uploaded to the system',
      table: {
        category: 'file',
        defaultValue: {
          summary: 'undefined'
        }
      }
    },
    fileGUID: {
      description: 'The unique identifier (`uuid`) of this file',
      table: {
        category: 'file',
        defaultValue: {
          summary: 'undefined'
        }
      }
    },
    viewedByUser: {
      description: `Flag if this message has been viewed by the user. If \`false\` then this message will display a "new" badge`,
      table: {
        category: 'file',
        defaultValue: {
          summary: false
        }
      },
      control: {
        type: 'boolean'
      }
    },
  }
}

const Template = (args) => <FileListItem noBadge={args.noBadge} file={{...args}} />

const FileListItemDemo = Template.bind({})
FileListItemDemo.storyName = "File List Item"
FileListItemDemo.args = {
  fileName: "New Report",
  dateUploaded: 1555136989000,
  fileGUID: "91444ed9-cd1f-43d8-8b08-f468c509a44g",
  viewedByUser: false
}

export { FileListItemDemo }