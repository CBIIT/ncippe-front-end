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
  // Validate input
  if (!Array.isArray(patients)) {
    console.warn('sortPatients: Expected array, got:', typeof patients);
    return [];
  }
  const sortedPatients = patients
  .filter(patient => patient && typeof patient === 'object') // Remove null/undefined patients
  .sort((a, b) => {
    const aNew = a.portalAccountStatus === 'ACCT_NEW';
    const bNew = b.portalAccountStatus === 'ACCT_NEW';
    if (aNew !== bNew) return aNew ? -1 : 1; //new accounts first
    const aLast = (a?.lastName ?? '').trim();
    const bLast = (b?.lastName ?? '').trim();
    const lastCmp = aLast.localeCompare(bLast, undefined, { sensitivity: 'base' });
    if (lastCmp) return lastCmp;
    const aFirst = (a?.firstName ?? '').trim();
    const bFirst = (b?.firstName ?? '').trim();
    const firstCmp = aFirst.localeCompare(bFirst, undefined, { sensitivity: 'base' });
    if (firstCmp) return firstCmp;

    // Final stable-ish tiebreaker
    const aId = String(a?.patientId ?? '');
    const bId = String(b?.patientId ?? '');
    return aId.localeCompare(bId, undefined, { numeric: true, sensitivity: 'base' });
  })
  
  return sortedPatients
}