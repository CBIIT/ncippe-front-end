import { MochaProvider } from './Mocha.context'
import Workflow from './Workflow'

const WorkflowWithProvider = (props) => <MochaProvider><Workflow {...props} /></MochaProvider>

export default WorkflowWithProvider