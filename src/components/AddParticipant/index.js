import { AddParticipantProvider } from './AddParticipant.context'
import Workflow from './Workflow'

const WorkflowWithProvider = (props) => <AddParticipantProvider><Workflow {...props} /></AddParticipantProvider>

export default WorkflowWithProvider