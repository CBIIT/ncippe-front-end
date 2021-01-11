/*====================================================================*/
/*======== Utility Functions =========================================*/

// export function markFileViewedByUser(file, uuid, fileGUID) {
//   if(file.fileGUID === fileGUID) {
//     const viewedBy = file.viewedBy || []
//     return {
//       ...file,
//       viewedBy: [...new Set([...viewedBy, uuid])],
//       viewedByUser: true,
//     }
//   }
//   return file
// }

export function filesViewedByUser(files, uuid, fileGUID) {
  let result = { files: [], newCount: 0 }
  if(files){
    result.files = files.map(file => {
      const viewedBy = file.viewedBy || []

      // check if this file has been viewed by this user
      const isViewed = viewedBy.includes(uuid)

      // if a fileGUID was provided, then mark this files as viewed
      if (fileGUID && file.fileGUID === fileGUID) {
        file.viewedBy = [...new Set([...viewedBy, uuid])]
        file.viewedByUser = true
      }
      // else just flag this file as viewed or not. Unviewed files are considered new
      else {
        file.viewedByUser = isViewed
        result.newCount += isViewed ? 0 : 1
      }

      return file
    })          
  }
  return result
}

export function hasUnviewedFiles(files, uuid) {
  if(files){
    return files.some(file => {
      if (!file.viewedBy) {
        return true
      } else {
        return !file.viewedBy.includes(uuid)
      }
    })          
  } else {
    console.warn("No files available for viewing")
    return false
  }
}

export function sortPatients(patients){
  const sortedPatients = patients
  // sort alphabetically
  .sort((a, b) => a.lastName.localeCompare(b.lastName))
  // bring new accounts to the top
  .sort((a,b) => {
    if(a.portalAccountStatus === "ACCT_NEW" && b.portalAccountStatus !== "ACCT_NEW") {
      return -1
    }
    if(b.portalAccountStatus === "ACCT_NEW" && a.portalAccountStatus !== "ACCT_NEW") {
      return 1
    }
    return 0
  })

  return sortedPatients
}