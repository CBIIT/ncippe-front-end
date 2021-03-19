import { SendMessageProvider } from './SendMessage.context'
import Workflow from './Workflow'

const WorkflowWithProvider = () => <SendMessageProvider><Workflow /></SendMessageProvider>

export default WorkflowWithProvider