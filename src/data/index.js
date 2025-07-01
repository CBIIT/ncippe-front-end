export default import(/* webpackMode: "eager" */ `../data/${process.env.REACT_APP_API_PATH}/api`).then(module => module.api)

export async function getAPI(){
  const path = process.env.REACT_APP_API_PATH;
  if(!path) {
    console.log('API path is not defined');
    const module = await import(/* webpackMode: "eager" */ `../data/prod/api`)
    return module.api
  }else {
    const module = await import(/* webpackMode: "eager" */ `../data/${path}/api`)
    return module.api
  }
  
}