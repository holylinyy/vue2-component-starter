import * as components from './components'
import { VueConstructor } from 'Vue';
function install(Vue: VueConstructor) {
  Object.keys(components).forEach((key) => {
    if (components[key]) {
      Vue.use(components[key])
    }
  });
}

export * from './components'

export default {
  install,
  version: typeof __VERSION__ === 'undefined' ? '' : __VERSION__, // eslint-disable-line
}


