import React, { useCallback, useContext, useEffect } from 'react'
import PubSub from 'pubsub-js'

import { LoginContext } from '../login/Login.context'
import getAPI from '../../data'
import { filesViewedByUser } from '../../data/utils'
import { getBool } from '../../utils/utils'
import FileList from '../FileList'

const FileListWrapper = (props) => {
  const [loginContext, dispatch] = useContext(LoginContext)
  const { patientId, type} = props

  let eventName

  switch (type) {
    case "report":
      eventName = "VIEW_REPORT_ITEM"
      break;
    case "consentForm":
      eventName = "VIEW_CONSENT_FORM_ITEM"
      break;
    default:
      eventName = "VIEW_DOCUMENT_ITEM"
      break;
  }


  const handleViewFile = useCallback((data) => {

    // console.log("data", data)

    const { file, download, linkText } = data
    const { fileGUID } = file
    const { uuid, token, patients } = loginContext

    // variables for viewing/downloading documents
    let fileName, fileData, win

    // file type specific variables
    let fileType, collection, newCountKey, hasNewKey, API_methodName
    switch (type) {
      case "report":
        fileType = 'report'
        collection = 'reports'
        newCountKey = 'newReportCount'
        hasNewKey = 'hasNewReports'
        API_methodName = "reportViewedBy"
        break;
      case "consentForm":
        fileType = 'consentForm'
        collection = 'otherDocuments'
        newCountKey = 'newDocumentCount'
        hasNewKey = 'hasNewDocuments'
        API_methodName = "documentViewedBy"
        break;
      // We don't have a case for this default at the moment. All "otherDocuments" are consent forms
      default:
        fileType = 'otherDocument'
        collection = 'otherDocuments'
        newCountKey = 'newDocumentCount'
        hasNewKey = 'hasNewDocument'
        API_methodName = "otherDocumentViewedBy"
        break;
    }
  
    // defer opening new window for 100ms so we can return false on a "open in a new tab" click
    setTimeout(() => {
      // set up new tab window before fetch call
      if(!download) {
        win = window.open("",`${fileType}-${fileGUID}`)
        win.document.title = "View File" // TODO: translate this
        win.document.body.style.margin = 0
        win.onunload = function() {
          window.URL.revokeObjectURL(fileData)
        }
      }
  
      getAPI.then(api => {
        api.fetchPatientFile({reportId: fileGUID, token})
          .then(resp => {
            try{
              const disposition = resp.headers.get('Content-Disposition')
              fileName = disposition ? disposition.replace(/.*filename=(.*\.pdf$)/,'$1') : `${fileType}.pdf`
              return resp.blob()
            } catch(error) {
              throw new Error(error)
            }
          })
          .then(blob => {
            // const file = new Blob([resp], {type: "application/pdf"})
  
            // you can only trigger save in IE - viewing blob data not supported
            // TODO: conditionally show "View" for IE browser
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
              window.navigator.msSaveOrOpenBlob(blob);
              return;
            } 
  
            // create url reference to blob buffer
            fileData = window.URL.createObjectURL(blob)
  
            // trigger download or render blob buffer to new window
            if(download) {
              PubSub.publish('ANALYTICS', {
                events: 'event6',
                eventName: 'AccountDocumentsDownload',
                prop50: linkText,
                prop66: `BioBank_AccountDocuments|Download`,
                eVar66: `BioBank_AccountDocuments|Download`,
                pe: 'lnk_e',
                pev1: `${fileName}`,
              })
              const link = document.createElement('a');
              link.style.display = 'none';
              document.body.appendChild(link);
              link.download = fileName
              link.href = fileData
              link.click();
              document.body.removeChild(link);
            } else {
              PubSub.publish('ANALYTICS', {
                events: 'event6',
                eventName: 'AccountDocumentsView',
                prop50: linkText,
                prop66: `BioBank_AccountDocuments|View in Browser`,
                eVar66: `BioBank_AccountDocuments|View in Browser`,
                pe: 'lnk_e',
                pev1: `${fileName}`,
              })
              win.document.body.innerHTML = `<embed src='${fileData}' type='application/pdf' width='100%' height='100%' />`
            }
          })
          .then(() => {
            // mark this file as viewed in database
            getAPI.then(api => {
              // dynamic api call depending on file type
              api[API_methodName]({patientId, uuid, reportId: fileGUID, token}).then(resp => {
                if(resp instanceof Error) {
                  console.error(resp.message)
                } else {
                  // update participant state
                  if(!patientId) {
                    const updatedFiles = filesViewedByUser(loginContext[collection], uuid, fileGUID)
  
                    dispatch({
                      type: `${API_methodName}Patient`,
                      files: updatedFiles.files,
                      newFileCount: updatedFiles.newCount,
                      hasNewFiles: getBool(updatedFiles.newCount),
                      uuid
                    })
                  }
                  // update admin state that can view this patient's files
                  else {
                    const updatedPatients = patients.map((patient) => {
                      if(patient.patientId === patientId) {
                        const files = patient[collection]
                        const updatedFiles = filesViewedByUser(files, uuid, fileGUID)
                        patient[collection] = updatedFiles.files

                        return {
                          ...patient,
                          [newCountKey]: updatedFiles.newCount,
                          [hasNewKey]: getBool(updatedFiles.newCount)
                        }
                      }
                      return patient
                    })
                    
                    dispatch({
                      type: `${API_methodName}Other`,
                      patients: updatedPatients
                    })
                  }
                }
              })
            })
          })
          .catch(error => {
            console.error(error)
          })
      })
    }, 100)
  },[loginContext, dispatch, patientId])

  useEffect(() => {
    const onViewFile = PubSub.subscribe(eventName, (msg, data) => {
      // console.log("msg", msg)
      // console.log("data", data)
      handleViewFile(data)
    })
    return () => {
      PubSub.unsubscribe(onViewFile)
    }
  }, [handleViewFile, eventName])


  return (
    <FileList {...props} eventName={eventName} />
  )
}

FileListWrapper.displayName = "FileListWrapper"

export default FileListWrapper