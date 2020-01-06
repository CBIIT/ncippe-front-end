export default import(/* webpackMode: "eager" */ `../data/${process.env.REACT_APP_API_PATH}/api`).then(module => module.api)

export async function getAPI(){
  const module = await import(/* webpackMode: "eager" */ `../data/${process.env.REACT_APP_API_PATH}/api`)
  return module.api
}