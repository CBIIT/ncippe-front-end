import { MochaProvider } from './Mocha.context'
import Workflow from './Workflow'

const WorkflowWithProvider = () => <MochaProvider><Workflow /></MochaProvider>

export default WorkflowWithProvider