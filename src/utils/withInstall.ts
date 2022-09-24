import { VueConstructor, PluginObject } from 'Vue';

export function withInstall<T>(comp: T) {
  const c = comp as any;

  const name = c?.options?.name || c.name;
  if (!name) throw new Error('Name is required for a global component.')

  c.install = function (Vue: VueConstructor, config?: object) {
    Vue.component(name, comp);
  };
 
  return comp as T & PluginObject<T>;
}

export default withInstall;
