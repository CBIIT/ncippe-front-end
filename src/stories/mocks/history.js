let history

export function historyDecorator(story, { parameters }) {
  if (parameters && parameters.history) {
    history = parameters.history
  }
  return story();  
}
